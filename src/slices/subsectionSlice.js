import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subsection:localStorage.getItem("subsection") ? JSON.stringify(localStorage.getItem("subsection")) : null,
}

const subsectionSlice = createSlice({
  name:"subsection",
  initialState:initialState,
  reducers:{
    setSubsection(state,value){
      state.subsection = value.payload;
    }
  }
})

export const {setSubsection} = subsectionSlice.actions;

export default subsectionSlice.reducer;