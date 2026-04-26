import { SystemNotification } from "@shared/notifications";
import { Subject } from "rxjs";

export const SystemNotificationSubscription = new Subject<SystemNotification<any>>()