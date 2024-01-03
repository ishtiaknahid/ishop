import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice';
import vendorModeSlice from './vendorModeSlice';
import vendorDetailsSlice from './vendorDetailsSlice';
import { apiSlice } from './apiSlice';
// import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice, 
        vendorMode: vendorModeSlice, 
        vendorDetails:vendorDetailsSlice, 
        [apiSlice.reducerPath]: apiSlice.reducer 
    }, 
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
    devTools: true
}); 
