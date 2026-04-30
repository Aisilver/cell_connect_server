import { ControllerEngine } from "../../classes/controller-engine.class";
import { MeetCTRL_RF_getMeetingAttendants } from "./route-functions/get-meeting-attendants.r-func";
import { MeetCTRL_RF_getUserAttendanceHistory } from "./route-functions/get-user-attendance-history.r-func";
import { MeetCTRL_RF_getUpcomingMeetingByCellId } from "./route-functions/get-upcoming-meeting-by-cellId.r-func";
import { MeetCTRL_RF_createMeeting } from "./create-meeting.r-func";
import { MeetCTRL_RF_getMeetingDefaultVenue } from "./route-functions/get-meeting-default-venue.r-func";

class MeetingsAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "meetings";

    BeforeInitialise(): void | Promise<void> {
        this.router.route("/get-user-attds-history").get(MeetCTRL_RF_getUserAttendanceHistory)   

        this.router.route("/get-upcoming-meet/:cellId").get(MeetCTRL_RF_getUpcomingMeetingByCellId)

        this.router.route("/get-meet-attendants/:meetingId").get(MeetCTRL_RF_getMeetingAttendants)

        this.router.route("/create-meeting").post(MeetCTRL_RF_createMeeting)

        this.router.route("/get-meet-default-venue/:cellId").get(MeetCTRL_RF_getMeetingDefaultVenue)
    }
}

export const MeetingsRouteController = new MeetingsAPIRouteController("ControllerEngine: MeetingsRouteController", {
    useEncryterMiddleware: true,
    useBodyParser: true,
    useJWTMiddleware: true
})