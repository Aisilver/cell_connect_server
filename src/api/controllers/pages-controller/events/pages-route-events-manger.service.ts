import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class"
import { Pg_EV_slidesCachingEventHandler } from "./events-function/slides-caching.ev-func"

class PagesEventsManager extends BaseEventManager {
    private readonly SLIDES_CACHING_EVENT_KEY = 'slides-cache'

    protected ListenAll(): void {
        this.ListenFor(this.SLIDES_CACHING_EVENT_KEY, Pg_EV_slidesCachingEventHandler)
    }

    triggerSlidesCachingEvent = () => this.Trigger(this.SLIDES_CACHING_EVENT_KEY)
}

export const PagesCtrlEventMangerService = new PagesEventsManager()