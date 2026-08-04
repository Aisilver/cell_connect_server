import { ControllerEngine } from "../../classes/controller-engine.class";
import { APIResponseEncrypter } from "../../functions/api-response-encrypter.func";
import { APIResponse } from "../../functions/api-response.func";
import { ServerMainService } from "../../../services/server.service";
import { SystemNotificationSubscription } from "../../../subscriptions/system-notification.subscription";
import { ServerSideEventsCTRLEventsManager } from "./events/server-side-events-ctrl-route-events.service";
import { addMinutes } from "date-fns";
import { DynamicKeyTaskManager } from "../../../classes/dynamic-key-task-manager/dynamic-key-task-manager.class";
import { ClientAcvtivityEntryData } from "./types";
import { IdValidator } from "../../validators/id-validator.vldtr";
import { API_COOKIE_KEY_NAMES_CONSTANT } from "../../../constants/api-cookie-key-names.contant";
import Joi from "joi";
import { JWTConfigurator } from "../../classes/jwt-configurator.class";

const {REFRESH_TOKEN_KEY} = API_COOKIE_KEY_NAMES_CONSTANT
class ServerSideEventsAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "notifications";

    private jwtConfig = new JWTConfigurator()

    private inAppInactiveUsersTaskManager = new DynamicKeyTaskManager("inactive-users-processor-task", this.accountInactiveTask)

    private DataModifierForSSE (data: any, public64Key: string) {
        return `data: ${JSON.stringify(APIResponseEncrypter(APIResponse(data), public64Key))} \n\n`
    }

    BeforeInitialise(): void | Promise<void> {

        this.router.use((req, res, next) => {
            res.setHeader("Content-Type", "text/event-stream")
            next()
        })

        this.router.route("/").get(async (req, res) => {
            try {
                const {error: clientIdValErr, value: clientID} = Joi.string().not("").required().validate(req.query['clid'])

                if(clientIdValErr) throw Error(`CLI_ERR: ${clientIdValErr.message}`)

                const refreshToken = req.cookies[REFRESH_TOKEN_KEY]

                if(!refreshToken) throw Error("no refresh token found")

                const {accountId} = await this.jwtConfig.verifyToken(refreshToken, "refresh")

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

export const ServerSideEventsRouteController = new ServerSideEventsAPIRouteController("ControllerEngine: ServerSideEventsRouteController")