import { BasePermission } from "@shared/common";
import { CellPermission } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { Column, Entity } from "typeorm";

@Entity("cell-permissions")
export class CellPermissionEntity extends BaseEntity implements CellPermission {
    @Column({type: "jsonb"})
    declare cell_permissions: { 
        canPostAnnouncements: boolean; 
        canViewAnalytics: boolean; 
        canCheckIn: boolean; 
    };
    
    @Column({type: "jsonb"})
    declare meeting_hub_permissions: { 
        hub_permissions: {
            canStartMeeting: boolean; 
            canEndMeeting: boolean; 
            canViewAnalytics: boolean;
            canEditAgenda: boolean; 
        };

        broadcast_permissions: BasePermission;
        
        members_permissions: { 
            attendance_permissions: { 
                canRecordAttendance: boolean; 
            }; 
        } & BasePermission; 
    };
    
    @Column({type: "jsonb"})
    declare meeting_permissions: BasePermission;

    @Column({ type: "jsonb" })
    declare member_permissions: BasePermission;
}