import { AccountBase, AppSettings } from "@shared/entities";
import { BaseCacheManager } from "../classes/base-cache-manager/base-cache-service.class"
import { CacheManager, RedisCacheManager } from "./cache-manger/cache-manager.services"
import { TIME_IN_SECONDS_CONSTANT } from "../constants/time-in-seconds.constant";
import { AccountBaseEntity } from "../datasources/main-entities-ds/schemas/account-base-schema/account-base.schema";

const { MONTH } = TIME_IN_SECONDS_CONSTANT

class ServerService extends BaseCacheManager {
    protected namespace: string = "server";

    protected CacheClient: RedisCacheManager = CacheManager;

    readonly CAHCED_SIGNED_IN_ACCOUNTS = this.Collection<AccountBaseEntity | AccountBase>("signed-in-accounts", MONTH * 3)

    readonly CACHED_APP_SETTINGS = this.SingleItem<AppSettings>("app-settings", MONTH * 3)
    
    async storeClientResponseEncryptionPublic64Key (clientID: string, public64Key: string) {
        await CacheManager.set(CacheManager.makeGroupedKey('USER_PUB_KEY', clientID), public64Key)
    }

    getClientResponseEncryptionPublic64Key (clientID: string) {
        return CacheManager.get<string>(CacheManager.makeGroupedKey('USER_PUB_KEY', clientID))
    }
}

export const ServerMainService = new ServerService()