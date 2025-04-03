
import { HEADERS, MESSAGES, STATUS ,ERROR_CLASS} from "../common/config/http-config";
import RedisConnector from "../common/connection-manager/redis-connector";
import appRouter from "../router/routes";
import express, { Application } from 'express';


/**
* =======================================
*  Application Class
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : Boot the application
* @param {array} middleware: Array of the all the required middlewares on load
* @param {object} routes: Application router
* @version : 1.0.0
*/


class App  {

    private app: Application;

    constructor() {
        this.app = express();
        this.autoload()
    }

    public async run(): Promise<void> {
        this.routes();
        RedisConnector.getInstance()

        this.app.listen(3000, () => {
            console.log(`Application is running at ${3000}`);
        });

    }

    private routes(): void {
        this.app.use('/e-commerce', appRouter)
    }

    protected async autoload() {

        /** Setting up the global HTTP Status codes */
        global.HTTP_CODE = STATUS;

        /** Setting up the global HTTP Status code messages */
        global.HTTP_MESG = MESSAGES;

        /** Setting up the global HTTP Headers */
        global.HTTP_HEADER = HEADERS;

        /** Setting up the global HTTP Error Class */
        global.ERROR_CLASS = ERROR_CLASS;
    }

}

export default App