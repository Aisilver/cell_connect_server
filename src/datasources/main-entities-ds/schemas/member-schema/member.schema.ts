import { Member, MemberStatusTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";

@Entity("members")
export class MemberEntity extends BaseEntity implements Member {
    
    @Column()
    declare cell_id: number;

    @Column()
    declare new: boolean;

    @Column()
    declare status: MemberStatusTypes;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    account: UserAccountEntity

    @ManyToOne(() => CellEntity, cell => cell.members, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'cell_id'})
    cell: CellEntity
}