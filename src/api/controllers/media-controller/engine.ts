import { ControllerEngine } from "../../classes/controller-engine.class";
import { MR_getSystemMediaResources } from "./route-functions/get-default-media.r-func";
import { MR_getMediaById } from "./route-functions/get-media-by-id.r-func";
import { MR_getMediaByPath } from "./route-functions/get-media-by-path.r-func";
import { MR_mediaCacheUpload } from "./route-functions/media-cache-upload.r-func";
import multer from 'multer'

const upload = multer({storage: multer.memoryStorage()})

class MediasAPIRouteController extends ControllerEngine {
    protected routeBaseUrl: string = "media";

    BeforeInitialise(): void | Promise<void> {
        this.router.route("/byid/:id").get(MR_getMediaById)

        this.router.route("/:type/:name").get(MR_getMediaByPath)

        this.router.route("/defaults/:type/:name").get(MR_getSystemMediaResources)

        this.router.route("/cache-upload").post(upload.single('file'), MR_mediaCacheUpload)
    }
}

export const MediaRouteController = new MediasAPIRouteController("ControllerEngine: MediaRouteController")