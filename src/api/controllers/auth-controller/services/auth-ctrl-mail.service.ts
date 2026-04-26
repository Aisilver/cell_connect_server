import { BaseEmailManager } from "../../../../classes/base-email-manger/base-email-manger.class";
import EmailImagePathsConfiguration from "../../../../email/email-image-paths.config";
import { MailManager, MailManagerService } from "../../../../services/mail-manager/mail-manager.service";

class AuthControllerMailManager extends BaseEmailManager {
    protected mail_manager: MailManagerService = MailManager;

    private readonly OTP_MAIL_TEMPLATE_ID = "email-verification"

    private readonly SIGNUP_SUCCESS_TEMPLATE_ID = "sign-up-success"

    sendOtpVerificationMail = (email: string, otp: string) => this.sendEmail({
        to: email,
        template: {
            id: this.OTP_MAIL_TEMPLATE_ID,
            variables: {
                APP_LOGO_URL: EmailImagePathsConfiguration.LOGO,
                OTP_BANNER_URL: EmailImagePathsConfiguration.OTP_BANNER,
                OTP_1: Number(otp[0]),
                OTP_2: Number(otp[1]),
                OTP_3: Number(otp[2]),
                OTP_4: Number(otp[3]),
                OTP_5: Number(otp[4]),
                OTP_6: Number(otp[5])
            }
        }
    })

    sendSignupSuccessMail = (firstname: string, email: string) => this.sendEmail({
        to: email,
        template: {
            id: this.SIGNUP_SUCCESS_TEMPLATE_ID,
            variables: {
                APP_LOGO_URL: EmailImagePathsConfiguration.LOGO,
                WELCOME_BANNER_URL: EmailImagePathsConfiguration.WELCOME_BANNER,
                USER_FIRSTNAME: firstname
            }
        }
    })
}

export const AuthCtrlMailService = new AuthControllerMailManager()