import { EntityBase } from "@shared/entities";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity implements EntityBase {
    @PrimaryGeneratedColumn()
    declare id: number

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;

    @Column({nullable: true})
    deletedAt?: Date;
}