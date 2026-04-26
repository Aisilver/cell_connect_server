import { SchemaValidator } from "src/classes/schema-validator/schema-validator.class";
import { CellEntity } from "./cell.schema";
import { Cell } from "@shared/entities";
import Joi, { ObjectSchema } from "joi";
import { LeaderEntitySchemaValidator } from "../leader-schema/leader-schema.validator";
import { MemberEntitySchemaValidator } from "../member-schema/member-schema.validator";
import { MeetingEntitySchemaValidator } from "../meeting-schema/meeting-schema.validator";

export class CellEntitySchemaValidator extends SchemaValidator<CellEntity | Cell> {
    protected schemaValObj: ObjectSchema<CellEntity | Cell> = Joi.object({
        id: Joi.number().optional(),

        name: Joi.string().required(),
        
        category: Joi.string().required(),

        description: Joi.string().required(),

        no_of_members: Joi.number().required(),

        rating: Joi.number().required(),

        leader: new LeaderEntitySchemaValidator().getSchemaValidationObject().optional(),

        meetings: Joi.array().items(new MeetingEntitySchemaValidator().getSchemaValidationObject()).empty().optional(),

        members: Joi.array().items(new MemberEntitySchemaValidator().getSchemaValidationObject()).empty().optional(),

        createdAt: Joi.date().optional(),

        updatedAt: Joi.date().optional(),

        deletedAt: Joi.date().optional()
    });
} 