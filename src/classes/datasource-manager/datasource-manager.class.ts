import { DataSource } from "typeorm";

export abstract class DataSourceManager {
    protected abstract dataSource: DataSource 
} 