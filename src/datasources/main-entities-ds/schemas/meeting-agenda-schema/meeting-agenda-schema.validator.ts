import { MeetingAgenda } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { MeetingAgendaEntity } from "./meeting-agenda.schema";
import Joi, { ObjectSchema } from "joi";

export class MeetingAgendaEntitySchemaValidator extends SchemaValidator<MeetingAgenda | MeetingAgendaEntity> {
    protected schemaValObj: ObjectSchema<MeetingAgenda | MeetingAgendaEntity> = Joi.object({
        id: Joi.number().optional(),

        topic: Joi.string().required(),

        description: Joi.string().empty("").optional(),
        
        startTime: Joi.date().required(),

        endTime: Joi.date().required(),

        default: Joi.boolean().optional(),
        
        status: Joi.string().allow("held", "pending", "holding"),

        createdAt: Joi.date().optional(),
        
        updatedAt: Joi.date().optional(),

        deletedAt: Joi.date().optional()
    });
}