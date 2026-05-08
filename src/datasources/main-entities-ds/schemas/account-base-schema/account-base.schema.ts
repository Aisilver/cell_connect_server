import { AccountBase, AccountOnlineStatuses, AccountStatuses, AccountType, Media, Suspension } from "@shared/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, TableInheritance } from "typeorm";
import { MediaEntity } from "../media-schema/media.schema";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { UserEntity } from "../user-schema/user.schema";
import { AccountSuspensionEntity } from "../suspension-schema/suspension.schema";

@Entity("accounts")
@TableInheritance({
    pattern: "STI",
    column: {
        name: "type",
        type: "varchar"
    }
})
export class AccountBaseEntity extends BaseEntity implements AccountBase {
    declare type?: AccountType;
    
    @Column()
    declare banned: boolean;
    
    @Column()
    declare new: boolean;

    @Column()
    declare status: AccountStatuses;

    @Column()
    declare online_status: AccountOnlineStatuses;
    
    @OneToOne(() => UserEntity, user => user.accounts, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    declare user: UserEntity;

    @OneToOne(() => MediaEntity, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({name: 'media_id'})
    declare profile_image: Media;
}