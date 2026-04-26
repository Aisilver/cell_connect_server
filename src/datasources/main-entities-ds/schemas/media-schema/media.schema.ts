import { Column, Entity } from "typeorm";
import { Media } from "@shared/entities"
import { BaseEntity } from "../../../classes/base-entity.schema";

@Entity('media')
export class MediaEntity extends BaseEntity implements Media {
    @Column()
    declare name: string;

    @Column()
    declare ext: string;

    @Column()
    declare type: string;

    @Column()
    declare byteSize?: number;
    
    @Column()
    declare mime: string;
}