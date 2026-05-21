import { Pagination } from "@shared/common";
import Joi from "joi";

export function PaginationParamValidator (data?: any) {
    return Joi.object<Pagination>({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })

    .required()

    .unknown()

    .validate(data)
    
}