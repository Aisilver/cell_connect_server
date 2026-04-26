import "reflect-metadata"
import { MainEngine } from './classes/main-engine/main-engine.class'
import { ApiMainEngine } from './api/api-engine'
import { ServerEngine } from './server/server-engine'
import { DataSourcesEngine } from "./datasources/datasources-engine";
import { ServicesMainEngine } from "./services/services-main-engine";

const mainEngine = new MainEngine();

(async () => {
    mainEngine.register(ServerEngine)

    mainEngine.register(ServicesMainEngine)

    mainEngine.register(DataSourcesEngine)
    
    mainEngine.register(ApiMainEngine)

    mainEngine.HandleInjections();

    await mainEngine.InitializeAll();

    mainEngine.StartServer()
})()