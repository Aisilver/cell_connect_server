import { BasePermission } from "@shared/common";
import { CellPermission } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity } from "typeorm";

@Entity("cell-permissions")
export class CellPermissionEntity extends BaseEntity implements CellPermission {
    @Column({type: "jsonb"})
    declare meeting_permissions: BasePermission;

    @Column({ type: "jsonb" })
    declare member_permissions: BasePermission;
}