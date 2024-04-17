import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';

const createProduct = async (req, res) => {
    try {
        const { productName, description, price, categories, images, size, color, brand, gender, material, style, quantity } = req.body;
        const sellerID = req.seller;

        // Validate required fields
        if (!productName || !description || !price || !size || !color || !brand || !gender || !material || !style || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate price and quantity as numbers
        if (isNaN(price) || isNaN(quantity)) {
            return res.status(400).json({ error: 'Price and quantity must be numbers' });
        }

        // Create the new product
        const newProduct = new Product({
            productName,
            description,
            price,
            categories,
            images,
            size,
            color,
            brand,
            gender,
            material,
            style,
            quantity,
            seller: sellerID
        });

        await newProduct.save();

        // Update the seller's products array with the new product's objectID
        await Seller.findByIdAndUpdate(
            sellerID,
            { $push: { products: newProduct._id } },
            { new: true }
        );

        res.status(200).json({ message: 'Product created successfully', newProduct });
    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllProduct = async (req, res) => {
    try {
        // Retrieve the seller ID from the request
        const sellerID = req.seller;

        // Fetch products associated with the seller
        const products = await Product.find({ seller: sellerID });

        res.status(200).json({ products });
    } catch (error) {
        console.log('Error fetching products', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateProduct = async (req, res) => {
    try {
        // const productId = req.params.productId;
        const {productId} = req.params;

        const { productName, description, price, categories, images, size, color, brand, gender, material, style, quantity } = req.body;

        // Validate if the product ID is provided
        if(!productId){
            return res.status(400).json({error: 'Product ID is required'});
        }

        const sellerID = req.seller;

        // Find the product 
        const product = await Product.findOne({_id: productId, seller: sellerID});

        // const product = await Product.findById(productId)

        // check if the product exists
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }

         // Update the product fields
         if (productName) product.productName = productName;
         if (description) product.description = description;
         if (price) product.price = price;
         if (categories) product.categories = categories;
         if (images) product.images = images;
         if (size) product.size = size;
         if (color) product.color = color;
         if (brand) product.brand = brand;
         if (gender) product.gender = gender;
         if (material) product.material = material;
         if (style) product.style = style;
         if (quantity) product.quantity = quantity;

         // Save the updated product
         await product.save();

         res.status(200).json({message: 'Product updated successfully', product})
    } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const sellerID = req.seller;

        if(!productId){
            return res.status(404).json({error: 'Product ID is required'});
        }

        const product = await Product.findOne({_id: productId, seller: sellerID});

        if(!product){
            return res.status(404).json({error: 'Product not found or does not belogn to this admin'})
        };

        // Delete the product
        await Product.deleteOne({_id: productId});

        res.status(200).json({message: 'Product deleted successfully'})

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

export {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};
