import { config } from "dotenv";
import { Request, Response } from "express";
import { ResendEmailWebHookSubscription } from "../../../../subscriptions/email-webhook.subscription";
import { ResendWebhookEvent } from "src/subscriptions/types";

config()

export function WHR_resendEmailWebhook(req: Request, res: Response) {
    try {
        ResendEmailWebHookSubscription.next(req.body as ResendWebhookEvent);
        return res.sendStatus(200);
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}