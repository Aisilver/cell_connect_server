import { Attendance, AttendancePuntualityTypes, AttendanceTypes, OfflineMember } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";
import { MemberEntity } from "../member-schema/member.schema";
import { OfflineMemberEntity } from "../offline-member-schema/offline-member.schema";
@Entity("attendances")
export class AttendanceEntity extends BaseEntity implements Attendance {    
    @Column()
    declare type: AttendanceTypes;

    @Column()
    declare valid: boolean;

    @Column()
    declare puntuality: AttendancePuntualityTypes;
    
    @Column({nullable: true})
    declare departureTime?: Date;
    
    @Column({nullable: true})
    declare validatedAt?: Date;
    
    @ManyToOne(() => UserAccountEntity, {nullable: true})
    @JoinColumn()
    declare validator?: UserAccountEntity;

    @ManyToOne(() => MemberEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare membership: MemberEntity;

    @ManyToOne(() => OfflineMemberEntity)
    @JoinColumn()
    declare offlineMembership?: OfflineMember;

    @ManyToOne(() => MeetingEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare meeting: MeetingEntity;
}