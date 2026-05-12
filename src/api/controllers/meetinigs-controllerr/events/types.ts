import { Meeting, MeetingEditLog } from "@shared/entities"

export type MeetingEditEventParam = {
    meetingId: number,
    oldMeeting: Meeting,
    newMeeting: Meeting,
    editLog: MeetingEditLog
}