import express from "express"
import productController from "../controller/product.js";

const route = express.Router();
route.get('/products', productController.getProducts);
route.get('/products/:id', productController.getProductById);
route.post('/products', productController.addProduct);
route.put('/products/:id', productController.updateProductById);
route.delete('/products/:id', productController.deleteProductById)
route.delete('/products', productController.deleteAllProducts)

export default route;