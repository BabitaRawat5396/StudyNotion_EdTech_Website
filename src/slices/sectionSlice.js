import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  section:localStorage.getItem("section") ? JSON.parse(localStorage.getItem("section")) : null,
}

const sectionSlice = createSlice({
  name:"section",
  initialState:initialState,
  reducers:{
    setSection(state,value){
      state.section = value.payload;
    }
  }
})

export const {setSection} = sectionSlice.actions;

export default sectionSlice.reducer;