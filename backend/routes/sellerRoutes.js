import express from 'express';
import { loginSeller, logoutSeller, registerSeller } from '../controllers/seller.js';
import { verifyJWT } from '../middleware/authentication.js';
import { createProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/product.js';

const sellerRoutes = express.Router();

sellerRoutes.post('/', registerSeller);
sellerRoutes.post('/login', loginSeller);
sellerRoutes.post('/logout', logoutSeller)

//Product 
sellerRoutes.post('/product', verifyJWT, createProduct);
sellerRoutes.get('/products',verifyJWT ,getAllProduct);
sellerRoutes.put('/product/:productId', verifyJWT, updateProduct);
sellerRoutes.delete('/product/:productId', verifyJWT, deleteProduct);


export default sellerRoutes;