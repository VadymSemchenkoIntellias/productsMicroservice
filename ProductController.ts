import ProductService from "./ProductService";

// import { CreateUserRequest, LoginUserRequest, CreateOrLoginUserResponse, LogoutUserResponse, ErrorMessage, AuthorizedRequest, GetUserResponse, RefreshTokenRequest, RefreshTokenResponse } from './types';
import { Request, Response } from "express";
// import ResponseError, { ErrorCode } from "./error";

class ProductController {
    async findProducts(req: Request, res: Response) {
        try {
            console.log('QUERY', req.query);
            console.log('BODY', req.body);
            // const user = await ProductService.findProducts(req.body);
            res.status(200).json({});
        } catch (error: unknown) {
            console.log('ERROR AT FINDING PRODUCTS', error);
            // let status;
            // switch ((error as ResponseError).code) {
            //     case ErrorCode.EMAIL_ALREADY_REGISTERED:
            //         status = 409;
            //         break;
            //     case ErrorCode.INVALID_CREDENTIALS:
            //         status = 400;
            //         break;
            //     case ErrorCode.ALREADY_LOGGED_IN:
            //         status = 208;
            //         break;
            //     default:
            //         status = 500;
            //         break;
            // }
            // res.status(status).json({ code: (error as ResponseError).code });
        }
    }

}


export default new ProductController();
