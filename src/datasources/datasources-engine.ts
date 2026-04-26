import { Engine } from "../classes/engine/engine.class";
import { InitializerConfig } from "../classes/engine/types";
import MainEntitiesDataSource from "./main-entities-ds/datasource/datasource.ds";
import MiscellenouseEntitiesDatasource from "./miscellaneous-entites-ds/datasource/datasource.ds";

class DataSourceEngine extends Engine {
    protected initializers: InitializerConfig[] = [
        {
            name: 'main entity datasource',
            priority: 'top',
            initFunc: async () => await MainEntitiesDataSource.initialize()
        },
        {
            name: "miscellenous entity datasource",
            priority: "top",
            initFunc: async () => await MiscellenouseEntitiesDatasource.initialize()
        }
    ];
}

export const DataSourcesEngine = new DataSourceEngine("Engine: DatasourceEngine")