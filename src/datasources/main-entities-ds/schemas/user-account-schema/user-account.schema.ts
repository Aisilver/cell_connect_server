import { ChildEntity, Column, OneToMany, OneToOne } from "typeorm";
import { UserAccount } from "@shared/entities";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { LeaderEntity } from "../leader-schema/leader.schema";
import { MemberEntity } from "../member-schema/member.schema";

@ChildEntity("user")
export class UserAccountEntity extends AccountBaseEntity implements UserAccount {
    @Column({nullable: true})
    name?: string;

    @Column({unique: true})
    declare username: string;
    
    @Column({nullable: true})
    declare bio: string;

    @OneToOne(() => LeaderEntity, leader => leader.account, {
        nullable: true
    })
    leadership?: LeaderEntity | null;

    @OneToMany(() => MemberEntity, member => member.account)
    membership: MemberEntity[];
}