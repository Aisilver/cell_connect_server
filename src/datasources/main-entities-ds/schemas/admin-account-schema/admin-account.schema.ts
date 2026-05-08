import { ChildEntity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { AdminAccount } from "@shared/entities";
import { AccountSuspensionEntity } from "../suspension-schema/suspension.schema";

@ChildEntity("admin")
export class AdminAccountEntity extends AccountBaseEntity implements AdminAccount {
    @OneToOne(() => AccountSuspensionEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare suspension?: AccountSuspensionEntity;

    @OneToMany(() => AccountSuspensionEntity, sus => sus.account)
    declare suspensions?: AccountSuspensionEntity[];
}