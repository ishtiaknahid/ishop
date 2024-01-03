import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const vendorDetailsSlice = createSlice({
  name: "vendorDetails",
  initialState,
  reducers: {
    setVendorDetails(state, action) {
      let vendor = { ...state, ...action.payload };
      return vendor;
    },
  },
});

export const { setVendorDetails } = vendorDetailsSlice.actions;

export default vendorDetailsSlice.reducer;
