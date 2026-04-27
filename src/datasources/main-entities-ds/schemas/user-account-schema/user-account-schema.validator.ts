import { UserAccount } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { UserAccountEntity } from "./user-account.schema";
import Joi, { ObjectSchema } from "joi";
import { UserEntitySchemaValidator } from "../user-schema/user-schema.validator";
import { MediaEntityValidator } from "../media-schema/media-schema.validator";

export class UserAccountEntitySchemaValidator extends SchemaValidator <UserAccount | UserAccountEntity> {
    protected schemaValObj: ObjectSchema<UserAccount | UserAccountEntity> = Joi.object({
        id: Joi.number().optional(),

        type: Joi.string().allow("admin", "user").optional(),

        online_status: Joi.string().allow('online', 'offine').required(),
        
        banned: Joi.boolean().required(),
        
        suspended: Joi.boolean().required(),
            
        createdAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional(),

        username: Joi.string().required(),

        name: Joi.string().empty('').optional(),
        
        bio: Joi.string().empty('').optional(),
        
        user: new UserEntitySchemaValidator().getSchemaValidationObject().optional(),

        profile_image: new MediaEntityValidator().getSchemaValidationObject().optional()
    });
    
}