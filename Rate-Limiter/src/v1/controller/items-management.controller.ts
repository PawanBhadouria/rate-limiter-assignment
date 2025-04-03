import BaseController from "../../base/base.controller";
import APIException from "../../common/exceptions/api.exception";
import { Request, Response } from "express"


class ItemsManagementController extends BaseController {

    constructor() {
        super();
    }

    public async fetch(req: Request, res: Response): Promise<void> {
        try {
            const json = {
                itemsList: ["item1","item2","item3"]
            };
            this.httpOk(res, json)
        } catch (error: any) {
            console.log(error)
            const apiException = (typeof error.isHandled == 'undefined'  || error.isHandled === false) ? new APIException(error.message, error.stack) : error;
            this.httpError(res, apiException);
        }
    }

}

export default ItemsManagementController;