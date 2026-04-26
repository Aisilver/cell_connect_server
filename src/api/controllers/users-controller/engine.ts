import { ControllerEngine } from "../../classes/controller-engine.class";
import { UR_getUsers } from "./route-functions/get-users.r-func";
import { UR_createUsers } from "./route-functions/create-user.r-func";

class UsersAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "users"

    BeforeInitialise(): void | Promise<void> {
    
        this.router.route("/")
            .get(UR_getUsers)
            .post(UR_createUsers)
    }
}

export const UsersRouteController = new UsersAPIRouteController("ControllerEngine: UsersRouteController", {
    useBodyParser: true,
    useEncryterMiddleware: true,
    useJWTMiddleware: true
})