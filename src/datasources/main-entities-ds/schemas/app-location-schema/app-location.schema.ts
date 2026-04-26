import { Column, Entity } from "typeorm";
import { AppLocation } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";

@Entity('location')
export class AppLocationEntity extends BaseEntity implements AppLocation {
    @Column()
    declare state: string

    @Column()
    declare city: string;

    @Column()
    declare country: string;

    @Column({nullable: true})
    addressInFull?: string;
    
    @Column({nullable: true})
    latitude?: number;
    
    @Column({nullable: true})
    longtitude?: number;
    
    @Column({nullable: true})
    estateName?: string;
}