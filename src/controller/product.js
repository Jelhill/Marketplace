import Product from "../model/Product.js";

class ProductController {
    constructor() {}

    async getProducts(req, res) {
        try {
            const filters = req.query;
            const query = {}; 
    
            for (const key in filters) {
                if (key === 'name') {
                    query.name = { $regex: new RegExp(filters.name, 'i') };
                }
            }
    
            const products = await Product.find(query);
    
            if (!products.length) {
                return res.status(404).json({
                    message: "No Products Found"
                });
            }
    
            return res
                .status(200)
                .json({
                    success: true,
                    data: products,
                    message: "Products retrieved successfully"
                });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (product) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        data: product,
                        message: "Product retrieve successfully"
                    });
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async addProduct(req, res) {
        try {
            const products = await Product.findOne({name: req.body.name});
            if(products) {
                return res.json({
                    message: "Product Already exist. "
                })
            }

            const newProduct = new Product(req.body);
            await newProduct.save();
            
            res.status(201)
            .json({
                success: true,
                data: newProduct,
                message: "Products Created Successfully"
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateProductById(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedProduct) {
                res.status(200).json({
                    success: true,
                    data: updatedProduct,
                    message: "Products Updated Successfully"
                })
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteProductById(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (deletedProduct) {
                res.json({ message: 'Product deleted' });
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteAllProducts(req, res) {
        try {
            const deletedProducts = await Product.deleteMany({});
    
            if (deletedProducts.deletedCount > 0) {
                res.json({ message: 'All products deleted' });
            } else {
                res.status(404).send('No products found to delete');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

const productController = new ProductController();

export default productController