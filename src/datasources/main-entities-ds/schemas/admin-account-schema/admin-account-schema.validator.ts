import { AdminAccount } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { AdminAccountEntity } from "./admin-account.schema";
import Joi, { ObjectSchema } from "joi";
import { UserEntitySchemaValidator } from "../user-schema/user-schema.validator";
import { MediaEntityValidator } from "../media-schema/media-schema.validator";

export class AdminAccountSchemaValidator extends SchemaValidator<AdminAccount | AdminAccountEntity> {
    protected schemaValObj: ObjectSchema<AdminAccount | AdminAccountEntity> = Joi.object({
        id: Joi.number().optional(),

        type: Joi.string().allow("admin", "user").optional(),

        online_status: Joi.string().allow('online', 'offine').required(),
        
        banned: Joi.boolean().required(),

        lastUsed: Joi.boolean().required(),
        
        suspended: Joi.boolean().required(),
            
        createdAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional(),

        user: new UserEntitySchemaValidator().getSchemaValidationObject().optional(),

        profile_image: new MediaEntityValidator().getSchemaValidationObject().optional()
    });
    
}