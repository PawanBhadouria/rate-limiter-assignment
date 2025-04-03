/**
* =======================================
*  Unauthorized Exception
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : Exception class that represents an error that occurred when a user is not authorized to access a resource or perform an action.
* @param {string} message : Error message
* @version : 1.0.0
*/

class UnauthorizedException extends Error {

    status: number;
    body: object;
    isHandled: boolean;

    constructor(message = '') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.UNAUTHORIZED;
        this.message = message || HTTP_MESG.UNAUTHORIZED;
        this.isHandled = true;
        this.body = {}
    }
}

export default UnauthorizedException;