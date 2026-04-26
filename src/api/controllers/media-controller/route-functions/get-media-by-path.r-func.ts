import { Request, Response } from "express";
import { FIleStorageService } from "../../../../services/storage-manger/storage-manager-service";
import Joi from "joi";

const fs = FIleStorageService.manager

export async function MR_getMediaByPath (req: Request, res: Response) {
    try {
        const {type, name} = req.params,

        {error, value} = Joi.array().items(Joi.string().required()).validate([type, name])
    
        if(error) throw error

        res.setHeader("Content-Type", `${type?.toLowerCase()}/${name?.split('.')[1]?.toLowerCase()}`)
        
        res.send(await fs.getFile(value))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
}