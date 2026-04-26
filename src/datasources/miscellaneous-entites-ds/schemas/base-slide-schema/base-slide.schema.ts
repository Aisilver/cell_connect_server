import { AuthPageSlide, HomePageSlide, Slide } from "@shared/entities";
import { BaseEntity } from "../../../classes/base-entity.schema";
import { ChildEntity, Column, Entity, TableInheritance } from "typeorm";

@Entity('slides')
@TableInheritance({
    pattern: "STI",
    column: {
        name: "type",
        type: "varchar"
    }
})
export class SlideEntity extends BaseEntity implements Slide {
    @Column()
    declare media_id: number;
}

@ChildEntity('home-page-slide')
export class HomePageSlideEntity extends SlideEntity implements HomePageSlide {
    @Column()
    declare title: string;
    
    @Column()
    declare subtitle: string;
}

@ChildEntity('auth-page-slide')
export class AuthPageSlideEntity extends SlideEntity implements AuthPageSlide {
    @Column()
    declare title: string;

    @Column()
    declare message: string;
}