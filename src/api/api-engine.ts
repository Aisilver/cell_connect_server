import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { CarrierEngine } from "../classes/carrier-engine/carrier-engine.class";
import { Engine } from "../classes/engine/engine.class";
import { UsersRouteController } from "./controllers/users-controller/engine";
import { config } from "dotenv";
import { AuthRouteController } from "./controllers/auth-controller/engine";
import { MainRoute_encryptionRegistery } from "./route-functions/encryption-registry.r-func";
import { APIResponse } from "./functions/api-response.func";
import { MeetingsRouteController } from "./controllers/meetinigs-controllerr/engine";
import { PagesRouteController } from "./controllers/pages-controller/engine";
import { MediaRouteController } from "./controllers/media-controller/engine";
import { AppRouteController } from "./controllers/app-controller/engine";
import { WebHookRouteController } from "./controllers/web-hook-controller/engine";
import { ServerSideEventsRouteController } from './controllers/server-side-events-controller/engine';
import { MainRoute_getAppSettings } from './route-functions/get-app-settings.r-func';

config()

const {MAIN_DOMAIN_ORIGIN_URL} = process.env

class APIEngineMain extends CarrierEngine {
    protected engines: Engine[] = [
        AppRouteController,
        PagesRouteController,
        UsersRouteController,
        AuthRouteController,
        MeetingsRouteController,
        MediaRouteController,
        WebHookRouteController,
        ServerSideEventsRouteController
    ];

    BeforeInitialise(): void | Promise<void> {
        this.app.use(cors({
            origin: [MAIN_DOMAIN_ORIGIN_URL],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            exposedHeaders: ["x-content-encrypted"],
            credentials: true
        }))

        this.app.use(cookieParser())

        this.app.route(`/ping`).get((req, res) => res.json(APIResponse("pong")))

        this.app.use(bodyParser.json()).route('/pub_enc_reg').post(MainRoute_encryptionRegistery)
    
        this.app.route("/get-app-settings").get(MainRoute_getAppSettings)
    }
}

export const ApiMainEngine = new APIEngineMain("CarrirerEngine: ApiMainEngine")