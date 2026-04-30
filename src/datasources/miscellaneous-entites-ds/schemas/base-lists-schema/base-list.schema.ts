import { List, ListTypes } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { ChildEntity, Column, Entity, TableInheritance } from "typeorm";

@Entity("lists")
@TableInheritance({
    pattern: "STI",
    column: {
        type: "varchar",
        name: "type"
    }
})
export class BaseListEntity extends BaseEntity implements List {
    declare type?: ListTypes;

    @Column()
    declare slug: string

    @Column()
    declare disabled: boolean;

    @Column()
    declare default: boolean;
}

@ChildEntity('cities')
export class CityEntity extends BaseListEntity {}

@ChildEntity('meeting-types')
export class AppMeetingTypesEntity extends BaseListEntity {}