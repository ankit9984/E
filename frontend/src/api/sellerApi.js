import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/seller';

const sellerApi = axios.create({
    baseURL: BASE_URL
});

const registerSeller = async (sellerData) => {
    return await sellerApi.post('/', sellerData)
};

const logOutSeller = async () => {
    return await sellerApi.post('/logout')
};

export {
    registerSeller,
    logOutSeller
}