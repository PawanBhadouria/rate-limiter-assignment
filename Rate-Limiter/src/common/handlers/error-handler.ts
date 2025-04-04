import { Response } from "express";
import APIException from "../exceptions/api.exception";
import { ErrorResponseType } from "../types";
import RateLimiterException from "../exceptions/rateLimiter.exception";

/** Added type for Handled Error or Exception */
type HandledError = APIException | RateLimiterException;

/**
* =======================================
*  Error Handler
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : A utility class for handling errors in an application.
* @static
* @version : 1.0.0
*/
class ErrorHandler {

    constructor() { }

    /**
    * @author : Pawan Bhadouria
    * @desc : Handling errors in an application and send back to client.
    * @static
    * @param {object} res : Express response object
    * @param {object} capturedError : Error object of class (UnauthorizedException, RequestValidationException, SessionException, RouteNotFoundException, DatabaseException, APIException)
    * @return {void}
    */
    public static handle(res: Response, capturedError: HandledError): void {
        try {

            let errorResponse: ErrorResponseType = {
                status: capturedError?.status || HTTP_CODE.INTERNAL_SERVER_ERROR,
                message: capturedError?.message || HTTP_MESG.INTERNAL_SERVER_ERROR,
                error: capturedError?.body || {}
            };


            /** Can handle different Error handling logic depending the thrown exception */
             if (capturedError instanceof RateLimiterException) {
                console.error(`Instance of RateLimiterExceptionException : ${errorResponse.message}`);
            } else if (capturedError instanceof APIException) {
                console.error(`Instance of APIException : ${errorResponse.message}`);
            } else {
                console.warn(`This error was not handled :Instance of Error : ${errorResponse.message}`);
            }

            res.body = errorResponse;
            res.status(errorResponse.status).header(HTTP_HEADER.CONTENT_TYPE, HTTP_HEADER.JSON).send(res.body);

        } catch (error: any) {
            const exception = new APIException('', error.stack);
            res.body = { status: HTTP_CODE.INTERNAL_SERVER_ERROR, message: HTTP_MESG.INTERNAL_SERVER_ERROR, error: exception.body }
            res.status(exception.status).header(HTTP_HEADER.CONTENT_TYPE, HTTP_HEADER.JSON).send(res.body);
        }
    }
}

export default ErrorHandler;
