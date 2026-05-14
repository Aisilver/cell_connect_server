import { ValueTransformer } from "typeorm";

export const Utc_Transformer: ValueTransformer = {
    to(value: Date | string) {
        return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
    },

    from (value: string) {
        return new Date(value)
    }
}