import { MeetingAgenda, MeetingAgendaStatuses } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MeetingEntity } from "../meeting-schema/meeting.schema";

@Entity("meet-agendas")
export class MeetingAgendaEntity extends BaseEntity implements MeetingAgenda {
    @Column()
    declare topic: string;
    
    @Column({nullable: true, type: "text"})
    declare description?: string;
    
    @Column()
    declare startTime: Date;
   
    @Column()
    declare endTime: Date;
    
    @Column({nullable: true})
    declare default?: boolean;

    @Column()
    declare status: MeetingAgendaStatuses;

    @ManyToOne(() => MeetingEntity, meet => meet.agendas, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    meeting: MeetingEntity
}