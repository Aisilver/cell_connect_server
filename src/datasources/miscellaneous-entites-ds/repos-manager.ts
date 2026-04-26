import { DataSource } from "typeorm";
import { DataSourceManager } from "../../classes/datasource-manager/datasource-manager.class";
import MiscellenouseEntitiesDatasource  from "./datasource/datasource.ds";
import { SocialEntity } from "./schemas/social-schema/social.schema";
import { AuthPageSlideEntity, HomePageSlideEntity, SlideEntity } from "./schemas/base-slide-schema/base-slide.schema";
import { PasswordHistoryEntity } from "./schemas/password-history-schema/password-history.schema";
import { AppMeetingTypesEntity, CityEntity } from "./schemas/base-lists-schema/base-list.schema";
import { ActivityTimeRecordEntity } from "./schemas/activity-time-record-schema/activity-time-record.schema";
import { AppSettingsEntity } from "./schemas/base-jsons-schema/base-jsons.schema";

class MiscellenouseRepoManager extends DataSourceManager {
    protected dataSource: DataSource = MiscellenouseEntitiesDatasource

    get SocialRepo () {return this.dataSource.getRepository(SocialEntity)}

    get SlidesRepo () {return this.dataSource.getRepository(SlideEntity)}

    get PasswordHistoryRepo () {return this.dataSource.getRepository(PasswordHistoryEntity)}

    get AuthSlideRepo () {return this.dataSource.getRepository(AuthPageSlideEntity)}

    get HomeSlideRepo () {return this.dataSource.getRepository(HomePageSlideEntity)}

    get CityRepo () {return this.dataSource.getRepository(CityEntity)}

    get ActivityTimeRecordRepo () {return this.dataSource.getRepository(ActivityTimeRecordEntity)}

    get AppSettingsRepo () {return this.dataSource.getRepository(AppSettingsEntity)}

    get MeetingTypesRepo () {return this.dataSource.getRepository(AppMeetingTypesEntity)}
}

export const MiscellaneousEntitiesRepoManagerService = new MiscellenouseRepoManager()