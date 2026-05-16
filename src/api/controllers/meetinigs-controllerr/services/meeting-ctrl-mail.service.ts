import { User } from "@shared/entities";
import { BaseEmailManager } from "../../../../classes/base-email-manger/base-email-manger.class";
import { MailManager, MailManagerService } from "../../../../services/mail-manager/mail-manager.service";
import { TextCapitalizer } from "../../../../functions/capitalizer.func";
import EmailImagePathsConfiguration from "../../../../email/email-image-paths.config";
import { SlugTextDeserializer } from "../../../../functions/slug-deserializer.func";
import { MeetingEntity } from "../../../../datasources/main-entities-ds/schemas/meeting-schema/meeting.schema";
import { ValueComparer } from "../../../../classes/value-compare/value-compare.class";

class MeetingControllerMailService extends BaseEmailManager {
    protected mail_manager: MailManagerService = MailManager;
    
    private valueComparer = new ValueComparer()

    private readonly BOOKED_MEETING_EMAIL_TEMPLATE_ID = "booked-meeting-email"

    private readonly MEETING_EDIT_UPDATE_EMAIL_TEMPLATE_ID = "meeting-update-template"

    sendMeetingBookedMail (recipent: User, bookedMeeting: MeetingEntity) {
        const {firstName, email, timezone: recepientTimezone} = recipent,
        
        {cell, title, venue, type, host} = bookedMeeting,

        startTime = new Date(bookedMeeting.startTime),

        {timezone: hostTimeZone} = host.user,

        {LOGO, BOOK_MEETING_BANNER} = EmailImagePathsConfiguration,

        HostAndRecipentIsInTheSameTimeZone = this.valueComparer.sameString(hostTimeZone, recepientTimezone),

        meetingStartDateStr = Intl.DateTimeFormat("en-US", {
            timeZone: hostTimeZone,
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(startTime),

        meetingStartTimeStr = Intl.DateTimeFormat("en-US", {
            timeZone: hostTimeZone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(startTime),

        recipentMeetingStartDateStr = Intl.DateTimeFormat("en-US", {
            timeZone: recepientTimezone,
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(startTime),

        recipentMeetingStartTimeStr = Intl.DateTimeFormat("en-US", {
            timeZone: recepientTimezone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(startTime)    

        return this.sendEmail({
            to: email,
            template: {
                id: this.BOOKED_MEETING_EMAIL_TEMPLATE_ID,

                variables: {
                    APP_LOGO_URL: LOGO,
                    
                    BOOKED_MEETING_BANNER_URL: BOOK_MEETING_BANNER,
                    
                    CELL_NAME: String(cell?.name),
                    
                    MEETING_DATE: meetingStartDateStr,

                    MEETING_TIME: meetingStartTimeStr, 

                    HOST_TIME_ZONE: hostTimeZone,

                    ...(HostAndRecipentIsInTheSameTimeZone && {
                        RECIPENT_LOCAL_MEETING_TIME_IS_HIDDEN: this.HIDDEN_ELEMENT_CSS_STYLE
                    }),

                    RECIPENT_LOCAL_MEETING_DATE: recipentMeetingStartDateStr,

                    RECIPENT_LOCAL_MEETING_TIME: recipentMeetingStartTimeStr,

                    RECIPENT_TIME_ZONE: recepientTimezone, 
                    
                    MEETING_DETAILS_URL: this.MainDomainUrlBuilder(["hub", "meeting", "details", Number(bookedMeeting.id)]),
                                        
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

    sendMeetingEditMail (recipent: User, meetingid: number, cellName: string) {
        const {email, firstName} = recipent

        return this.sendEmail({
            to: email,
            template: {
                id: this.MEETING_EDIT_UPDATE_EMAIL_TEMPLATE_ID,
                
                variables: {
                    APP_LOGO_URL: EmailImagePathsConfiguration.LOGO,

                    CELL_NAME: cellName,
                    
                    EDIT_MEETING_BANNER: EmailImagePathsConfiguration.EDIT_MEETING_BANNER,
                    
                    MEETING_DETAILS_URL: this.MainDomainUrlBuilder(["hub", "meeting", "details", meetingid]),
                    
                    USER_FIRSTNAME: TextCapitalizer(firstName)
                }
            }
        })
    }
}

export const MeetCtrlMailService = new MeetingControllerMailService()