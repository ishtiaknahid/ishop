import { createSlice } from "@reduxjs/toolkit"
const initialState = JSON.parse(localStorage.getItem('vendorMode')) || false; 

const vendorModeSlice = createSlice({
    name: 'vendorMode', 
    initialState,
    reducers: {
        setVendorMode(state) {
           localStorage.setItem("vendorMode", `${!state}`)
           return !state
        }, 
    }
})

export const {setVendorMode} = vendorModeSlice.actions; 

export default vendorModeSlice.reducer; 
