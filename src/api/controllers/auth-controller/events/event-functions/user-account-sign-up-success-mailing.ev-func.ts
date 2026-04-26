import { User } from "@shared/entities";
import { AuthCtrlMailService } from "../../services/auth-ctrl-mail.service";
import { TextCapitalizer } from "../../../../../functions/capitalizer.func";

export async function AuthCTRL_EV_userAccountSignUpSuccessMailing (user: User) {
    const {firstName, email} = user

    const {delivered, message} = await AuthCtrlMailService.sendSignupSuccessMail(TextCapitalizer(firstName), email)

    if(!delivered) throw Error(message)
}