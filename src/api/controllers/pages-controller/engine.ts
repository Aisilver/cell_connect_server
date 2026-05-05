import { ControllerEngine } from "../../classes/controller-engine.class";
import { PagesCtrlEventMangerService } from "./events/pages-route-events-manger.service";
import { PR_getPageslides } from "./route-functions/get-page-slides.r-func";

class PagesApiRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "pages";

    BeforeInitialise(): void | Promise<void> {
        this.router.route("/get-page-slides/:slideType").get(PR_getPageslides)
    }

    AfterRouterInitialise(): void | Promise<void> {
        PagesCtrlEventMangerService.triggerSlidesCachingEvent()
    }
}

export const PagesRouteController = new PagesApiRouteController("ControllerEngine: PagesRouteController", {
    useEncryterMiddleware: true
})