import { AccountEntityNotificationManager } from "../../../../../notification-handlers/account-notifications/account-entity.notification-handler";
import { ServerMainService } from "../../../../../services/server.service";
import { ServerSideEventsCTRLCacheManager } from "../../services/server-side-events-ctrl-cache.service";
import { ClientAcvtivityEntryData } from "../../types";

export async function SSE_CTRL_EV_userIsActive (param: ClientAcvtivityEntryData) {
    const {accountId, activityKey} = param,

    {CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION} = ServerSideEventsCTRLCacheManager,

    {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService,

    accountInCache = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

    if(!accountInCache) return

    AccountEntityNotificationManager.notifyOfUserSignin(accountInCache)

    await CACHED_CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION.add({
        accountId,
        activityKey,
        entryTime: new Date()
    })
}