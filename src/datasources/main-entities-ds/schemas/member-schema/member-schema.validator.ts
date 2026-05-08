import Joi, { ObjectSchema } from "joi";
import { SchemaValidator } from "../../../../classes/schema-validator/schema-validator.class";
import { MemberEntity } from "./member.schema";
import { Member, MemberRoleTypes, MemberStatusTypes } from "@shared/entities";

export class MemberEntitySchemaValidator extends SchemaValidator<MemberEntity | Member> {
    protected schemaValObj: ObjectSchema<MemberEntity | Member> = Joi.object({
        id: Joi.number().optional(),

        new: Joi.boolean().required(),

        cell_id: Joi.number().optional(),

        roles: Joi.string<MemberRoleTypes>().allow("member", "cell-admin").required(),

        status: Joi.string<MemberStatusTypes>().allow("active", "suspended", "left", "pending-approval", "removed").required(),

        createdAt: Joi.date().optional(),

        updatedAt: Joi.date().optional(),

        deletedAt: Joi.date().optional()
    });
}