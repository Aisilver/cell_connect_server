import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { SignUpIdentifiers } from "../../auth-controller.types";
import { AuthCtrlCacheService } from "../../services/auth-ctrl-cache.service";

const {UserAccountEntityRepo} = MainEntitiesRepoManagerService

export async function AuthCTRL_EV_signUpIdentifiersReCachingEventHandler() {
    const response = await UserAccountEntityRepo.find({
        select: {
            username: true
        }
    }),

    identifiers = response.map<SignUpIdentifiers>(acct => {
        const {username, user} = acct,

        {email, phoneNumber} = user

        return {
            username,
            email,
            phoneNumber
        }
    })

    await AuthCtrlCacheService.SIGN_UP_IDENTIFIERS_GROUP_CACHE.set(identifiers)

    console.log(await AuthCtrlCacheService.SIGN_UP_IDENTIFIERS_GROUP_CACHE.get())

    console.log(await AuthCtrlCacheService.SIGN_UP_IDENTIFIERS_GROUP_CACHE.exists())
}