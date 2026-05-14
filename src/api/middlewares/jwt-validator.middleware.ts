import { NextFunction, Request, Response } from "express";
import { APIFailResponse } from "../functions/api-response.func";
import { JWTConfigurator } from "../classes/jwt-configurator.class";
import { API_HEADER_KEY_NAMES_CONSTANT } from "../../constants/api-header-key-names.constant";

const {ACCESS_TOKEN_KEY} = API_HEADER_KEY_NAMES_CONSTANT,

jwtConfig = new JWTConfigurator()

export async function JWTValidatorMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const accessTokenHeader = req.get(ACCESS_TOKEN_KEY)

        if(!accessTokenHeader) return res.status(401).json(APIFailResponse("authorization token header was not found", "NO_TOKEN"))

        const accessToken = accessTokenHeader.split(" ")[1]

        if(!accessToken) return res.status(401).json(APIFailResponse('corrupted bearer token', 'INVALID_TOKEN'))
        
        jwtConfig.verifyToken(accessToken)
        
        .then(payload => {
            //@ts-ignore
            req.user = payload
            next()
        })
        
        .catch(() => res.status(403).json(APIFailResponse('', 'TOKEN_EXPIRED')))
    
    } catch (error: any) {
        res.status(500).send(error.message)
    } 
}