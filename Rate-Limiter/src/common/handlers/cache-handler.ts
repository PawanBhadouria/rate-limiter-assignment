import { RedisClientType, SetOptions } from "redis";
import RedisConnector from "../connection-manager/redis-connector";
 

class CacheHandler {

    private readonly redisConnector: Promise<RedisClientType>;

    constructor() {
        this.redisConnector = RedisConnector.getInstance();
    }

    async GET(key: string) {
        try {

            const redis = await this.redisConnector;
            const response = await redis.get(key);

            return Promise.resolve(response);

        } catch (error: any) {
            console.log(error);
        }
    }

    async SET(key: string, value: any, options: SetOptions) {
        try {

            const redis = await this.redisConnector;
            const response = await redis.set(key, value, options);
            return Promise.resolve(response);

        } catch (error: any) {
            console.log(error);
        }
    }

    async INCR(key: string) {
        try {

            const redis = await this.redisConnector;
            const response = await redis.incr(key);

            return Promise.resolve(response);

        } catch (error: any) {
            console.log(error);
        }
    }

    
}

export default CacheHandler;