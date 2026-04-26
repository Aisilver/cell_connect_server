 import { TIME_IN_SECONDS_CONSTANT } from "../../../../constants/time-in-seconds.constant";
import { BaseCacheManager } from "../../../../classes/base-cache-manager/base-cache-service.class"
import { CacheManager, RedisCacheManager } from "../../../../services/cache-manger/cache-manager.services";
import { SignUpIdentifiers } from "../auth-controller.types";

const { MINUTE, MONTH, WEEK } = TIME_IN_SECONDS_CONSTANT

class AuthControllerCacheManager extends BaseCacheManager {
    protected CacheClient: RedisCacheManager = CacheManager;

    protected namespace: string = "auth";

    readonly SIGN_UP_IDENTIFIERS_GROUP_CACHE = this.Collection<SignUpIdentifiers>("sign_up_identifiers", MONTH) 
    
    setOTPWIthRef (ref: string, otp: string) {
        return this.CacheClient.set(ref, otp, (MINUTE * 5))
    }

    getOTPByRef (ref: string) {
        return this.CacheClient.get<string>(ref)
    }

    setUserRefreshToken (userID: number, refreshToken: string) {
        return this.CacheClient.set(`REFRESH_KEY_OF:${userID}`, refreshToken, WEEK)
    }

    getUserRefreshToken (userID: number) {
        return this.CacheClient.get<string>(`REFRESH_KEY_OF:${userID}`)
    }

    deleteUserRefreshToken (userID: number) {
        return this.CacheClient.delete(`REFRESH_KEY_OF:${userID}`)
    }
}

export const AuthCtrlCacheService = new AuthControllerCacheManager()