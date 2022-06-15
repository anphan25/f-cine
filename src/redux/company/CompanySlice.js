import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  company: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyPending: (state) => {
      state.isLoading = true;
    },
    setCompany: (state, action) => {
      state.isLoading = false;
      state.company = action.payload;
    },
    removeCompany: (state) => {
      state.company = null;
    },
    companyError: (state) => {
      state.isLoading = false;
      state.error = "Can't get company";
    },
  },
});

export const { companyPending, setCompany, companyError, removeCompany } =
  companySlice.actions;

export default companySlice.reducer;
