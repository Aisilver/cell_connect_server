import { MeetCTRL_CR_Job_setMeetingNotHosted } from "./job-handlers/set-meeting-not-hosted.cron-job";
import { DynamicKeyTaskManager } from "../../../../classes/dynamic-key-task-manager/dynamic-key-task-manager.class";

class MeetingControllerCRONManagerService {
    readonly MEETING_NOT_HOSTED_TASK_MANAGER = new DynamicKeyTaskManager("meet-cancelation", MeetCTRL_CR_Job_setMeetingNotHosted)
}

export const MeetingCTRLTaskManager = new MeetingControllerCRONManagerService()