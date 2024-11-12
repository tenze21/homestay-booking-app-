import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import propertyListingSliceReducer from "./slices/propertyListingSlice";
import reservationSliceReducer from "./slices/reservationSlice";
import navigationReducer from "./slices/navigationSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    propertyInfo: propertyListingSliceReducer,
    reservationInfo: reservationSliceReducer,
    navigationState: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
