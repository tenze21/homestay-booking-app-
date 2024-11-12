import { createSlice } from "@reduxjs/toolkit";
const initialState=0;
const navigationSlice= createSlice({
    name: 'navigation',
    initialState,
    reducers:{
        setNavigation: (state, action)=>{
            return state=action.payload
        }
    }
});
export const {setNavigation}=navigationSlice.actions;
export default navigationSlice.reducer;