import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/auth/AuthSlice";
import companyReducer from "redux/company/CompanySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});
