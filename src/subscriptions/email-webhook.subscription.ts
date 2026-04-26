import { Subject } from "rxjs"
import { ResendWebhookEvent } from "./types"

export const ResendEmailWebHookSubscription = new Subject<ResendWebhookEvent>()