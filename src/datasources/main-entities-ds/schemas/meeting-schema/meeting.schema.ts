import { Attendance, Meeting, MeetingStatusTypes, Review } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { MeetingAgendaEntity } from "../meeting-agenda-schema/meeting-agenda.schema";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { AttendanceEntity } from "../attendance-schema/attendance.schema";
import { ReviewEntity } from "../review-schema/review.schema";
import { AppLocationEntity, CellVenueLocationEntity } from "../app-location-schema/app-location.schema";

@Entity("meetings")
export class MeetingEntity extends BaseEntity implements Meeting {
    @Column({nullable: true})
    declare title?: string;

    @Column()
    declare type: string;

    @Column({nullable: true, type: "text"})
    declare description?: string;

    @Column()
    declare startTime: Date;

    @Column()
    declare endTime: Date;

    @Column()
    declare rating: number;

    @Column()
    declare status: MeetingStatusTypes;

    @ManyToOne(() => UserAccountEntity)
    @JoinColumn()
    host: UserAccountEntity;

    @OneToOne(() => CellVenueLocationEntity, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    declare venue: CellVenueLocationEntity;

    @OneToMany(() => MeetingAgendaEntity, agenda => agenda.meeting, {
        cascade: true
    })
    agendas: MeetingAgendaEntity[]  
    
    @OneToMany(() => AttendanceEntity, attendant => attendant.meeting)
    attendants: Attendance[];

    @OneToMany(() => ReviewEntity, review => review.meeting)
    reviews: Review[];

    @ManyToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    cell: CellEntity
}