import { Meeting, Review } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";

@Entity("reviews")
export class ReviewEntity extends BaseEntity implements Review {

    @Column()
    declare rating: number;

    @Column()
    declare body: string;

    @Column({nullable: true})
    declare hospitalityRating?: number;

    @Column({nullable: true})
    declare leaderShipRating?: number;

    @ManyToOne(() => AccountBaseEntity, {
        nullable: true,
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    account: AccountBaseEntity;

    @ManyToOne(() => MeetingEntity, {nullable: true})
    @JoinColumn()
    meeting: Meeting;
}