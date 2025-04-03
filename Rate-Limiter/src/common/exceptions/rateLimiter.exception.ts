/**
* =======================================
*  Database Exception
* ---------------------------------------
* @author :Pawan Bhadouria
* @desc : Exception class that represents an error that occurred during a database operation.
* @param {string} message : Error message
* @param {string} stack : Error stack
* @version : 1.0.0
*/

class RateLimiterException extends Error {

    status: number;
    body: object;
    isHandled: boolean;

    constructor(message = '') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.TO_MANY_REQUEST;
        this.message = message || HTTP_MESG.TO_MANY_REQUEST;
        this.isHandled = true;
        this.body = {}
    }
}

export default RateLimiterException;