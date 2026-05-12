import { Meeting, MeetingEditLog } from "@shared/entities";
import { BaseEmailManager } from "../../../../classes/base-email-manger/base-email-manger.class";
import { MailManager, MailManagerService } from "../../../../services/mail-manager/mail-manager.service";
import { TextCapitalizer } from "../../../../functions/capitalizer.func";

class MeetingControllerMailService extends BaseEmailManager {
    protected mail_manager: MailManagerService = MailManager;

    private readonly BOOKED_MEETING_EMAIL_TEMPLATE_ID = "booked-meeting-email"

    sendMeetingBookedMail (firstName: string, email: string, bookedMeeting: Meeting) {
        const {} = bookedMeeting

        return this.sendEmail({
            to: email,
            template: {
                id: this.BOOKED_MEETING_EMAIL_TEMPLATE_ID,
                variables: {
                    APP_LOGO_URL: "",
                    BOOKED_MEETING_BANNER_URL: "",
                    CELL_NAME: "",
                    MEETING_DATE: "",
                    MEETING_DETAILS_URL: "",
                    MEETING_TIME: "",
                    MEETING_TITLE: "",
                    MEETING_TITLE_IS_HIDDEN: "",
                    MEETING_TYPE: "",
                    MEETING_VENUE: "",
                    USER_FIRSTNAME: TextCapitalizer(firstName)
                }
            }
        })
    }

    sendMeetingEditMail (emails: string[], editLog: MeetingEditLog, newMeeting: Meeting) {
        return this.sendEmail({
            to: emails,
            template: {
                id: "",
                variables: {}
            }
        })
    }
}

export const MeetCtrlMailService = new MeetingControllerMailService()