import { Leader, LeaderStatutsTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { CellPermissionEntity } from "../cell-permission-schema/cell-permission.schema";

@Entity("leaders")
export class LeaderEntity extends BaseEntity implements Leader {
    @Column()
    declare new: boolean;

    @Column()
    declare status: LeaderStatutsTypes;

    @OneToOne(() => CellPermissionEntity, {
        cascade: true
    })
    @JoinColumn()
    declare cell_permission: CellPermissionEntity;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    account: UserAccountEntity

    @OneToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    cell: CellEntity
}