import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class"
import { AppCTRL_EV_citiesReCaching } from "./event-functions/cities-re-caching.ev-func";


class AppControllerEventsManager extends BaseEventManager {
    
    private readonly CITIES_CACHING_EVENT_KEY = "cities-caching-key"

    protected ListenAll(): void {
        this.ListenFor(this.CITIES_CACHING_EVENT_KEY, AppCTRL_EV_citiesReCaching)
    }

    triggerCitiesCachingEvent = () => this.Trigger(this.CITIES_CACHING_EVENT_KEY)

}

export const AppCTRLEventsService = new AppControllerEventsManager()