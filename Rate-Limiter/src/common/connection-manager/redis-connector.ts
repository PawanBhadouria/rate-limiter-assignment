import { RedisClientType, createClient } from "redis";
import CONFIGURATION from "../config";

class RedisConnector {

    private static instance: RedisConnector;
    private static connectionInstance: Promise<RedisClientType>;

    private constructor() {
        RedisConnector.connectionInstance = this.connect() as Promise<RedisClientType>;
    }

    private async connect() {
        try {
            
            const client = createClient({ url: CONFIGURATION.REDIS_URLS.local, pingInterval: 30000 });
            await client.connect();
            if (await client.ping() == 'PONG') console.info(`App connected to REDIS SERVER`);
            
            return Promise.resolve(client);
        } catch (error) {
            console.error(`Redis connection error on App Boot`, error)
        }
    }

    public static async getInstance(): Promise<RedisClientType> {

        if ((RedisConnector.instance instanceof RedisConnector) === false) {
            RedisConnector.instance = new RedisConnector();
        }

        return Promise.resolve(RedisConnector.connectionInstance);
    }

    public static async closeInstance() {
        if (RedisConnector.instance instanceof RedisConnector) {
            (await RedisConnector.connectionInstance).quit();
        }
    }


}

export default RedisConnector;