import { Router } from 'express';
import ProductController from './ProductController';

const router = Router();

router.post('/update', ProductController.updateOwner);

export { router };
