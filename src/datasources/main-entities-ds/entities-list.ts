import { AccountBaseEntity } from "./schemas/account-base-schema/account-base.schema";
import { AdminAccountEntity } from "./schemas/admin-account-schema/admin-account.schema";
import { AppLocationEntity } from "./schemas/app-location-schema/app-location.schema";
import { AttendanceEntity } from "./schemas/attendance-schema/attendance.schema";
import { CellEntity } from "./schemas/cell-schema/cell.schema";
import { LeaderEntity } from "./schemas/leader-schema/leader.schema";
import { MediaEntity } from "./schemas/media-schema/media.schema";
import { MeetingAgendaEntity } from "./schemas/meeting-agenda-schema/meeting-agenda.schema";
import { MeetingEntity } from "./schemas/meeting-schema/meeting.schema";
import { MemberEntity } from "./schemas/member-schema/member.schema";
import { ReviewEntity } from "./schemas/review-schema/review.schema";
import { UserAccountEntity } from "./schemas/user-account-schema/user-account.schema";
import { UserEntity } from "./schemas/user-schema/user.schema";

export const MainEntitiesList = [
    UserEntity,
    AccountBaseEntity,
    AdminAccountEntity,
    UserAccountEntity,
    MediaEntity,
    AppLocationEntity,
    MeetingEntity,
    MeetingAgendaEntity,
    LeaderEntity,
    MemberEntity,
    CellEntity,
    ReviewEntity,
    AttendanceEntity
]