import { Request } from "express";
import { ApiJWTPayload } from "../types";

export function ExpressRequestJWTPayloadExtractor(req: Request) {
    //@ts-ignore
    if(!req.user) throw Error("unauthorized access detected")

    //@ts-ignore
    return req.user as ApiJWTPayload    
}