import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class"

class MeetingControllersEventManager extends BaseEventManager {
    private readonly BOOKED_MEETING_EVENT_KEY = "booked-meeting"

    protected ListenAll(): void {
        this.ListenFor(this.BOOKED_MEETING_EVENT_KEY, this.triggerBookedMeetingEvent)
    }

    triggerBookedMeetingEvent = (meetingId: number) => this.Trigger(this.BOOKED_MEETING_EVENT_KEY, meetingId)
}

export const MeetingCtrlEventsManagerService = new MeetingControllersEventManager()