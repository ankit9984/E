import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { registerSeller } from './sellerApi';

const initialState = {
    seller: null,
    isLoading: false,
    error: null
}

export const registerSellerAsync = createAsyncThunk(
    'seller/register',
    async(sellerData) => {
        const response = await registerSeller(sellerData);
        console.log(response.data);
        return response.data;
    }
);

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerSellerAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerSellerAsync.fulfilled, (state, action) => {
                state.isLoading = false,
                state.seller = action.payload;
            })
            .addCase(registerSellerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            })
    }
});

export default sellerSlice.reducer;