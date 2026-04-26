import { Attendance, AttendanceStatusTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";

@Entity("attendances")
export class AttendanceEntity extends BaseEntity implements Attendance {
    
    @Column()
    declare isLeader: boolean;
    
    @Column({nullable: true})
    arrivalTime?: Date;
    
    @Column({nullable: true})
    departureTime?: Date;
    
    @Column()
    declare valid: boolean;

    @Column()
    declare status: AttendanceStatusTypes;
    
    @ManyToOne(() => UserAccountEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    account: UserAccountEntity;
    
    @ManyToOne(() => MeetingEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    meeting: MeetingEntity;
}