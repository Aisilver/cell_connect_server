import { config } from "dotenv"
import { Resend } from "resend"
import nodemailer, { Transporter } from 'nodemailer'
import SMTPConnection from "nodemailer/lib/smtp-connection"

config()

export class MailManagerService  {
    Resend!: Resend

    NodeMailer!: Transporter

    cancelNodeMailerConnection () {
        this.NodeMailer.close()
    }

    getFromAdreess (opt?: {name?: string, sender?: string}, email_service: "resend" | "nodemailer" = "resend") {
        const {MAIN_DOMAIN_ORIGIN, GMAIL_USER} = process.env

        if(email_service == 'resend')
            return `${opt?.name ? opt.name + ' ' : ''}<${opt?.sender ?? 'noreply'}@${MAIN_DOMAIN_ORIGIN}>`
        else 
            return `${opt?.name ? opt.name + ' ' : ''} <${opt?.sender ?? 'noreply'}@${GMAIL_USER}>`
    }


    async InitializeNodeMailer(){
        const {GMAIL_HOST,GMAIL_PORT,GMAIL_PASS,GMAIL_USER} = process.env,

        option: SMTPConnection.Options = {
            host: GMAIL_HOST,
            port: Number(GMAIL_PORT),
            secure: true,
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            }
        }

        this.NodeMailer = nodemailer.createTransport(option)

        if(!await this.NodeMailer.verify()) throw Error("nodemailer configuration failed")
    }


    async InitializeResend(){
        const {RESEND_API_KEY} = process.env

        this.Resend = new Resend(RESEND_API_KEY)

        // To test the connection    
        await this.Resend.apiKeys.list()
    }
}

export const MailManager = new MailManagerService()