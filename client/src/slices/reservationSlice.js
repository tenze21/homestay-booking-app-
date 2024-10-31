import { createSlice } from "@reduxjs/toolkit";
const initialState= localStorage.getItem("reservationInfo")? JSON.parse(localStorage.getItem("reservationInfo")) : {details:{}, paymentMethod:'paypal'};

const reservationSlice= createSlice({
    name: 'reservationInfo',
    initialState,
    reducers: {
        saveDetails: (state, action)=>{
            state.details= action.payload;
            return localStorage.setItem("reservationInfo", JSON.stringify(state));
        },
        savePaymentMethod: (state, action)=>{
            state.paymentMethod= action.payload;
            return localStorage.setItem("reservationInfo", JSON.stringify(state));
        },
    }
});
export const {saveDetails, savePaymentMethod}= reservationSlice.actions;
export default reservationSlice.reducer;