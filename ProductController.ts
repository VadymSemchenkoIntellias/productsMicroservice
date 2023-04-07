import ProductService from "./ProductService";

import { Request, Response } from "express";
import ResponseError, { ErrorResponseStatusMap } from './error'

class ProductController {
    async findProducts(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            console.log('PRODUCT CONTROLLER', page, limit, req.body);
            const result = await ProductService.findProducts({ ...req.body, page, limit });
            console.log('RESULT AT PRODUCT CONTROLLER AT PRODUCT MICROSERVICE', result);
            res.status(200).json(result);
        } catch (error: unknown) {
            const status = ErrorResponseStatusMap[(error as ResponseError).code] || 500;
            res.status(status).json({ code: (error as ResponseError).code });
        }
    }

}


export default new ProductController();
