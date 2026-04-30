import { DataSource } from "typeorm";
import { DataSourceManager } from "../../classes/datasource-manager/datasource-manager.class";
import MainEntitiesDataSource from "./datasource/datasource.ds";
import { UserEntity } from "./schemas/user-schema/user.schema";
import { UserAccountEntity } from "./schemas/user-account-schema/user-account.schema";
import { MediaEntity } from "./schemas/media-schema/media.schema";
import { AccountBaseEntity } from "./schemas/account-base-schema/account-base.schema";
import { AdminAccountEntity } from "./schemas/admin-account-schema/admin-account.schema";
import { AttendanceEntity } from "./schemas/attendance-schema/attendance.schema";
import { MeetingEntity } from "./schemas/meeting-schema/meeting.schema";
import { MeetingAgendaEntity } from "./schemas/meeting-agenda-schema/meeting-agenda.schema";
import { LeaderEntity } from "./schemas/leader-schema/leader.schema";
import { MemberEntity } from "./schemas/member-schema/member.schema";
import { AppLocationEntity } from "./schemas/app-location-schema/app-location.schema";
import { CellEntity } from "./schemas/cell-schema/cell.schema";

class MainEntitiesRepoManager extends DataSourceManager {
    
    protected dataSource: DataSource = MainEntitiesDataSource

    get UserEntityRepo () {return this.dataSource.getRepository(UserEntity)}

    get AccountBaseEntityRepo () {return this.dataSource.getRepository(AccountBaseEntity)}

    get AdminAccountEntityRepo () {return this.dataSource.getRepository(AdminAccountEntity)}

    get AttendanceEntityRepo () {return this.dataSource.getRepository(AttendanceEntity)}

    get UserAccountEntityRepo () {return this.dataSource.getRepository(UserAccountEntity)}

    get MediaEntityRepo () {return this.dataSource.getRepository(MediaEntity)}

    get MeetingEntityRepo () {return this.dataSource.getRepository(MeetingEntity)}

    get MeetingAgendaEntityRepo () {return this.dataSource.getRepository(MeetingAgendaEntity)}

    get MemberEntityRepo () {return this.dataSource.getRepository(MemberEntity)}

    get CellEntityRepo () {return this.dataSource.getRepository(CellEntity)}

    get AppLocationEntityRepo () {return this.dataSource.getRepository(AppLocationEntity)}

    get LeaderEntityRepo () {return this.dataSource.getRepository(LeaderEntity)}
}

export const MainEntitiesRepoManagerService = new MainEntitiesRepoManager()