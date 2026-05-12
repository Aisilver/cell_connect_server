import { MeetingNotification } from "@shared/notifications";
import { NotificationHandler } from "../classes/base-notification-handler.class";
import { SystemNotificationSubscription } from "../../subscriptions/system-notification.subscription";
import { Meeting, MeetingEditLog, MeetingStatusTypes } from "@shared/entities";

class MeetingEntityNotificationHandler extends NotificationHandler {
    protected notifier = SystemNotificationSubscription;

    notifyOfMeetingBooked (payload: Meeting) {
        const notification: MeetingNotification = {
            authurizationLevel: "general",
            key: "meeting-booked",
            entityGroup: "meeting",
            payload
        }

        this.notifier.next(notification)
    }

    notifyOfMeetingStatusChange (newStatus: MeetingStatusTypes, meeting: Meeting) {
        const notification: MeetingNotification = {
            authurizationLevel: "general",
            entityGroup: "meeting",
            key: "meeitng-status-change",
            payload: {
                new_status: newStatus,
                meeting
            }
        }

        this.notifier.next(notification)
    }

    notifyOfMeetingEdit (editlog: MeetingEditLog, new_meeting: Meeting) {
        const notification: MeetingNotification = {
            authurizationLevel: "general",
            entityGroup: "meeting",
            key: "meeting-edit",
            payload: {
                editlog,
                new_meeting
            }
        }

        this.notifier.next(notification)
    }
}

export const MeetingEntityNotificationManager = new MeetingEntityNotificationHandler()