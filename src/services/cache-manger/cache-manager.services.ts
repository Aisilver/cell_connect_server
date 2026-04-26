import { config } from "dotenv"
import Redis from "ioredis"
import { TIME_IN_SECONDS_CONSTANT } from "../../constants/time-in-seconds.constant"

config()

const {REDIS_URL, NODE_ENV} = process.env,

{ DAY } = TIME_IN_SECONDS_CONSTANT

export class RedisCacheManager {
    redis!: Redis

    async Initialize(){
        this.redis = new Redis(REDIS_URL)

       await this.redis.ping()
    }

    hasKey = async (key: string) => (await this.redis.exists(`${NODE_ENV}:${key}`)) > 0; 

    async set(key: string, value: any, ttlSeconds: number = DAY) {
        const seralize = typeof value == "string" ? value : JSON.stringify(value)
        
        await this.redis.set(`${NODE_ENV}:${key}`, seralize, "EX", ttlSeconds)
    }

    async get<T = unknown>(key: string){
        const data = await this.redis.get(`${NODE_ENV}:${key}`)

        if(!data) return null

        else{
            try {
                return JSON.parse(data) as T
            } catch {
                return data as T
            }
        }
    }

    delete = async (...keys: string[]) =>  await this.redis.del(keys.map(ky => `${NODE_ENV}:${ky}`))

    makeGroupedKey(mainKey: string, ...keys: string[]){
        if(keys.length < 1)
            return `${mainKey}`
        else 
            return `${mainKey}:${keys.join(":")}`
    }
}

export const CacheManager = new RedisCacheManager()