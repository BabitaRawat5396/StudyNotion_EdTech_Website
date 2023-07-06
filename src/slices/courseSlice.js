import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  renderPageNo:1,
  loading:false,
  course:null,
  editCourse:false,
};

const courseSlice = createSlice({
  name:"course",
  initialState:initialState,
  reducers:{
    setCourse(state,value){
      state.course = value.payload;
    },
    setRenderPageNo(state,value){
      state.renderPageNo = value.payload;
    },
    setLoading(state,value){
      state.loading = value.payload;
    },
    setEditCourse(state,value){
      state.editCourse = value.payload;
    },
    resetCourseState: (state) => {
      state.renderPageNo = 1
      state.course = null
      state.loading = false
      state.editCourse = false
    },
  }
});

export const { setCourse, setRenderPageNo, setLoading, setEditCourse,resetCourseState } = courseSlice.actions;

export default courseSlice.reducer;
