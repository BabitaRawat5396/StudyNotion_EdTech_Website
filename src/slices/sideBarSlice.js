import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar:false,
  lectureSideBar:false,
}

const sideBarSlice = createSlice({
  name:"showSidebar",
  initialState:initialState,
  reducers:{
    setShowSideBar : (state,value) => {
      state.showSideBar = value.payload;
    },
    setLectureSideBar : (state,value) => {
      state.lectureSideBar = value.payload;
    }
  }
});

export const {setShowSideBar , setLectureSideBar} = sideBarSlice.actions;
export default sideBarSlice.reducer;