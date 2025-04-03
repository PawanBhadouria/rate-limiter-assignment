/**
* =======================================
*  Session Exception
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : Exception class that represents an error that occurred during a session operation.
* @param {string} message : Error message
* @version : 1.0.0
*/

class SessionException extends Error {

    status: number;
    body: object;
    isHandled: boolean;

    constructor(message: string = '') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.SESSION_EXPIRED;
        this.message = message || HTTP_MESG.SESSION_EXPIRED;
        this.isHandled = true;
        this.body = {}
    }
}

export default SessionException;