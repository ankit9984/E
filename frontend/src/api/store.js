import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "./sellerSlice.js";

const store = configureStore({
    reducer: {
        seller: sellerReducer
    }
});

export default store;