import { DataSource } from "typeorm";
import { MainEntitiesList } from "../entities-list";
import DataSourceCofigurations from "../../configs/datasouces-configurations.config";

const MainEntitiesDataSource = new DataSource({
    ...DataSourceCofigurations,
    entities: MainEntitiesList
})

export default MainEntitiesDataSource