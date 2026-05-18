import { Attendance, Meeting, MeetingEditLog, MeetingStatusTypes, Review } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { MeetingAgendaEntity } from "../meeting-agenda-schema/meeting-agenda.schema";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { AttendanceEntity } from "../attendance-schema/attendance.schema";
import { ReviewEntity } from "../review-schema/review.schema";
import { CellVenueLocationEntity } from "../app-location-schema/app-location.schema";
import { MeetingEditLogEntity } from "../meeting-edit-log-schema/meeting-edit-log.schema";
import { Utc_Transformer } from "../../../../typeorm-middlewares/date-utc-transformer.type-middleware";

@Entity("meetings")
export class MeetingEntity extends BaseEntity implements Meeting {
    @Column({nullable: true})
    declare title?: string;

    @Column()
    declare type: string;

    @Column({nullable: true, type: "text"})
    declare description?: string;

    @Column({transformer: Utc_Transformer})
    declare startTime: Date;

    @Column({transformer: Utc_Transformer})
    declare endTime: Date;

    @Column({ nullable: true, transformer: Utc_Transformer })
    declare actualStartTime?: Date;

    @Column({ nullable: true, transformer: Utc_Transformer })
    declare actualEndTime?: Date;

    @Column()
    declare rating: number;

    @Column()
    declare status: MeetingStatusTypes;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    declare host: UserAccountEntity;

    @OneToOne(() => CellVenueLocationEntity, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    declare venue: CellVenueLocationEntity;

    @OneToMany(() => MeetingAgendaEntity, agenda => agenda.meeting, {
        cascade: true
    })
    declare agendas: MeetingAgendaEntity[]  
    
    @OneToMany(() => AttendanceEntity, attendant => attendant.meeting)
    declare attendants: Attendance[];

    @OneToMany(() => ReviewEntity, review => review.meeting)
    declare reviews: Review[];

    @OneToMany(() => MeetingEditLogEntity, log => log.meeting)
    declare editLogs: MeetingEditLog[];

    @ManyToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare cell: CellEntity
}