import { AccountBase } from "@shared/entities";
import { SystemNotificationSubscription } from "../../subscriptions/system-notification.subscription";
import { AccountNotification } from "@shared/notifications";

class AccountEntityNotificationsHandler {
    private notifier = SystemNotificationSubscription

    notifyOfUserSignin (payload: AccountBase) {
        const notification: AccountNotification = {
            authurizationLevel: "general",
            entityGroup: "account",
            key: "account-signed-in",
            payload
        }

        this.notifier.next(notification)
    }

    notifyOfUserCreated (payload: AccountBase) {
        const notification: AccountNotification = {
            authurizationLevel: "general",
            entityGroup: "account",
            key: "account-created",
            payload
        }

        this.notifier.next(notification)
    }
}

export const AccountEntityNotificationManager =  new AccountEntityNotificationsHandler()