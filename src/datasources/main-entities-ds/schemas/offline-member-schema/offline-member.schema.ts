import { Attendance, Cell, OfflineMember, UserGenderTypes, UserMaritalStatuses } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CellEntity } from "../cell-schema/cell.schema";
import { AttendanceEntity } from "../attendance-schema/attendance.schema";

@Entity("offline-members")
export class OfflineMemberEntity extends BaseEntity implements OfflineMember {
    @Column()
    declare firstName: string;

    @Column()
    declare lastName: string;

    @Column({ nullable: true })
    declare middleName?: string;

    @Column({ nullable: true })
    declare email?: string;
    
    @Column()
    declare DOB: Date;
    
    @Column()
    declare gender: UserGenderTypes;
    
    @Column()
    declare maritalStatus: UserMaritalStatuses;
    
    @OneToMany(() => AttendanceEntity, attd => attd.offlineMembership)
    declare attendances?: Attendance[];

    @ManyToOne(() => CellEntity, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    cell?: Cell;
}