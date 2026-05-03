import { ClientAcvtivityEntryData } from "../../types";
import { ServerSideEventsCTRLCacheManager } from "../../services/server-side-events-ctrl-cache.service";
import { ServerMainService } from "../../../../../services/server.service";
import { AccountEntityNotificationManager } from "../../../../../notification-handlers/account-notifications/account-entity.notification-handler";

export async function SSE_CTRL_EV_userIsInactive (param: ClientAcvtivityEntryData) {
    const {activityKey, accountId} = param,
    
    {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService,

    {CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION} = ServerSideEventsCTRLCacheManager,

    clientActivityDataInCache = await CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION.findAndPop(data => data.activityKey == activityKey),
    
    accountInCache = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

    if(!clientActivityDataInCache) return

    if(!accountInCache) await CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION.findAndPop(data => data.activityKey == activityKey)
    
    else {
        AccountEntityNotificationManager.notifyOfUserSignOut(accountInCache)

        clientActivityDataInCache.exitTIme = new Date()

        CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION.add(clientActivityDataInCache)
    }
}