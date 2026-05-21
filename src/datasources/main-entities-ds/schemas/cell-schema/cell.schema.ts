import { Cell, CellCategoryTypes, Suspension } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { LeaderEntity } from "../leader-schema/leader.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";
import { MemberEntity } from "../member-schema/member.schema";
import { CellVenueLocationEntity } from "../app-location-schema/app-location.schema";
import { CellSuspensionEntity } from "../suspension-schema/suspension.schema";

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

    @Column()
    declare timezone: string;

    @OneToOne(() => CellVenueLocationEntity,{
        cascade: true,
        eager: true
    })
    @JoinColumn()
    declare default_venue: CellVenueLocationEntity;

    @OneToOne(() => CellSuspensionEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare suspension?: CellSuspensionEntity;

    @OneToOne(() => LeaderEntity, {
        cascade: true
    })
    declare leader: LeaderEntity

    @OneToMany(() => MemberEntity, member => member.cell)
    declare members: MemberEntity[]

    @OneToMany(() => MeetingEntity, meet => meet.cell)
    declare meetings: MeetingEntity[]

    @OneToMany(() => CellSuspensionEntity, sus => sus.cell)
    declare suspensions?: CellSuspensionEntity[];
}