import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categories: [
        {
            type: String,
            trim: true
        }
    ],
    images: [
        {
            type: String,
            trim: true,
        }
    ],
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex'],
        required: true
    },
    material: {
        type: String,
        required: true,
        trim: true
    },
    style: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                trim: true
            }
        }
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
