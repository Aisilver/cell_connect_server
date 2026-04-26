import { User } from "@shared/entities";
import { BaseEventManager } from "../../../../classes/base-event-manger/base-event-service.class"
import { AuthPasswordHistoryUpdateEventParams, AuthUserProfileUploadEventParams } from "./types";
import { AuthCTRL_EV_signUpIdentifiersReCachingEventHandler } from "./event-functions/sign-up-identifiers-re-cahching.ev-func";
import { AuthCTRL_EV_userProfileImageUploader } from "./event-functions/user-profile-image-uploader.ev-func";
import { AuthCTRL_EV_userAccountSignUpSuccessMailing } from "./event-functions/user-account-sign-up-success-mailing.ev-func";
import { AuthCTRL_EV_addPasswordToUserPassordHistory } from "./event-functions/add-password-hash-to-history.ev-func";

class AuthsControllerEventsManager extends BaseEventManager {
    private readonly SIGN_UP_IDENTIFIERS_CACHING_EVENT_KEY = "sign-up-identifiers-re-cahche"

    private readonly USER_PROFILE_IMAGE_UPLOAD_EVENT_KEY = "user-profile-image-uplaod"

    private readonly USER_SIGN_UP_SUCCESS_MAILING_EVENT_KEY = "user-sign-up-success-mailing"

    private readonly ADD_PASSWORD_HASH_TO_USER_PASSWORD_HISTORY_KEY = "add-password-to-user-password-history"

    protected ListenAll(): void {
        this.ListenFor(this.SIGN_UP_IDENTIFIERS_CACHING_EVENT_KEY, AuthCTRL_EV_signUpIdentifiersReCachingEventHandler)

        this.ListenFor(this.USER_PROFILE_IMAGE_UPLOAD_EVENT_KEY, AuthCTRL_EV_userProfileImageUploader)
    
        this.ListenFor(this.USER_SIGN_UP_SUCCESS_MAILING_EVENT_KEY, AuthCTRL_EV_userAccountSignUpSuccessMailing)

        this.ListenFor(this.ADD_PASSWORD_HASH_TO_USER_PASSWORD_HISTORY_KEY, AuthCTRL_EV_addPasswordToUserPassordHistory)
    }

    triggerSignupIdentifiersReCachingEvent = () => this.Trigger(this.SIGN_UP_IDENTIFIERS_CACHING_EVENT_KEY)

    triggerUserSignUpSuccessMailingEvent = (param: User) => this.Trigger(this.USER_SIGN_UP_SUCCESS_MAILING_EVENT_KEY, param)

    triggerUserAccountImageUploadEvent = (param: AuthUserProfileUploadEventParams) => this.Trigger(this.USER_PROFILE_IMAGE_UPLOAD_EVENT_KEY, param)

    triggerPasswordHistoryUpdateEvent = (param: AuthPasswordHistoryUpdateEventParams) => this.Trigger(this.ADD_PASSWORD_HASH_TO_USER_PASSWORD_HISTORY_KEY, param)
}

export const AuthCtrlEventsManagerService = new AuthsControllerEventsManager()