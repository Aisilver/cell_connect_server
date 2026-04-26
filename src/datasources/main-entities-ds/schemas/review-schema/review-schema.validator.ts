import { Review } from "@shared/entities";
import { SchemaValidator } from "src/classes/schema-validator/schema-validator.class";
import { ReviewEntity } from "./review.schema";
import Joi, { ObjectSchema } from "joi";

export class ReviewEntitySchemaValidator extends SchemaValidator<Review | ReviewEntity> {
    protected schemaValObj: ObjectSchema<Review | ReviewEntity> = Joi.object({
        id: Joi.number().optional(),

        body: Joi.string().required(),

        rating: Joi.number().required(),

        hospitalityRating: Joi.number().optional(),

        leaderShipRating: Joi.number().optional(),

        createdAt: Joi.date().optional(),

        deletedAt: Joi.date().optional(),

        updatedAt: Joi.date().optional()
    });
}