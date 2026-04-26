import { Leader, LeaderStatutsTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";

@Entity("leaders")
export class LeaderEntity extends BaseEntity implements Leader {
    @Column()
    declare cell_id: number;

    @Column()
    declare new: boolean;

    @Column()
    declare status: LeaderStatutsTypes;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    account: UserAccountEntity

    @OneToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    cell: CellEntity
}