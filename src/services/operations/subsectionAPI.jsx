import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { setCourse } from "../../slices/courseSlice";

const {
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
} = courseEndpoints;

export function createSubsection(subsectionData,token){
  return async(dispatch) => {
    try {
      const response = await apiConnector("POST",CREATE_SUBSECTION_API,subsectionData,{
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      // console.log("CREATE_SUBSECTION_RESPONSE_API",response);
      // toast.success("Subsection created Successfully");
      dispatch(setCourse(response.data.updatedCourse));
    } catch (error) {
      console.log("CREATE_SUBSECTION_ERROR_API",error);
      toast.error("Unable to create Subsection");
    }
  }
}

export function updateSubsection(subsectionData,token){
  return async(dispatch) => {
    
    try {
      
      const response = await apiConnector("POST",UPDATE_SUBSECTION_API,subsectionData,{
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      // console.log("UPDATE_SUBSECTION_RESPONSE_API",response);
      // toast.success("Subsection update Successfully");
      dispatch(setCourse(response.data.updatedCourse));
    } catch (error) {
      console.log("UPDATE_SUBSECTION_ERROR_API",error);
      toast.error("Unable to update Subsection");
    }
  }
}

export function deleteSubsection(subsectionData,token){
  return async(dispatch) => {
    try {
      const response = await apiConnector("POST",DELETE_SUBSECTION_API,subsectionData,{
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      // console.log("DELETE_SUBSECTION_RESPONSE_API",response);
      // toast.success("Subsection delete Successfully");
      dispatch(setCourse(response.data.updatedCourse));
    } catch (error) {
      console.log("DELETE_SUBSECTION_ERROR_API",error);
      toast.error("Unable to delete Subsection");
    }
  }
}

