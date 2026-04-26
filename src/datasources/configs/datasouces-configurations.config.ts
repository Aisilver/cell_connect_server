import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";

config()

const {DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USERNAME, NODE_ENV} = process.env


const DataSourceCofigurations: DataSourceOptions = {
    type: "postgres",
    host: String(DB_HOST),
    database: String(DB_NAME),
    port: Number(DB_PORT),
    password: String(DB_PASSWORD),
    username: String(DB_USERNAME),
    synchronize: NODE_ENV == 'development',
    logging: false
}

export default DataSourceCofigurations