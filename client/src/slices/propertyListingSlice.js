import {createSlice} from '@reduxjs/toolkit';
const initialState= localStorage.getItem("propertyInfo")? JSON.parse(localStorage.getItem("propertyInfo")) : {serviceName: '', propertyLocation: {}, facilities: [], rules: [], accomodation: '', timing: {}, description:'', hostDetails: {}, rate: ''};

const propertyListingSlice= createSlice({
    name: 'propertyInfo',
    initialState,
    reducers: {
        saveServiceName: (state, action)=>{
            state.serviceName= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        savePropertyLocation: (state, action)=>{
            state.propertyLocation= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveFacilities: (state, action)=>{
            state.facilities= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveRules: (state, action)=>{
            state.rules= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveAccomodation: (state, action)=>{
            state.accomodation= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveTiming: (state, action)=>{
            state.timing= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveDescription: (state, action)=>{
            state.description= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveRate: (state, action)=>{
            state.rate= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        },
        saveHostDetails: (state, action)=>{
            state.hostDetails= action.payload;
            return localStorage.setItem("propertyInfo", JSON.stringify(state));
        }
    }
});

export const {saveServiceName, savePropertyLocation, saveFacilities, saveRules, saveAccomodation, saveTiming, saveDescription, saveRate, saveHostDetails}= propertyListingSlice.actions;
export default propertyListingSlice.reducer;