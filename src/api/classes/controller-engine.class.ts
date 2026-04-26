import express, { Router } from "express";
import bodyParser from "body-parser";
import { Engine } from "../../classes/engine/engine.class";
import { ResponseEncryptorMiddleWare } from "../middlewares/response-encrypter.middleware";
import { JWTValidatorMiddleWare } from "../middlewares/jwt-validator.middleware";

type Option = {
    useEncryterMiddleware?: boolean;
    useJWTMiddleware?: boolean;
    useBodyParser?: boolean
}

export abstract class ControllerEngine extends Engine {
    private declare opt: Option
    
    protected router: Router = express.Router()

    protected abstract routeBaseUrl: string;

    constructor(engineName: string, opt?: Option) {
        super(engineName)
        
        if(opt?.useJWTMiddleware) this.router.use(JWTValidatorMiddleWare)
            
        if(opt?.useEncryterMiddleware) this.router.use(ResponseEncryptorMiddleWare)

        if(opt?.useBodyParser) this.router.use(bodyParser.json())
    }

    AfterInitialise(): void | Promise<void> {
        this.app.use(`/${this.routeBaseUrl}`, this.router)
    }
}