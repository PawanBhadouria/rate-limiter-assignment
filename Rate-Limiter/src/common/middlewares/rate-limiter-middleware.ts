import { Request, Response, NextFunction } from "express";
import APIException from "../exceptions/api.exception";
import ErrorHandler from "../handlers/error-handler";
import CacheHandler from "../handlers/cache-handler";
import CONFIGURATION from "../config";
import RateLimiterException from "../exceptions/rateLimiter.exception";
import KafkaConnector from "../connection-manager/kafka-connector";




/**
* =======================================
*  Rate Limiter Middleware
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : controls the number of requests a client can make within a specific time frame to prevent abuse,.
* @version : 1.0.0
*/
class RateLimiterMiddleware {

    private middleware: any;
    private cacheHandler: CacheHandler
    

    constructor() {
        this.init();
        this.cacheHandler = new CacheHandler()
        
    }

    private init() {

        this.middleware = async (req: Request, res: Response, next: NextFunction) => {
            try {

                const userKey = req.userInfo.username;
                const cacheKey = this.generateCacheKey(userKey)


                let cachedRequests = await this.cacheHandler.GET(cacheKey);

                if (!cachedRequests) {
                    await this.cacheHandler.SET(cacheKey, 1, { "EX": CONFIGURATION.WINDOW_SIZE });

                } else if (parseInt(cachedRequests) >= CONFIGURATION.MAX_REQUESTS) {
                    const kafkaProducer = await  KafkaConnector.getInstance()
                    // Log message sent to Kafka
                    await kafkaProducer.send("rate-limiter-logs", [
                        { value: JSON.stringify({ userKey, message: HTTP_MESG.TO_MANY_REQUEST }) },
                    ]);


                    throw new RateLimiterException()
                }else {
                    await this.cacheHandler.INCR(cacheKey); // Increase the counter by 1
                }
                next();

            } catch (error: any) {
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled == false) ? new APIException('', error.stack) : error;
                ErrorHandler.handle(res, apiException);
            }
        }

    }

    get getmiddleware(): any {
        return this.middleware
    }

    private generateCacheKey(userID: string): string {
        return `RATE_LIMIT:${userID}`
    }

}

export default RateLimiterMiddleware;
