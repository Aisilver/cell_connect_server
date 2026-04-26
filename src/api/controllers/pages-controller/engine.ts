import { ControllerEngine } from "../../classes/controller-engine.class";
import { InitializerConfig } from "../../../classes/engine/types";
import { PR_InitF_cacheSlides } from "./initializers/cache-home-slides.initializer";
import { PR_getAuthSlides } from "./route-functions/get-auth-slides.r-func";
import { PR_getHomeSlides } from "./route-functions/get-home-slides.r-func";

class PagesApiRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "pages";

    protected initializers: InitializerConfig[] = [
        {
            name: 'home slide caching',
            priority: 'top',
            initFunc: () => PR_InitF_cacheSlides()
        }
    ];

    BeforeInitialise(): void | Promise<void> {
        this.router.route("/home-slides").get(PR_getHomeSlides)    

        this.router.route("/auth-slides").get(PR_getAuthSlides)
    }
}

export const PagesRouteController = new PagesApiRouteController("ControllerEngine: PagesRouteController", {
    useEncryterMiddleware: true
})