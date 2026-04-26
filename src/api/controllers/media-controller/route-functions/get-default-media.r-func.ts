import { Request, Response } from "express"
import { SystemsResourcesManagerService } from "../../../../services/system-resources-manager/system-resources-manager.service";
import Joi from "joi"

export async function MR_getSystemMediaResources (req: Request, res: Response) {

    try {
        const {type, name} = req.params,

        ext = name?.split('.')[1]?.toLowerCase(),

        {error} = Joi.array().items(Joi.string().required()).validate([type, name])
    
        if(error) throw error

        if(ext == "svg")
            res.setHeader("Content-Type", `${type?.toLowerCase()}/${ext}+xml`)
        else 
            res.setHeader("Content-Type", `${type?.toLowerCase()}/${ext}`)

        res.send(await SystemsResourcesManagerService.getSystemMediaResources(String(type), String(name)))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
}