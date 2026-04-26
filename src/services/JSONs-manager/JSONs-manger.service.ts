import { List } from "@shared/entities"
import { SystemsResourcesManagerService } from "../system-resources-manager/system-resources-manager.service"

class JSONsManager {
    getDefaultCites() {
        return SystemsResourcesManagerService.getSystemJSONResources<List[]>('default-cities.json')
    }

    getDefaultMeetingTypes() {
        return SystemsResourcesManagerService.getSystemJSONResources<List[]>('default-meeting-types.json')
    }
}

export const JSONsManagerService = new JSONsManager()