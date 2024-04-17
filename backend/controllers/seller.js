import { generateJWT } from "../middleware/authentication.js";
import Seller from "../models/sellerModel.js";
import bcrypt from 'bcryptjs';

const registerSeller = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    
    const isSeller = await Seller.findOne({email});

    if(isSeller){
        return res.status(400).json({error: 'Email is already exists'})
    };

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({Error: 'All fields are requied'})
    }

    const newSeller = new Seller({
        firstName,
        lastName,
        email,
        password
    });

    await newSeller.save();

    //generate JWT token for the new seller
    const token = generateJWT({sellerID: newSeller._id});

    //Set the token in a cookie
    res.cookie('token', token, {httpOnly: true});
    

    res.status(201).json({message: 'Register successfully', newSeller, token})
};

const loginSeller = async (req, res) => {
    try {
        const {email, password} = req.body;
    
        const existingSeller = await Seller.findOne({email});
    
        if(!existingSeller){
            return res.status(400).json({error: 'Email or password are not matching'})
        };
    
        const isPasswordValid = await bcrypt.compare(password, existingSeller.password);
    
        if(!isPasswordValid){
            return res.status(400).json({error: 'Invalid email or password'})
        };
    
        const token = generateJWT({sellerID: existingSeller._id})
        res.cookie('token', token, {httpOnly: true});
    
        res.status(200).json({message: 'Login successfully', existingSeller});
    } catch (error) {
        console.log('Error logging in seller', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const logoutSeller = (req, res) => {
    res.cookie('token', '', { httpOnly: true, maxAge: 0 });
    
    res.status(200).json({ message: 'Logout successful' });

}

export {
    registerSeller,
    loginSeller,
    logoutSeller
}