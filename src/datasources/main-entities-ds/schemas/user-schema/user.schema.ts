import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "@shared/entities"
import { BaseEntity } from "../../../classes/base-entity.schema";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { UserLocationEntity } from "../app-location-schema/app-location.schema";

@Entity({name: "users"})
export class UserEntity extends BaseEntity implements User {
    @Column()
    declare firstName: string;

    @Column()
    declare lastName: string

    @Column({nullable: true})
    declare middleName?: string

    @Column({unique: true})
    declare phoneNumber: string

    @Column({nullable: true})
    declare altPhoneNumber?: string

    @Column({unique: true})
    declare email: string

    @Column({type: "text"})
    declare password: string

    @Column()
    declare gender: string

    @Column()
    declare maritalStatus: string
    
    @Column()
    declare DOB: Date;

    @OneToMany(() => AccountBaseEntity, account => account.user)
    accounts: AccountBaseEntity[]

    @OneToOne(() => UserLocationEntity, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare location: UserLocationEntity;
}