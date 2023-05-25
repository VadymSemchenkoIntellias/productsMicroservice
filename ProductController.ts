import ProductService from "./ProductService";

import { Request, Response } from "express";
import ResponseError, { ErrorResponseStatusMap } from './error'

class ProductController {
    async findProducts(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            const result = await ProductService.findProducts({ ...req.body, page, limit });
            res.status(200).json(result);
        } catch (error: unknown) {
            const status = ErrorResponseStatusMap[(error as ResponseError).code] || 500;
            res.status(status).json({ code: (error as ResponseError).code });
        }
    }

    async updateOwner(req: Request, res: Response) {
        try {
            // const { id, name, email } = req.body;
            const result = await ProductService.updateOwner({ ...req.body.data, id: req.body.data._id });
            res.status(200).json(result);
        } catch (error: unknown) {
            const status = ErrorResponseStatusMap[(error as ResponseError).code] || 500;
            res.status(status).json({ code: (error as ResponseError).code });
        }
    }

}


export default new ProductController();
