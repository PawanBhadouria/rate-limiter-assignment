import express, { Response, Request } from 'express'
import v1 from '../v1/v1.module';

const appRouter = express.Router();

/** 
 * Health Check API Route
 */
appRouter.all('/health-check', (req: Request, res: Response) => {
    res.status(200).send(
        {
            status: 200,
            message: "success",
        }
    );
});

appRouter.use('/api/v1/', v1); //* Routing to v1 api module


/** Handled route not found exception */
appRouter.all('*', (req: Request, res: Response) => {
    res.status(404).send({ status: 404, message: `Method [${req.method}] Path : ${req.originalUrl} route not found.` });
})

export default appRouter;