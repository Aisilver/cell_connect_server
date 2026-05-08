import { ChildEntity, Column, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Leader, Suspension, UserAccount } from "@shared/entities";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { LeaderEntity } from "../leader-schema/leader.schema";
import { MemberEntity } from "../member-schema/member.schema";
import { AccountSuspensionEntity } from "../suspension-schema/suspension.schema";

@ChildEntity("user")
export class UserAccountEntity extends AccountBaseEntity implements UserAccount {
    @Column({nullable: true})
    name?: string;

    @Column({unique: true})
    declare username: string;
    
    @Column({nullable: true})
    declare bio: string;

    @OneToOne(() => LeaderEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare currentLeadership?: LeaderEntity;

    @OneToOne(() => MemberEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare currentMembership?: MemberEntity;

    @OneToMany(() => LeaderEntity, leader => leader.account)
    declare leaderships: LeaderEntity[];

    @OneToMany(() => MemberEntity, member => member.account)
    declare memberships: MemberEntity[];

    @OneToOne(() => AccountSuspensionEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare suspension?: AccountSuspensionEntity;

    @OneToMany(() => AccountSuspensionEntity, sus => sus.account)
    declare suspensions?: AccountSuspensionEntity[];
}