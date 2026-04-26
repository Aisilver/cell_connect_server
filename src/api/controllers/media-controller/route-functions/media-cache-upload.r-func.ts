import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MediaCacheManagerService } from "../../../../services/media-cache-manager/media-cache-manager.service";

export async function MR_mediaCacheUpload(req: Request, res: Response) {
    try{
        const { file } = req

        if(!file) throw Error("file blob data could not be found")

        const mediaRef = await MediaCacheManagerService.storeBuffer(file.buffer)

        res.json(APIResponse(mediaRef))
    } catch(error: any) {
        res.json(APIFailResponse(error.message))
    }
}