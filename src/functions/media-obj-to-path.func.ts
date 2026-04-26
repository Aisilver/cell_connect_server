import path from "path";
import { Media } from '@shared/entities';

export function mediaToPath(media: Media) {
    return path.join(media.type, `${media.name}.${media.ext}`)
}