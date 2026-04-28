import { ControllerEngine } from "../../classes/controller-engine.class";
import { APP_R_getCities } from "./route-functions/get-cities.r-func";
import { InitializerConfig } from "src/classes/engine/types";
import { APP_R_Init_prepareAndCacheDefaultCities } from "./initializers/prepare-and-cache-cities.init-func";
import { APP_R_Init_prepareAndCacheAppSettings } from "./initializers/prepare-and-cache-app-settings.init-func";
import { APP_R_Init_prepareAndCacheDefaultAppMeetingTypes } from "./initializers/prepare-and-cache-app-meeting-types.init-func";
import { APP_R_getMeetingTypes } from "./route-functions/get-meeting-types.r-func";

class AppAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "app";
    
    protected initializers: InitializerConfig[] = [
        {
            name: "prepare and cache cities",
            priority: 'top',
            initFunc: () => APP_R_Init_prepareAndCacheDefaultCities()
        },

        {
            name: "prepare and cache app settings",
            priority: "top",
            initFunc: () => APP_R_Init_prepareAndCacheAppSettings()
        },

        {
            name: "prepare and cache app meeting types",
            priority: "top",
            initFunc: () => APP_R_Init_prepareAndCacheDefaultAppMeetingTypes()
        }
    ];
    
    BeforeInitialise(): void | Promise<void> {
        this.router.route("/get-cities").get(APP_R_getCities)

        this.router.route("/get-meeting-types").get(APP_R_getMeetingTypes)
    }

    async MonthlyJob(): Promise<void> {
        await APP_R_Init_prepareAndCacheAppSettings()
    }
}

export const AppRouteController = new AppAPIRouteController("ControllerEngine: AppRouteController", {
    useEncryterMiddleware: true
})