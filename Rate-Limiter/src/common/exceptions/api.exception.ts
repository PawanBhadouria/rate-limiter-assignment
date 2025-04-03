/**
* =======================================
*  API Exception
* ---------------------------------------
* @author : Pawan Bhadouria
* @desc : Exception class that represents an error that occurred during the execution of an API request.
* @param {string} message : Error message
* @param {string} stack : Error stack 
* @version : 1.0.0
*/

class APIException extends Error {

    status: number;
    body: object;
    isHandled: boolean

    constructor(message = '', stack = '') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.status = HTTP_CODE.INTERNAL_SERVER_ERROR
        this.message = message || HTTP_MESG.INTERNAL_SERVER_ERROR
        this.isHandled = true;
        this.body = {
            type: 'Operational Error',
            stack: (stack != '') ? `[Function] ${(stack.toString().split('\n    at')[0]).trim()} \n ${(stack.toString().split('\n    at')[1]).trim()}` : ''
        };
    }
}

export default APIException