import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { APIFailResponse } from "../functions/api-response.func";
import { JWTConfigurator } from "../classes/jwt-configurator.class";

config()

const jwtConfig = new JWTConfigurator()

export async function JWTValidatorMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const accessTokenHeader = req.get('Authorization')

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