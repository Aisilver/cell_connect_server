import { AppLocation, CellVenueLocation, UserLocation } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import Joi, { ObjectSchema } from "joi";
import { AppLocationEntity, CellVenueLocationEntity, UserLocationEntity } from "./app-location.schema";

export class AppLocationEntitySchemaValidator extends SchemaValidator<AppLocation | AppLocationEntity | UserLocation | UserLocationEntity> {
    protected schemaValObj: ObjectSchema<AppLocation | AppLocationEntity> = Joi.object({
        id: Joi.number().optional(),
        
        city: Joi.string().required(),
        
        country: Joi.string().required(),
        
        state: Joi.string().required(),
        
        createdAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional()
    })
}

export class CellVenueLocationEntitySchemaValidator extends SchemaValidator<CellVenueLocation | CellVenueLocationEntity> {
    protected schemaValObj: Joi.ObjectSchema<CellVenueLocation | CellVenueLocationEntity> = Joi.object({
        id: Joi.number().optional(),
        
        city: Joi.string().required(),
        
        country: Joi.string().required(),
        
        state: Joi.string().required(),

        addressInFull: Joi.string().required(),

        landmark: Joi.string().required(),

        estateName: Joi.string().empty("").optional(),

        latitude: Joi.string().empty("").optional(),

        longtitude: Joi.string().empty("").optional(),
        
        createdAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional()
    });
}
