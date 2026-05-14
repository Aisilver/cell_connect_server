import { ValueTransformer } from "typeorm";

export const TextToSlugTransformer: ValueTransformer = {
    to(value: string) {
        return String(value).toLowerCase().replace(" ", "_")
    },

    from(value: string) {
        return value
    }
}