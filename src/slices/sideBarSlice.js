import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar:false,
}

const sideBarSlice = createSlice({
  name:"showSidebar",
  initialState:initialState,
  reducers:{
    setShowSideBar : (state,value) => {
      state.showSideBar = value.payload;
    }
  }
});

export const {setShowSideBar} = sideBarSlice.actions;
export default sideBarSlice.reducer;