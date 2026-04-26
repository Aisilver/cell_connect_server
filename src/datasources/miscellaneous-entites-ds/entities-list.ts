import { ActivityTimeRecordEntity } from "./schemas/activity-time-record-schema/activity-time-record.schema";
import { JSONSchemaEntitiesList } from "./schemas/base-jsons-schema/json-schema-entities-list";
import { ListSchemaEntitiesList } from "./schemas/base-lists-schema/list-schema-entities-lists";
import { SlideSchemaEntitesList } from "./schemas/base-slide-schema/slide-schema-entities-list";
import { PasswordHistoryEntity } from "./schemas/password-history-schema/password-history.schema";
import { SocialEntity } from "./schemas/social-schema/social.schema";

export const MiscellaneousEntitiesList = [
    SocialEntity,
    PasswordHistoryEntity,
    ActivityTimeRecordEntity,
    ...JSONSchemaEntitiesList,
    ...ListSchemaEntitiesList,
    ...SlideSchemaEntitesList
]