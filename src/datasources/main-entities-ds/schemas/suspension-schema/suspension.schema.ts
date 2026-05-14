import { ChildEntity, Column, Entity, JoinColumn, ManyToOne, TableInheritance } from "typeorm";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { AccountSuspension, Cell, CellSuspension, Member, MemberSuspension, Suspension } from "@shared/entities";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { MemberEntity } from "../member-schema/member.schema";
import { CellEntity } from "../cell-schema/cell.schema";
import { Utc_Transformer } from "../../../../typeorm-middlewares/date-utc-transformer.type-middleware";

@Entity("suspension")
@TableInheritance({
    pattern: "STI",
    column: {
        name: "type",
        type: "varchar"
    }
})
export class SuspensionEntity extends BaseEntity implements Suspension {
    @Column()
    declare active: boolean;

    @Column({transformer: Utc_Transformer})
    declare endDate: Date;

    @Column()
    declare reason: string;

    @Column({nullable: true, type: "text"})
    declare description?: string;

    @ManyToOne(() => AccountBaseEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare suspender: AccountBaseEntity;
}

@ChildEntity("member-suspension")
export class MemberSuspensionEntity extends SuspensionEntity implements MemberSuspension {
    @ManyToOne(() => MemberEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare member: Member;
}

@ChildEntity("cell-suspension")
export class CellSuspensionEntity extends SuspensionEntity implements CellSuspension {
    @ManyToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare cell: Cell;
}

@ChildEntity("account-suspension")
export class AccountSuspensionEntity extends SuspensionEntity implements AccountSuspension {
    @ManyToOne(() => AccountBaseEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare account: AccountBaseEntity;
}