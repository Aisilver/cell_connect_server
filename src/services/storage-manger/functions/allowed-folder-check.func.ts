import Joi from "joi";

export function CheckAllowedFolderName(folderName: string) {
    const val = Joi.string().allow("image", "audio", "text").required(),

    {error} = val.validate(folderName)

    if(error) throw error
}