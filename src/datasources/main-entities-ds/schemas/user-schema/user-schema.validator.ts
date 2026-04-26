import Joi from "joi";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { User } from "@shared/entities";
import { UserEntity } from "./user.schema";
import { AppLocationEntitySchemaValidator } from "../app-location-schema/app-location-schema.validator";


export class UserEntitySchemaValidator extends SchemaValidator<User | UserEntity> {
    protected schemaValObj: Joi.ObjectSchema<User | UserEntity> = Joi.object<User | UserEntity>({
        id: Joi.number().optional(),
        
        firstName: Joi.string().lowercase().required(),
        
        lastName: Joi.string().lowercase().required(),
        
        middleName: Joi.string().lowercase().empty('').optional(),
        
        phoneNumber: Joi.string().required(),
        
        altPhoneNumber: Joi.string().empty('').optional(),
        
        email: Joi.string().required().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
        
        password: Joi.string().required(),
        
        gender: Joi.string().allow('male', 'female').required(),
        
        maritalStatus: Joi.string().allow('married', 'single').required(),
        
        DOB: Joi.date().required(),
        
        new: Joi.boolean().required(),
        
        status: Joi.string().allow('active', 'frozen', 'deleted').required(),
        
        createdAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional(),

        location: new AppLocationEntitySchemaValidator().getSchemaValidationObject().optional()        
    })
}