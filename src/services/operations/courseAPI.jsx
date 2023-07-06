
import { setCourse, setLoading, setRenderPageNo } from '../../slices/courseSlice';
import {apiConnector} from '../apiConnector';
import {catalogData, courseEndpoints, profileEndpoints} from '../apis';
import {toast} from 'react-hot-toast';

const {
  GET_USER_ENROLLED_COURSES_API,
  DELETE_USER_ENROLLED_COURSES_API,
  UPDATE_USER_COURSE_PROGRESS_API,
} = profileEndpoints;

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  COURSE_CATEGORIES_API,
  COURSE_DETAILS_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
} = courseEndpoints;

const {CATALOGPAGEDATA_API} = catalogData;

export function createCourse(courseData,token){
  return async(dispatch) => {
    
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",CREATE_COURSE_API,courseData,{
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      // console.log("CREATE_COURSE_API_RESPONSE",response);
      // toast.success("Course Created Successfully");
      
      dispatch(setCourse(response.data.data));
      dispatch(setRenderPageNo(2));

    } catch (error) {
      console.log("CREATE_COURSE_API_ERROR",error);
      toast.error("Unable to Create Course");
    }
    dispatch(setLoading(false));
  }
}

export function updateCourse(courseData,token){
  return async(dispatch) => {
    
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",EDIT_COURSE_API,courseData,{
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      // console.log("UPDATE_COURSE_API_RESPONSE",response);
      // toast.success("Course updated Successfully");
      
      dispatch(setCourse(response.data.updatedCourse));
      dispatch(setRenderPageNo(2));

    } catch (error) {
      console.log("UPDATE_COURSE_API_ERROR",error);
      toast.error("Unable to update Course");
    }
    dispatch(setLoading(false));
  }
}

export function deleteCourse(courseId){
  return async(dispatch) => {
    dispatch(setLoading(true));
    try {
      
      const response = await apiConnector("DELETE",DELETE_COURSE_API,courseId);

      if(!response.data.success){
        throw new Error(response.data.message);
      }
      // toast.success("Course deleted Successfully");
    } catch (error) {
      console.log("DELETE_COURSE_API_ERROR",error);
      toast.error("Unable to delete Course");
    }
    dispatch(setLoading(false));
  }
}

export const fetchInstructorCourses = async(token) => {
  let result =[];
  setLoading(true);
  try {
    const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    // console.log("GET_INSTRUCTOR_COURSES_API_RESPONSE............", response);
    result = response.data.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_COURSES_API_ERROR............", error)
    toast.error(error.message)
  }
  setLoading(false);
  return result;
}

export function getCourseDetails(courseId){
  return async(dispatch) => {
    dispatch(setLoading(true));
    try {
      
      const response = await apiConnector("POST",COURSE_DETAILS_API,courseId);

      if(!response.data.success){
        throw new Error(response.data.message);
      }
      dispatch(setCourse(response.data.data));
      // console.log("Full_COURSE_DETAILS_API_RESPONSE",response);
      // toast.success("Full Course Details fetched Successfully");
    } catch (error) {
      console.log("Full_COURSE_DETAILS_API_ERROR",error);
      toast.error("Unable to Fetch full Course details");
    }
    dispatch(setLoading(false));

  }
}

export const getFullCourseDetails = async(courseId,token) => {
  let result;
  try {
    const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId:courseId},{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message)
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED_ERROR_API",error);
    toast.error("Unable to fetched Full course");
  }
  return result;
}

export const fetchCategories = async() => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.allCategory
  } catch (error) {
    console.log("COURSE_CATEGORY_API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

export const fetchCategoryPageDetails = async(categoryId,dispatch) => {
  
  let selectedCategory;
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST",CATALOGPAGEDATA_API,categoryId);

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    console.log("FETCH_CATEGORY_PAGE_DETAILS_API_RESPONSE",response);
    selectedCategory = response.data.data;
  } catch (error) {
    console.log("FETCH_CATEGORY_PAGE_DETAILS_API_ERROR",error);
  }
  dispatch(setLoading(false));

  return selectedCategory;
}

export const fetchEnrolledCourses = async(token,dispatch) => {
  let result;
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
        Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
      console.log("GET_ENROLLED_COURSES_ERROR_API",error);
      toast.error("Couldn't fetch enrolled courses");
  }
  dispatch(setLoading(false));

  return result;
}

export function deleteEnrolledCourses(courseId,token){
  return async() => {
    try {
      const response = await apiConnector("DELETE",DELETE_USER_ENROLLED_COURSES_API,courseId,{
        Authorization:`Bearer ${token}`
      })
  
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      // toast.success("Course Removed Successfully")
    } catch (error) {
      console.log("DELETE_ENROLLED_COURSES_API_ERROR",error);
      toast.error("Enable to remove course");
    }
  }
  
}

export function updateCourseProgress(data,token){
  return async() => {
    try {
      const response = await apiConnector("PUT",UPDATE_USER_COURSE_PROGRESS_API,data,{
        Authorization:`Bearer ${token}`
      })
  
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      
    } catch (error) {
      console.log("UPDATE_USER_COURSE_PROGRESS_API_ERROR",error);
      toast.error("Enable to update course progress");
    }
  }
}

