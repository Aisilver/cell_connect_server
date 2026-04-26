import { ControllerEngine } from "../../classes/controller-engine.class";
import { AuthCTRL_RF_sendOTP } from "./route-functions/send-otp.r-func";
import { AuthCTRL_RF_createUserAccount } from "./route-functions/create-user-account.r-func";
import { AuthCTRL_RF_verifyEmail } from "./route-functions/verify-email.r-func";
import { AuthCTRL_RF_verifyOTP } from "./route-functions/verify-otp.func";
import { AuthCTRL_RF_verifyUserName } from "./route-functions/verify-username.r-func";
import { AuthCtrlEventsManagerService } from "./events/auth-ctrl-events-manager.service";
import { AuthCTRL_RF_signInUser } from "./route-functions/sign-in-user.r-func";
import { AuthCTRL_RF_refreshJWTToken } from "./route-functions/refresh-jwt-token.r-func";
import { AuthCTRL_RF_initializeUser } from "./route-functions/initialize-user.r-func";
import { AuthCTRL_RF_updatePassword } from "./route-functions/update-password.r-func";
import { AuthCTRL_RF_verifyPhoneNumber } from "./route-functions/verify-phone-number.r-func";

class AuthAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "auth"

    BeforeInitialise(): void | Promise<void> {
        this.router.route("/create-user-account").post(AuthCTRL_RF_createUserAccount)

        this.router.route("/sign-in-user").post(AuthCTRL_RF_signInUser)

        this.router.route("/init-user").get(AuthCTRL_RF_initializeUser)

        this.router.route("/refresh").get(AuthCTRL_RF_refreshJWTToken)

        this.router.route("/verify-email").post(AuthCTRL_RF_verifyEmail)

        this.router.route("/verify-username").post(AuthCTRL_RF_verifyUserName)

        this.router.route("/verify-phone-number").post(AuthCTRL_RF_verifyPhoneNumber)

        this.router.route("/send-otp/:email").get(AuthCTRL_RF_sendOTP)

        this.router.route("/verify-otp/:ref/:otp").get(AuthCTRL_RF_verifyOTP)

        this.router.route("/update-password").post(AuthCTRL_RF_updatePassword)
    }

    MonthlyJob(): void | Promise<void> {
        AuthCtrlEventsManagerService.triggerSignupIdentifiersReCachingEvent()
    }
}

export const AuthRouteController = new AuthAPIRouteController("ControllerEngine: AuthRouteController", {
    useEncryterMiddleware: true,
    useBodyParser: true
})