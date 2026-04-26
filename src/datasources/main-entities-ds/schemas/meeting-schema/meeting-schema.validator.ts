import { Meeting } from "@shared/entities";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { MeetingEntity } from "./meeting.schema";
import Joi, { ObjectSchema } from "joi";
import { MeetingAgendaEntitySchemaValidator } from "../meeting-agenda-schema/meeting-agenda-schema.validator";
import { AppLocationEntitySchemaValidator } from "../app-location-schema/app-location-schema.validator";

export class MeetingEntitySchemaValidator extends SchemaValidator<Meeting | MeetingEntity> {
    protected schemaValObj: ObjectSchema<Meeting | MeetingEntity> = Joi.object({
        id: Joi.number().optional(),
        
        title: Joi.string().empty("").optional(),

        type: Joi.string().required(),
        
        description: Joi.string().empty("").optional(),
        
        startTime: Joi.date().required(),
        
        endTime: Joi.date().required(),
        
        rating: Joi.number().required(),

        status: Joi.string().allow("booked", "pending", "in-session", "concluded", "canceled").required(),

        agendas: Joi.array().items(new MeetingAgendaEntitySchemaValidator().getSchemaValidationObject()).empty().optional(),

        venue: new AppLocationEntitySchemaValidator().getSchemaValidationObject().optional(),

        createdAt: Joi.date().optional(),

        updatedAt: Joi.date().optional(),

        deletedAt: Joi.date().optional()
    });
}