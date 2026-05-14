import { Meeting, MeetingEditLog } from "@shared/entities";
import { BaseEmailManager } from "../../../../classes/base-email-manger/base-email-manger.class";
import { MailManager, MailManagerService } from "../../../../services/mail-manager/mail-manager.service";
import { TextCapitalizer } from "../../../../functions/capitalizer.func";
import EmailImagePathsConfiguration from "../../../../email/email-image-paths.config";
import { SlugTextDeserializer } from "../../../../functions/slug-deserializer.func";
import { MeetingEntity } from "../../../../datasources/main-entities-ds/schemas/meeting-schema/meeting.schema";

class MeetingControllerMailService extends BaseEmailManager {
    protected mail_manager: MailManagerService = MailManager;

    private readonly BOOKED_MEETING_EMAIL_TEMPLATE_ID = "booked-meeting-email"

    sendMeetingBookedMail (firstName: string, email: string, bookedMeeting: MeetingEntity) {
        const {cell, startTime, title, venue, type, host} = bookedMeeting,

        {timezone} = host.user,

        {LOGO, BOOK_MEETING_BANNER} = EmailImagePathsConfiguration,

        startDateStr = "", //TODO: Fill in date string

        startTimeStr = "" //TODO: Fill in time string

        return this.sendEmail({
            to: email,
            template: {
                id: this.BOOKED_MEETING_EMAIL_TEMPLATE_ID,

                variables: {
                    APP_LOGO_URL: LOGO,
                    
                    BOOKED_MEETING_BANNER_URL: BOOK_MEETING_BANNER,
                    
                    CELL_NAME: String(cell?.name),
                    
                    MEETING_DATE: startDateStr,
                    
                    MEETING_DETAILS_URL: this.MainDomainUrlBuilder(["hub", "meeting", "details", Number(bookedMeeting.id)]),
                    
                    MEETING_TIME: startTimeStr, 
                    
                    MEETING_TITLE: String(title), 

                    ...(!title && {
                        MEETING_TITLE_IS_HIDDEN: this.HIDDEN_ELEMENT_CSS_STYLE,
                    }),
                    
                    MEETING_TYPE: TextCapitalizer(SlugTextDeserializer(type)),
                    
                    MEETING_VENUE: String(venue?.addressInFull),
                    
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