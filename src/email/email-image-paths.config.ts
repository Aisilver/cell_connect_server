import { SystemsResourcesManagerService } from "../services/system-resources-manager/system-resources-manager.service"

const EmailImagePathsConfiguration = {
    LOGO: SystemsResourcesManagerService.generateURLPathToResourceMedia('image', 'logo.png'),

    WELCOME_BANNER: SystemsResourcesManagerService.generateURLPathToResourceMedia('image', 'undraw_welcome-cats_tw36.svg'),

    OTP_BANNER: SystemsResourcesManagerService.generateURLPathToResourceMedia('image', 'undraw_safe_0mei.svg'),

    BOOK_MEETING_BANNER: SystemsResourcesManagerService.generateURLPathToResourceMedia('image', 'undraw_fans_icv6.png'),

    EDIT_MEETING_BANNER: SystemsResourcesManagerService.generateURLPathToResourceMedia('image', 'undraw_update_jvp1.png')
}

export default EmailImagePathsConfiguration