import { config } from "dotenv";
import { Engine } from "../classes/engine/engine.class";
import { InitializerConfig } from "../classes/engine/types";
import { CacheManager } from "./cache-manger/cache-manager.services";
import { FFMPEGMangerService } from "./ffmpeg-manger/ffmpeg-manager.service";
import { FIleStorageService } from "./storage-manger/storage-manager-service";
import { MailManager } from "./mail-manager/mail-manager.service";

config()

const {NODE_ENV} = process.env

class MainServicesEngine extends Engine {
    protected initializers: InitializerConfig[] = [
        {
            name: "mail service resend email provider configuration",
            priority: 'top',
            initFunc: async () => MailManager.InitializeResend()
        },
        {
            name: "mail service nodemailer email provider configuration",
            priority: 'low',
            initFunc: async () => {if(NODE_ENV == 'development') return MailManager.InitializeNodeMailer()}
        },
        {
            name: 'cache service configuration',
            priority: 'top',
            initFunc: async () => CacheManager.Initialize()
        },
        {
            name: "storage service configuration",
            priority: 'low',
            initFunc: async () => FIleStorageService.InitializeManager()
        },
        {
            name: "ffmpeg availabilty test",
            priority: 'top',
            initFunc: async () => FFMPEGMangerService.testAvailability()
        }
    ];
}

export const ServicesMainEngine = new MainServicesEngine("Engine: Main Services Engine")