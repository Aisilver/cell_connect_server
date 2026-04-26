import { Attendance } from "@shared/entities";
import { SchemaValidator } from "src/classes/schema-validator/schema-validator.class";
import { AttendanceEntity } from "./attendance.schema";
import Joi, { ObjectSchema } from "joi";

export class AttendanceEntitySchemaValidator extends SchemaValidator<Attendance | AttendanceEntity> {
    protected schemaValObj: ObjectSchema<Attendance | AttendanceEntity> = Joi.object({
        id: Joi.number().optional(),
        
        isLeader: Joi.boolean().required(),

        arrivalTime: Joi.date().optional(),

        departureTime: Joi.date().optional(),
       
        valid: Joi.boolean().required(),

        status: Joi.string().allow("present", "late", "absent").required(),

        createdAt: Joi.date().optional(),

        updatedAt: Joi.date().optional(),

        deletedAt: Joi.date().optional()
    });
}