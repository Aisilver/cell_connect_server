import { Leader } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { LeaderEntity } from "./leader.schema";
import Joi, { ObjectSchema } from "joi";

export class LeaderEntitySchemaValidator extends SchemaValidator<Leader | LeaderEntity> {
    protected schemaValObj: ObjectSchema<Leader | LeaderEntity> = Joi.object({
        id: Joi.number().required(),
        
        new: Joi.boolean().required(),

        cell_id: Joi.number().optional(),
        
        createdAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional(),
        
        deletedAt: Joi.date().optional()
    });
}