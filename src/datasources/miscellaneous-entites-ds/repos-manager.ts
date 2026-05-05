import { DataSource } from "typeorm";
import { DataSourceManager } from "../../classes/datasource-manager/datasource-manager.class";
import MiscellenouseEntitiesDatasource  from "./datasource/datasource.ds";
import { SocialEntity } from "./schemas/social-schema/social.schema";
import { PasswordHistoryEntity } from "./schemas/password-history-schema/password-history.schema";
import { ActivityTimeRecordEntity } from "./schemas/activity-time-record-schema/activity-time-record.schema";
import { BaseSlidesRepoManager } from "./schemas/base-slide-schema/base-slide-repos-manager";
import { BaseJSONS_SchemeReposManager } from "./schemas/base-jsons-schema/base-jsons-schema-repo-manager";
import { BaseListsReposManager } from "./schemas/base-lists-schema/base-list-schema-repos-mamager";

class MiscellenouseRepoManager extends DataSourceManager {
    protected dataSource: DataSource = MiscellenouseEntitiesDatasource

    get SocialRepo () {return this.dataSource.getRepository(SocialEntity)}

    get PasswordHistoryRepo () {return this.dataSource.getRepository(PasswordHistoryEntity)}

    get ActivityTimeRecordRepo () {return this.dataSource.getRepository(ActivityTimeRecordEntity)}

    readonly ListsRepoManager = new BaseListsReposManager(this.dataSource)

    readonly SlidesRepoManager = new BaseSlidesRepoManager(this.dataSource)

    readonly JSONsRepoManager = new BaseJSONS_SchemeReposManager(this.dataSource)
}

export const MiscellaneousEntitiesRepoManagerService = new MiscellenouseRepoManager()