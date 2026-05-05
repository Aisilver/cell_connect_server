import { DataSource } from "typeorm";
import { DataSourceManager } from "../../../../classes/datasource-manager/datasource-manager.class";
import { AuthPageSlideEntity, HomePageSlideEntity, MeetingPageSlideEntity, SlideEntity } from "./base-slide.schema";

export class BaseSlidesRepoManager extends DataSourceManager {
    protected dataSource: DataSource;

    constructor (datasource: DataSource) {
        super()
    
        this.dataSource = datasource
    }

    get SlidesRepo () {return this.dataSource.getRepository(SlideEntity)}

    get AuthPageSlideRepo () {return this.dataSource.getRepository(AuthPageSlideEntity)}

    get HomePageSlideRepo () {return this.dataSource.getRepository(HomePageSlideEntity)}

    get MeetingPageSlideRepo () {return this.dataSource.getRepository(MeetingPageSlideEntity)}
}