import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Social } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";

@Entity('socials')
export class SocialEntity extends BaseEntity implements Social {
    @Column()
    declare user_id: number

    @Column()
    declare type: string

    @Column()
    declare link: string
}