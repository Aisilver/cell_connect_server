import { AccountBase } from "@shared/entities";
import { SystemNotificationSubscription } from "../../subscriptions/system-notification.subscription";
import { AccountNotification } from "@shared/notifications";
import { NotificationHandler } from "../classes/base-notification-handler.class";

class AccountEntityNotificationsHandler extends NotificationHandler {
    protected notifier = SystemNotificationSubscription

    notifyOfUserSignin (payload: AccountBase) {
        const notification: AccountNotification = {
            authurizationLevel: "general",
            entityGroup: "account",
            key: "account-signed-in",
            payload
        }

        this.notifier.next(notification)
    }

    notifyOfUserSignOut (payload: AccountBase) {
        const notification: AccountNotification = {
            authurizationLevel: "general",
            entityGroup: "account",
            key: "account-signed-out",
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

export const AccountEntityNotificationManager = new AccountEntityNotificationsHandler()