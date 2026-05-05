import { DataSource } from "typeorm";
import { DataSourceManager } from "../../../../classes/datasource-manager/datasource-manager.class";
import { AppMeetingTypesEntity, BaseListEntity, CityEntity } from "./base-list.schema";

export class BaseListsReposManager extends DataSourceManager {
    protected dataSource: DataSource;

    constructor (datasource: DataSource) {
        super()

        this.dataSource = datasource
    }

    get ListsRepo () {return this.dataSource.getRepository(BaseListEntity)}

    get CityRepo () {return this.dataSource.getRepository(CityEntity)}

    get MeetingTypesRepo () {return this.dataSource.getRepository(AppMeetingTypesEntity)}
}