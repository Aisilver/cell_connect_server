import { Request, Response } from "express";
import { FIleStorageService } from "../../../../services/storage-manger/storage-manager-service";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal } from "typeorm";

const fs = FIleStorageService.manager,

repo = MainEntitiesRepoManagerService.MediaEntityRepo

export async function MR_getMediaById (req: Request, res: Response) {
    try {
        const {id} = req.params,

        {error: stringValidError} = Joi.string().required().validate(id),

        {error: numValidError} = Joi.number().validate(Number(id))

        if(stringValidError) throw stringValidError

        if(numValidError) throw numValidError

        const media = await repo.findOne({where: {id: Equal(Number(id))}})

        if(!media) throw Error("not found")

        res.setHeader("Content-Type", media.mime)

        res.send(await fs.getFile(media))

    } catch (error: any) {
        res.status(404).send(error.message)
    }
}