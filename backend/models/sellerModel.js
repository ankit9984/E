import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    sellerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellerUser'
    }
});

sellerSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    };
    try {
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
        next();
    } catch (error) {
        return next(error)
    }
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;

