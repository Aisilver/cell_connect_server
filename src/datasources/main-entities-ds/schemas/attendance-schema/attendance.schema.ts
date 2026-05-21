import { Attendance, AttendancePuntualityTypes, Member } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";
import { MemberEntity } from "../member-schema/member.schema";

@Entity("attendances")
export class AttendanceEntity extends BaseEntity implements Attendance {
    
    @Column()
    declare isLeader: boolean;
    
    @Column()
    declare valid: boolean;

    @Column()
    declare puntuality: AttendancePuntualityTypes;
    
    @Column({nullable: true})
    declare departureTime?: Date;
    
    @Column({nullable: true})
    declare validatedAt?: Date;
    
    @OneToOne(() => UserAccountEntity, {nullable: true})
    @JoinColumn()
    declare validator?: UserAccountEntity;

    @ManyToOne(() => UserAccountEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare account: UserAccountEntity;

    @ManyToOne(() => MemberEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare membership: MemberEntity;

    @ManyToOne(() => MeetingEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare meeting: MeetingEntity;
}