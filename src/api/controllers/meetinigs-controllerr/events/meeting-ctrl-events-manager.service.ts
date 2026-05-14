import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class"
import { MeetingEditEventParam } from "./types"
import { MeetCTRL_EV_bookedMeeting } from "./event-functions/booked-meeting.ev-func"
import { MeetCTRL_EV_editedMeeting } from "./event-functions/edit-meeting.ev-func"

class MeetingControllersEventManager extends BaseEventManager {
    private readonly BOOKED_MEETING_EVENT_KEY = "booked-meeting"

    private readonly EDIT_MEETING_EVENT_KEY = "booked-meeting"

    protected ListenAll(): void {
        this.ListenFor(this.BOOKED_MEETING_EVENT_KEY, MeetCTRL_EV_bookedMeeting)

        this.ListenFor(this.EDIT_MEETING_EVENT_KEY, MeetCTRL_EV_editedMeeting)
    }

    triggerBookedMeetingEvent = (meetingId: number) => this.Trigger(this.BOOKED_MEETING_EVENT_KEY, meetingId)

    triggerEditedMeetingEvent = (param: MeetingEditEventParam) => this.Trigger(this.EDIT_MEETING_EVENT_KEY, param)
}

export const MeetingCtrlEventsManagerService = new MeetingControllersEventManager()