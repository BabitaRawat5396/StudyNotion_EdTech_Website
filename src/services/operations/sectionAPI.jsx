
import { setCourse } from '../../slices/courseSlice';
import {apiConnector} from '../apiConnector';
import {courseEndpoints} from '../apis';
import {toast} from 'react-hot-toast';

const {
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
} = courseEndpoints;

export function createSection(data,token){
  return async(dispatch) => {
    try {
      
      const response = await apiConnector("POST",CREATE_SECTION_API,data,{
        Authorization:`Bearer ${token}`
      })

      if(!response.data.success){
        throw new Error(response.data.message);
      }
      dispatch(setCourse(response.data.course));
      
      // console.log("CREATE_SECTION_API_RESPONSE",response);
      // toast.success("Section Created Successfully");
    } catch (error) {
      console.log("CREATE_SECTION_API_ERROR",error);
      toast.error("Unable to Create Section");
    }
  }
}

export function deleteSection(data,token){
  return async(dispatch) => {
    try{
      const response = await apiConnector("POST",DELETE_SECTION_API,data,{
        Authorization:`Bearer ${token}`
      })
    
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      dispatch(setCourse(response.data.updatedCourse));
      
      // console.log("DELETE_SECTION_API_RESPONSE",response);
      // toast.success("Section Deleted Successfully");
    } catch (error) {
      console.log("DELETE_SECTION_API_ERROR",error);
      toast.error("Unable to delete Section");
    }
  }
}

export function updateSection(data,token){
  return async(dispatch) => {
    try{
      const response = await apiConnector("POST",UPDATE_SECTION_API,data,{
        Authorization:`Bearer ${token}`
      })
    
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      dispatch(setCourse(response.data.updatedCourse));
      
      // console.log("UPDATE_SECTION_API_RESPONSE",response);
      // toast.success("Section updated Successfully");
    } catch (error) {
      console.log("Update_SECTION_API_ERROR",error);
      toast.error("Unable to unable Section");
    }
  }
}