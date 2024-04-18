import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { logOutSeller, registerSeller } from './sellerApi';
import { act } from 'react-dom/test-utils';

const initialState = {
    seller: null,
    isAuthenticated: false,
    token: null,
    isLoading: false,
    error: null
}

export const registerSellerAsync = createAsyncThunk(
    'seller/register',
    async (sellerData) => {
        try {
            const response = await registerSeller(sellerData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error('Registration failed');
            }
        }
    }
);

export const logoutSellerAsync = createAsyncThunk(
    'seller/logout',
    async () => {
        try {
          const response = await logOutSeller();
          localStorage.removeItem('token')
          console.log(response.data);
          return response.data; // Return the response from the server
        } catch (error) {
          throw new Error('Logout failed'); // Throw an error if logout fails
        }
      }
)

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
                console.log(state.seller);
                state.token = action.payload;
                // console.log(state.token);
                state.isAuthenticated = true
            })
            .addCase(registerSellerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
                console.log(state.error);
            })
            .addCase(logoutSellerAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.seller = null
            })
            .addCase(logoutSellerAsync.rejected, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);
                state.error = action.error.message
                console.log(state.error);
                
            })
    }
});

export default sellerSlice.reducer;