import { AppSettings } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Entity, Column, ChildEntity, TableInheritance } from "typeorm";



@Entity("jsons")
@TableInheritance({
    pattern: "STI",
    column: {
        type: "varchar",
        name: "type"
    }
})
export class BaseJSONEntity<KeyType = unknown> extends BaseEntity {
    @Column({type: "varchar"})
    key: KeyType;

    @Column({type: "jsonb"})
    body: any
}


@ChildEntity("app-settings")
export class AppSettingsEntity extends BaseJSONEntity<keyof AppSettings> {}