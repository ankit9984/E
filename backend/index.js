import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import sellerRoutes from './routes/sellerRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hey')
});

app.use('/api/seller', sellerRoutes)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})