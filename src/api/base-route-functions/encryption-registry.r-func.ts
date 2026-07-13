import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../functions/api-response.func";
import Joi from "joi";
import { EncryptionRegistery } from "@shared/route-types";
import { ServerMainService } from "../../services/server.service";
      
const validationSchema = Joi.object<EncryptionRegistery>({
    clientId: Joi.string().required(),
    publicKey: Joi.string().required()
})

export async function MainRoute_encryptionRegistery (req: Request, res: Response) {
    try {
        const {error, value} = validationSchema.validate(req.body)

        if(error) throw error

        await ServerMainService.storeClientResponseEncryptionPublic64Key(value.clientId, value.publicKey)

        res.json(APIResponse())
    } catch (error: any) {
        res.json(APIFailResponse(error.message))        
    }
}