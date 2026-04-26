import { Engine } from "../classes/engine/engine.class";
import { InitializerConfig } from "../classes/engine/types";
import { config } from "dotenv";
import Joi from "joi";

config()

const ENVSchema = Joi.object<NodeJS.ProcessEnv>({
    NODE_ENV: Joi.string().allow("development", "production", "staging").required(),
    
    PORT: Joi.string().allow("3000", "4500", "5000").required(),
    
    MAIN_DOMAIN_ORIGIN_URL: Joi.string().required(),
    
    MAIN_DOMAIN_ORIGIN: Joi.string().required(),

    SERVER_DOMAIN_URL: Joi.string().required(),

    ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),

    REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),

    REFRESH_TOKEN_COOKIE_NAME: Joi.string().required(),
    
    DB_NAME: Joi.string().required(),
    
    DB_HOST: Joi.string().required(),
    
    DB_PORT: Joi.string().required(),
    
    DB_USERNAME: Joi.string().required(),
    
    DB_PASSWORD: Joi.string().required(),
    
    MIGRATION_DB_NAME: Joi.string().required(),
    
    RESEND_API_KEY: Joi.string().required(),

    RESEND_WEBHOOK_SECRET: Joi.string().required(),

    GMAIL_USER: Joi.string().required(),

    GMAIL_PASS: Joi.string().required(),

    GMAIL_HOST: Joi.string().required(),

    GMAIL_PORT: Joi.string().required(),

    REDIS_URL: Joi.string().required(),

    STORAGE_FOLDERS: Joi.string().required()
}).unknown(true)

class ServerEngineMain extends Engine {
    protected initializers: InitializerConfig[] = [
        {
            name: "env validation",
            priority: 'top',
            initFunc: () => {
                const {error} = ENVSchema.validate(process.env, {allowUnknown: true})

                if(error) throw Error(error.message)
            }
        }
    ];
}

export const ServerEngine = new ServerEngineMain("Engine: ServerEngine")