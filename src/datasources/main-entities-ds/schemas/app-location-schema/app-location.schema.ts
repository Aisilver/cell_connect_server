import { ChildEntity, Column, Entity, OneToOne, TableInheritance } from "typeorm";
import { AppLocation, CellVenueLocation, Meeting, UserLocation } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { MeetingEntity } from "../meeting-schema/meeting.schema";
@Entity('location')
@TableInheritance({
    pattern: "STI",
    column: {
        name: "type",
        type: "varchar"
    }
})
export class AppLocationEntity extends BaseEntity implements AppLocation {
    @Column()
    declare state: string

    @Column()
    declare city: string;

    @Column()
    declare country: string;
}

@ChildEntity("user-location")
export class UserLocationEntity extends AppLocationEntity implements UserLocation {}

@ChildEntity("cell-venue")
export class CellVenueLocationEntity extends AppLocationEntity implements CellVenueLocation {
    @Column()
    declare default: boolean;
    
    @Column()
    declare addressInFull: string;

    @Column()
    declare landmark: string;

    @Column({nullable: true})
    declare latitude?: number;
    
    @Column({nullable: true})
    declare longtitude?: number;
    
    @Column({nullable: true})
    declare estateName?: string;
}