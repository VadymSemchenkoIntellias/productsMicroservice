import ProductService from "./ProductService";

import { Request, Response } from "express";
import ResponseError, { ErrorResponseStatusMap } from './error'

class ProductController {
    async findProducts(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            const { authorization } = req.headers;
            if (!authorization) {
                res.status(403).json({ message: 'No authorization header provided' });
            }
            const [_, accessToken] = (authorization as string).split(' ');
            const result = await ProductService.findProducts({ ...req.body, page, limit, accessToken });
            res.status(200).json(result);
        } catch (error: unknown) {
            const status = ErrorResponseStatusMap[(error as ResponseError).code] || 500;
            res.status(status).json({ code: (error as ResponseError).code });
        }
    }

}


export default new ProductController();
