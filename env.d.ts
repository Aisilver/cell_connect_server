declare global {

    namespace NodeJS {
    
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'staging';
            
            PORT: string;
            
            MAIN_DOMAIN_ORIGIN_URL: string;
            
            MAIN_DOMAIN_ORIGIN: string;

            SERVER_DOMAIN_URL: string;

            ACCESS_TOKEN_SECRET_KEY: string;

            REFRESH_TOKEN_SECRET_KEY: string;

            REFRESH_TOKEN_COOKIE_NAME: string;
            
            DB_NAME: string;
            
            DB_HOST: string;
            
            DB_PORT: string;
            
            DB_USERNAME: string;
            
            DB_PASSWORD: string;

            MIGRATION_DB_NAME: string;
            
            RESEND_API_KEY: string;

            RESEND_WEBHOOK_SECRET: string;
            
            GMAIL_USER: string;
            
            GMAIL_PASS: string;
            
            GMAIL_HOST: string;
            
            GMAIL_PORT: string;

            REDIS_URL: string;

            SUPABASE_URL: string;

            SUPABASE_KEY: string;

            SUPABASE_BUCKET: string;
            
            STORAGE_FOLDERS: string;

            FFMPEG_LOCAL_PATH: string;
            
            FFMPEG_LOCAL_PROBE_PATH: string;
        }
    }
}
export {}