import { DataSource } from "typeorm";
import { DataSourceManager } from "../../../../classes/datasource-manager/datasource-manager.class";
import { AppSettingsEntity, BaseJSONEntity } from "./base-jsons.schema";

export class BaseJSONS_SchemeReposManager extends DataSourceManager {
    protected dataSource: DataSource;

    constructor (datasource: DataSource) {
        super()
        this.dataSource = datasource
    }

    get JSOSsRepo () {return this.dataSource.getRepository(BaseJSONEntity)} 

    get AppSettingsRepo () {return this.dataSource.getRepository(AppSettingsEntity)}

}