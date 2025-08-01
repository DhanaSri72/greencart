import express from 'express'
import authSeller from '../middlewares/authSeller.js';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.post('/add',upload.array('Images'),authSeller,addProduct);
productRouter.get('/list',productList)
productRouter.get('/id', productById)
productRouter.post('/stock',authSeller,changeStock)

export default productRouter;