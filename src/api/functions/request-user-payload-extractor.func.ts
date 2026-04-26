import { Request } from "express";
import { AppJWTPayload } from "../classes/jwt-configurator.class";

export function RequestJWTPayloadExtractor(req: Request) {
    //@ts-ignore
    if(!req.user) throw Error("user is an imposter")

    //@ts-ignore
    return req.user as AppJWTPayload    
}