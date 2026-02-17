import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice";
import contactReducer from "./slices/contactSlice";
import careersReducer from "./slices/careersSlice";
export const store = configureStore({
  reducer: {
    services: servicesReducer,
    contact: contactReducer,
     careers: careersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;