import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import DataSourceCofigurations from "../../configs/datasouces-configurations.config";

config()

const { MIGRATION_DB_NAME } = process.env,

{database, type, synchronize, ...rest} = DataSourceCofigurations,

opt: DataSourceOptions = {
    type: "postgres",
    database: String(MIGRATION_DB_NAME),
    synchronize: false,
    migrations: ['dist/migrations/main/*.js']
}

Object.assign(opt, rest)

export default new DataSource(opt)