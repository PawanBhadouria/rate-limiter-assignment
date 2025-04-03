import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import JWT from "jsonwebtoken";
import ErrorHandler from "../handlers/error-handler";
import APIException from "../exceptions/api.exception";
import SessionException from "../exceptions/session.exception";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import CONFIGURATION from "../config";


class TokenMiddleware {

    private verifyAppTokenFunction: any;
    private createTokenFunction: any
    constructor() {
        this.init();
    }

    private init() {

        this.verifyAppTokenFunction = async (req: Request, res: Response, next: NextFunction) => {
            try {

                if (typeof req.headers.authorization == 'undefined') throw new UnauthorizedException();
                const token = req.headers.authorization.split(' ')[1];
                const publicAbsolutePath = path.join(CONFIGURATION.APP_PUBLIC_KEY_PATH);
                const publicKey = fs.readFileSync(publicAbsolutePath, 'utf-8');
                const verifiedToken = JWT.verify(token, publicKey, { algorithms: ['RS256'] });
                req.userInfo = verifiedToken;
                
                next();
            } catch (error: any) {
                if (error.message == 'jwt expired') {
                    error = new SessionException(error.message);
                } else if (typeof error.isHandled == 'undefined' || error.isHandled == false) {
                    error = new APIException('', error.stack);
                }
                ErrorHandler.handle(res, error);
            }
        }

        this.createTokenFunction = async (req: Request, res: Response) => {
            try {
                const payload = req.body
                const absolutePath = path.resolve(CONFIGURATION.APP_PRIVATE_KEY_PATH);
                const privateKey = fs.readFileSync(absolutePath, 'utf-8');
                const token = JWT.sign(payload, {
                    key: privateKey,
                    passphrase: CONFIGURATION.PASSPHRASE
                }, {
                    expiresIn: CONFIGURATION.TOKEN_EXPIRY,
                    algorithm: 'RS256'
                });
                res.status(HTTP_CODE.OK).send({token:`Bearer ${token}`})
                
                
            } catch (error: any) {
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled == false) ? new APIException(error.message, error.stack) : error;
                return Promise.reject(apiException);
            }
        }
    }
 

    get verifyAppTokenMiddleware(): any {
        return this.verifyAppTokenFunction
    }

    get createToken(): any {
        return this.createTokenFunction
    }
}

export default TokenMiddleware;