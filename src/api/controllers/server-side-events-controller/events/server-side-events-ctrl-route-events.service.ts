import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class";
import { SSE_CTRL_EV_userIsActive } from "./event-functions/user-is-active.ev-func";
import { SSE_CTRL_EV_userIsInactive } from "./event-functions/user-is-inactive.ev-func";
import { ClientAcvtivityEntryData } from "../types";

class ServerSideEventControllerEventsManager extends BaseEventManager {
    private readonly USER_IS_ACTIVE_EVENT_KEY = "user-active"

    private readonly USER_IS_INACTIVE_EVENT_KEY = "user-inactive"

    protected ListenAll(): void {
        this.ListenFor(this.USER_IS_ACTIVE_EVENT_KEY, SSE_CTRL_EV_userIsActive)
 
        this.ListenFor(this.USER_IS_INACTIVE_EVENT_KEY, SSE_CTRL_EV_userIsInactive)
    }

    triggerUserisActiveEvent = (data: ClientAcvtivityEntryData) => this.Trigger(this.USER_IS_ACTIVE_EVENT_KEY, data, "absolute")
    
    triggerUserisInactiveEvent = (accountId: number) => this.Trigger(this.USER_IS_INACTIVE_EVENT_KEY, accountId, "absolute")
}

export const ServerSideEventsCTRLEventsManager = new ServerSideEventControllerEventsManager()