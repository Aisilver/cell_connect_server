import { Media } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { MediaEntity } from "./media.schema";
import Joi, { ObjectSchema } from "joi";

export class MediaEntityValidator extends SchemaValidator<Media | MediaEntity> {
    protected schemaValObj: ObjectSchema<Media | MediaEntity> = Joi.object({
        id: Joi.number().optional(),
        name: Joi.string().required(),
        ext: Joi.string().required(),
        type: Joi.string().required(),
        byteSize: Joi.number().required(),
        mime: Joi.string().required(),
        createdAt: Joi.date().optional(),
        updatedAt: Joi.date().optional(),
        deletedAt: Joi.date().optional()
    });
    
}