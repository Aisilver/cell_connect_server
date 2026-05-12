import { MeetingEditLog } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";

@Entity("meeting-edit-logs")
export class MeetingEditLogEntity extends BaseEntity implements MeetingEditLog {
    @Column({ nullable: true })
    declare title_changed?: boolean;

    @Column({nullable: true})
    declare description_changed?: boolean;

    @Column({ nullable: true })
    declare venue_changed?: boolean;

    @Column({ nullable: true })
    declare date_time_changed?: boolean;

    @Column({ nullable: true })
    declare agenda_changed?: boolean;

    @Column({ nullable: true })
    declare type_changed?: boolean;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    declare editor: UserAccountEntity

    @ManyToOne(() => MeetingEntity)
    @JoinColumn()
    declare meeting: MeetingEntity
}