import { MeetCTRL_CR_Job_cancelMeeting } from "./job-handlers/cancel-meeting.cron-job";
import { DynamicKeyTaskManager } from "../../../../classes/dynamic-key-task-manager/dynamic-key-task-manager.class";

class MeetingControllerCRONManagerService {
    readonly MEETING_CANCELATION_TASK_MANAGER = new DynamicKeyTaskManager("meet-cancelation", MeetCTRL_CR_Job_cancelMeeting)
}

export const MeetingCTRLTaskManager = new MeetingControllerCRONManagerService()