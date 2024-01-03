import { createSlice } from "@reduxjs/toolkit"
const initialState = JSON.parse(localStorage.getItem('cart')) || []; 

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        }, 
        increaseUnit(state, action){
            const index = state.findIndex(obj => obj.id === action.payload)
            state[index].unit =  state[index].unit + 1;
        },
        decreaseUnit(state, action){
            const index = state.findIndex(obj => obj.id === action.payload)
            state[index].unit =  state[index].unit - 1 ;
        },
        deleteFromCart(state, action){
            return state.filter(item => item.id != action.payload); 
        },
        deleteAllProduct(){
            return []
        }
    }
})

export const {addToCart, deleteFromCart, increaseUnit, decreaseUnit, deleteAllProduct} = cartSlice.actions; 

export default cartSlice.reducer; 
