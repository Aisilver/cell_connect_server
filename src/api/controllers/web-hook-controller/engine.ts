import express, { Request, Response } from 'express'
import { ControllerEngine } from "../../classes/controller-engine.class";
import { WHR_resendEmailWebhook } from "./route-functions/resend-email-webhook.r-func";

class WebHookAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = 'webhook';
    
    BeforeInitialise(): void | Promise<void> {
        this.router.use(express.raw({ type: "application/json" }))

        this.router.route("/resend").post(WHR_resendEmailWebhook)
    }
}

export const WebHookRouteController = new WebHookAPIRouteController("ControllerEngine: WebHookRouteController")