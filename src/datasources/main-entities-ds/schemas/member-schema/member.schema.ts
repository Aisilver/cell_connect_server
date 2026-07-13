import { Attendance, CellPermission, Member, MemberRoleTypes, MemberStatusTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CellEntity } from "../cell-schema/cell.schema";
import { UserAccountEntity } from "../user-account-schema/user-account.schema";
import { CellPermissionEntity } from "../cell-permission-schema/cell-permission.schema";
import { MemberSuspensionEntity } from "../suspension-schema/suspension.schema";
import { AttendanceEntity } from "../attendance-schema/attendance.schema";

@Entity("members")
export class MemberEntity extends BaseEntity implements Member {
    @Column()
    declare new: boolean;

    @Column()
    declare status: MemberStatusTypes;

    @Column()
    declare roles: MemberRoleTypes;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    declare account: UserAccountEntity;

    @OneToOne(() => CellPermissionEntity)
    @JoinColumn()
    declare cell_permission: CellPermission;

    @OneToMany(() => AttendanceEntity, attd => attd.membership)
    declare attendances?: AttendanceEntity[];

    @ManyToOne(() => CellEntity, cell => cell.members, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare cell: CellEntity;

    @OneToOne(() => MemberSuspensionEntity, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    declare suspension?: MemberSuspensionEntity;

    @OneToMany(() => MemberSuspensionEntity, sus => sus.member)
    declare suspensions: MemberSuspensionEntity[];
}