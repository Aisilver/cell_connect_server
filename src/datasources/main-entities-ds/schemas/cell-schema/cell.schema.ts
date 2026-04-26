import { Cell, CellCategoryTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { LeaderEntity } from "../leader-schema/leader.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";
import { MemberEntity } from "../member-schema/member.schema";
import { AppLocationEntity } from "../app-location-schema/app-location.schema";

@Entity("cells")
export class CellEntity extends BaseEntity implements Cell {
    
    @Column()
    declare name: string;
    
    @Column()
    declare description: string;
    
    @Column()
    declare category: CellCategoryTypes | string;
    
    @Column()
    declare no_of_members: number;
    
    @Column()
    declare rating: number;

    @OneToOne(() => LeaderEntity, {
        cascade: true
    })
    leader: LeaderEntity

    @OneToOne(() => AppLocationEntity,{
        cascade: true,
        eager: true
    })
    @JoinColumn()
    address: AppLocationEntity;

    @OneToMany(() => MemberEntity, member => member.cell)
    members: MemberEntity[]

    @OneToMany(() => MeetingEntity, meet => meet.cell)
    meetings: MeetingEntity[]
}