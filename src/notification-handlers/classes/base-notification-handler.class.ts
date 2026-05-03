import { SystemNotification } from "@shared/notifications";
import { Subject } from "rxjs";

export abstract class NotificationHandler {
    protected abstract notifier: Subject<SystemNotification<any>>
}