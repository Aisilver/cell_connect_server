import { AccountEntityNotificationManager } from "../../../../../entites-notification-handlers/account-notifications/account-entity.notification-handler";
import { ServerMainService } from "../../../../../services/server.service";
import { ClientAcvtivityEntryData } from "../../types";

export async function SSE_CTRL_EV_userIsActive (param: ClientAcvtivityEntryData) {
    const {accountId} = param,

    {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService,

    accountIncache = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

    if(!accountIncache) return

    AccountEntityNotificationManager.notifyOfUserSignin(accountIncache)
}