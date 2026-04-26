import { NextFunction, Request, Response } from "express";
import { APIResponseEncrypter } from "../functions/api-response-encrypter.func";
import { APIFailResponse } from "../functions/api-response.func";
import { API_HEADER_KEY_NAMES_CONSTANT } from "../../constants/api-header-key-names.constant";
import { ServerMainService } from "../../services/server.service";

export async function ResponseEncryptorMiddleWare (req: Request, res: Response, next: NextFunction){
  try {
    const {CLIENT_ID} = API_HEADER_KEY_NAMES_CONSTANT,
    
    clientID = req.get(CLIENT_ID),

    originalJson = res.json.bind(res)
    
    if(!clientID) return res.status(401).json(APIFailResponse("client id header not specified", 'NO_CLIENT_ID'))

    const clientPublic64Key = await ServerMainService.getClientResponseEncryptionPublic64Key(clientID)
  
    if(!clientPublic64Key) return res.status(401).json(APIFailResponse("client public key not found", 'INVALID_CLIENT_ID'))
    
    res.json = function (body) {
      const encryptedData = APIResponseEncrypter(body, clientPublic64Key)

      res.setHeader("x-content-encrypted", "true")
    
      return originalJson.call(this, encryptedData)
    }
    
    next()
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}