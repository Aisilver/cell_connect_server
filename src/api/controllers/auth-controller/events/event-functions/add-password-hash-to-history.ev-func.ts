import { Equal } from "typeorm";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AuthPasswordHistoryUpdateEventParams } from "../types";

const {PasswordHistoryRepo} = MiscellaneousEntitiesRepoManagerService

export async function AuthCTRL_EV_addPasswordToUserPassordHistory (params: AuthPasswordHistoryUpdateEventParams) {
    const {passwordHash, userId} = params,

    passwordHistory = await PasswordHistoryRepo.find(
        {
            where: {
                userId: Equal(userId)
            },
            order: {
                createdAt: "DESC"
            }
        }
    )

    if(passwordHistory.length >= 5) await PasswordHistoryRepo.delete({id: Equal(Number(passwordHistory[4]?.id))})

    await PasswordHistoryRepo.save(PasswordHistoryRepo.create({passwordHash, userId}))
}