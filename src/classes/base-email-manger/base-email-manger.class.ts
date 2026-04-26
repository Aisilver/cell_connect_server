import { CreateEmailOptions } from "resend"
import { MailManagerService } from "../../services/mail-manager/mail-manager.service"
import { ResendEmailWebHookSubscription } from "../../subscriptions/email-webhook.subscription"
import { EmailEventsMessages } from "./functions/email-events-message-generator.func";
import { config } from "dotenv";
import { ResendWebhookEventTypes } from "src/subscriptions/types";
import { Subscription } from "rxjs";

config()

type EmailSendResponse = {
    delivered: boolean;
    event: ResendWebhookEventTypes;
    message?: string
}

const {NODE_ENV} = process.env

export abstract class BaseEmailManager {
    protected abstract mail_manager: MailManagerService

    private subs?: Subscription

    protected async sendEmail (opts: CreateEmailOptions) {
        let result: EmailSendResponse 
        
        try {
            if(NODE_ENV != 'development') 
                result = await this.WebhookIntergratedEmailSending(opts)

            else 
                result = await this.EmailSending(opts)

        } catch (error: any) {
            result = {delivered: false, message: error.message, event: "email.failed"}
        } finally {
            this.subs?.unsubscribe()
        }
        return result
    }

    private async EmailSending (opts: CreateEmailOptions): Promise<EmailSendResponse> {
        const {error} = await this.mail_manager.Resend.emails.send(opts)

        if(error) throw error

        return {delivered: true, event: 'email.delivered'}
    }

    private WebhookIntergratedEmailSending = (opts: CreateEmailOptions) =>  new Promise<EmailSendResponse>(async (res, rej) => {
        let emailId!: string,

        emailSendingTimeout!: NodeJS.Timeout,

        afterSentEventTimeout!: NodeJS.Timeout
        
        this.subs = ResendEmailWebHookSubscription.subscribe(event => {
            const {type, data} = event,
            
            {email_id, to} = data,

            firstRecipent = to[0] ?? "unknown address"

            if(emailId != email_id) return

            clearTimeout(emailSendingTimeout)

            if(type !== 'email.sent') clearTimeout(afterSentEventTimeout)

            switch(type) {
                case "email.sent": afterSentEventTimeout = setTimeout(() => res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent).NO_EVENT_AFTER_SENT_EVENT_TIMEOUT}), (1000 * 60))
                    break;
                case "email.delivered": res({delivered: true, event: type})
                    break;
                case "email.delivery_delayed": res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent).DELAYED})
                    break;
                case "email.complained": res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent).COMPLAINED})
                    break;
                case "email.bounced": res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent).BOUNCED})
                    break;
                case "email.suppressed": res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent).SUPPRESSED})
                    break;
                case "email.failed": rej(Error(EmailEventsMessages(firstRecipent).FAILED))
                    break
                default: res({delivered: false, event: type, message: EmailEventsMessages(firstRecipent, type).UNKNOWN_EVENT})
                    break
            }
        })

        try {
            const {data, error} = await this.mail_manager.Resend.emails.send(opts)

            if(error) throw error

            const {id} = data

            if(!id) throw Error("email id was not defined")

            emailId = id

            emailSendingTimeout = setTimeout(() => rej(Error("email sending timedout")), (1000 * 60))
        } catch (error: any) {
            rej(error)
        }
    }) 
}