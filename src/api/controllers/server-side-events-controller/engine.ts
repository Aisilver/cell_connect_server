import Joi from "joi";
import cron from "node-cron"
import { Subscription } from "rxjs";
import { ControllerEngine } from "../../classes/controller-engine.class";
import { APIResponseEncrypter } from "../../functions/api-response-encrypter.func";
import { APIResponse } from "../../functions/api-response.func";
import { API_HEADER_KEY_NAMES_CONSTANT } from "../../../constants/api-header-key-names.constant";
import { ScheduledTask } from "node-cron";
import { ServerMainService } from "../../../services/server.service";
import { SystemNotificationSubscription } from "../../../subscriptions/system-notification.subscription";
import { ServerSideEventsCTRLEventsManager } from "./events/server-side-events-ctrl-route-events.service";
import { addMinutes } from "date-fns";
import { dateToCronExpression } from "../../../functions/date-to-cron.func";
import { randomUUID } from "crypto";

const {CLIENT_ID} = API_HEADER_KEY_NAMES_CONSTANT

class ServerSideEventsAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "notifications";

    private inAppActiveUsersNotificationSubscriptionMap = new Map<number, Subscription>()

    private inAppInactiveUsersTaskMap = new Map<number, ScheduledTask>()

    private DataModifierForSSE (data: any, public64Key: string) {
        return `data: ${JSON.stringify(APIResponseEncrypter(APIResponse(data), public64Key))} \n\n`
    }

    BeforeInitialise(): void | Promise<void> {

        this.router.use((req, res, next) => {
            res.setHeader("Content-Type", "text/event-stream")

            next()
        })

        this.router.route("/:accountId").get(async (req, res) => {
            try {
                const {error, value: accountId} = Joi.number().not(0).validate(req.params['accountId'])

                if(error) throw error

                const clientID = req.get(CLIENT_ID)

                if(!clientID) throw Error("client id was not provided")

                const clientPublicEncryptionKey = await ServerMainService.getClientResponseEncryptionPublic64Key(clientID)

                if(!clientPublicEncryptionKey) throw Error("public key could not be found")

                const activityKey = atob(clientPublicEncryptionKey)

                this.killAccountInactiveTask(accountId)

            this.inAppActiveUsersNotificationSubscriptionMap
                    .set(
                        accountId, 
                        SystemNotificationSubscription.subscribe(notification => this.DataModifierForSSE(notification, clientPublicEncryptionKey))
                    )

                ServerSideEventsCTRLEventsManager.triggerUserisActiveEvent({accountId, activityKey})

                req.on("close", () => {
                    const exc_time = addMinutes(new Date(), 1),

                    task = cron.schedule(
                        dateToCronExpression(exc_time),

                        () => this.accountInactiveTask(accountId),

                        {maxExecutions: 1} 
                    )

                    this.inAppInactiveUsersTaskMap.set(accountId, task)
                })

            } catch (error: any) { 
                res.write(`error: ${error.message}`)
            }
        })
    }

    killAccountInactiveTask (accountId: number) {
        const task = this.inAppInactiveUsersTaskMap.get(accountId)

        if(!task) return

        task.destroy()

        this.inAppInactiveUsersTaskMap.delete(accountId)
    }

    accountInactiveTask (accountId: number) {
        ServerSideEventsCTRLEventsManager.triggerUserisInactiveEvent(accountId)
    }
}

export const ServerSideEventsRouteController = new ServerSideEventsAPIRouteController("ControllerEngine: ServerSideEventsRouteController", {
    useJWTMiddleware: true
})