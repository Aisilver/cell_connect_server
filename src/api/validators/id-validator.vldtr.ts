import Joi from "joi";

export function IdValidator (id?: number | string) {
    return Joi.number().not(0).required().validate(id)
} 