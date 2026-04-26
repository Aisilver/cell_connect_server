import { DataSource } from "typeorm";
import DataSourceCofigurations from "../../configs/datasouces-configurations.config";
import { MiscellaneousEntitiesList } from "../entities-list";

const MiscellenouseEntitiesDatasource = new DataSource({
    ...DataSourceCofigurations,
    entities: MiscellaneousEntitiesList
})

export default MiscellenouseEntitiesDatasource