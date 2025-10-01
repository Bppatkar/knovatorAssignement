import express from 'express';
import { getProducts, getFilters } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/filters', getFilters);

export default router;