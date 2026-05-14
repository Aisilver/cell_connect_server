import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { JWTConfigurator } from "../../../classes/jwt-configurator.class";
import { API_COOKIE_KEY_NAMES_CONSTANT } from "../../../../constants/api-cookie-key-names.contant";

const {REFRESH_TOKEN_KEY} = API_COOKIE_KEY_NAMES_CONSTANT,

jwtConfig = new JWTConfigurator()

export async function AuthCTRL_RF_refreshJWTToken(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies[REFRESH_TOKEN_KEY]

        if (!refreshToken) throw Error("no refresh token found")

        const payload = await jwtConfig.verifyToken(refreshToken, 'refresh')

        res.json(APIResponse(jwtConfig.generateAccessToken(payload)))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}