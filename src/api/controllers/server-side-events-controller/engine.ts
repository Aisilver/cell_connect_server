import Joi from "joi";
import { ControllerEngine } from "../../classes/controller-engine.class";
import { APIResponseEncrypter } from "../../functions/api-response-encrypter.func";
import { APIResponse } from "../../functions/api-response.func";
import { API_HEADER_KEY_NAMES_CONSTANT } from "../../../constants/api-header-key-names.constant";
import { ServerMainService } from "../../../services/server.service";
import { SystemNotificationSubscription } from "../../../subscriptions/system-notification.subscription";
import { ServerSideEventsCTRLEventsManager } from "./events/server-side-events-ctrl-route-events.service";
import { addMinutes } from "date-fns";
import { DynamicKeyTaskManager } from "../../../classes/dynamic-key-task-manager/dynamic-key-task-manager.class";
import { ClientAcvtivityEntryData } from "./types";

const {CLIENT_ID} = API_HEADER_KEY_NAMES_CONSTANT

class ServerSideEventsAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "notifications";

    private inAppInactiveUsersTaskManager = new DynamicKeyTaskManager("inactive-users-processor-task", this.accountInactiveTask)

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

                await this.inAppInactiveUsersTaskManager.killTask(accountId)

                const subscription = SystemNotificationSubscription.subscribe(notification => {
                    res.write(this.DataModifierForSSE(notification, clientPublicEncryptionKey))
                })

                ServerSideEventsCTRLEventsManager.triggerUserisActiveEvent({accountId, activityKey: clientID})

                req.on("close", () => {
                    subscription.unsubscribe()

                    this.inAppInactiveUsersTaskManager.addTask(accountId, {accountId, activityKey: clientID}, addMinutes(new Date(), 1))
                })

            } catch (error: any) {
                res.status(500).send(error.message)
            }
        })
    }

    accountInactiveTask (param: ClientAcvtivityEntryData) {
        ServerSideEventsCTRLEventsManager.triggerUserisInactiveEvent(param)
    }
}

export const ServerSideEventsRouteController = new ServerSideEventsAPIRouteController("ControllerEngine: ServerSideEventsRouteController", {
    useJWTMiddleware: true
})