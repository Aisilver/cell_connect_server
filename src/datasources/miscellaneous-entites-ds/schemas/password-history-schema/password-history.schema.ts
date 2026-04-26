import { PasswordHistory } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity } from "typeorm";

@Entity("password_historys")
export class PasswordHistoryEntity extends BaseEntity implements PasswordHistory {
    @Column()
    declare userId: number

    @Column()
    declare passwordHash: string
}