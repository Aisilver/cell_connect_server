import { Request, Response } from "express";
import Joi from "joi";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { EmailOTPVerificationResponse } from "@shared/route-types";

export async function AuthCTRL_RF_verifyOTP(req: Request, res: Response) {
    try {
        const {ref, otp} = req.params,

        {error} = Joi.object({ref: Joi.string(), otp: Joi.string()}).validate({ref, otp})

        if(error) throw error

        const cahchedOtp = await AuthCtrlCacheService.getOTPByRef(String(ref))

        if(!cahchedOtp) throw Error("code has expired")
        
        res.json(APIResponse<EmailOTPVerificationResponse>({valid: cahchedOtp == otp}))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}