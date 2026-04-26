import { AppSettings } from "@shared/entities";

export const APP_DEFAULT_SETTINGS_CONSTANT: AppSettings = {
    meeting_settings: {
        min_meeting_start_time: {
            hour: 12,
            minute: 0
        },
        
        max_meeting_start_time: {
            hour: 17,
            minute: 0
        },
        
        min_meeting_duration: "30m",

        max_meeting_duration: "3h"
    },

    user_settings: {
        user_new_state_duration_in_days: 1
    }
}