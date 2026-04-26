import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { ActivityTimeRecord } from "@shared/entities";

@Entity("activity-time-records")
export class ActivityTimeRecordEntity extends BaseEntity implements ActivityTimeRecord {
    @Column()
    declare accountId: number;

    @Column()
    declare entryTime: Date;

    @Column()
    declare timeDifference: number

    @Column()
    declare exitTime: Date;
}