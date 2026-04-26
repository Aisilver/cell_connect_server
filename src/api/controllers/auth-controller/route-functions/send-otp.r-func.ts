import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { UUIDGenerator } from "../../../../functions/UUID-generator.func";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { AuthCtrlMailService } from "../services/auth-ctrl-mail.service";
import Joi from "joi";

export async function AuthCTRL_RF_sendOTP(req: Request, res: Response) {
    try {
        
        const {email} = req.params,

        {error} = Joi.string().validate(email)

        if(error) throw error

        const otpRef = UUIDGenerator(12),

        otp = UUIDGenerator(6, "only-numbers")

        await AuthCtrlCacheService.setOTPWIthRef(otpRef, otp)

        const {message} = await AuthCtrlMailService.sendOtpVerificationMail(String(email), otp)

        res.json(APIResponse(otpRef, message))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }   
}