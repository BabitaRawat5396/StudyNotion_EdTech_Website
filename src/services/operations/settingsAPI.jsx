import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function updateProfilePicture(formData,token) {
    return async(dispatch) => {
        try {
            const response = await apiConnector("PUT", 
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            ); 
            // console.log("UPDATE_PROFILE_PICTURE SUCCESS RESPONSE",response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser(response.data.data));
            // toast.success("Profile Updated Succesfully");
        } catch (error) {
            console.log("UPDATE_PROFILE_PICTURE ERROR",error);
            toast.error(`${error.response.data.message}`)
        }
    }
}

export function updateProfileInfo(token,data,user){
    return async(dispatch) => {        
        try {
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,
                data,
                {
                    Authorization:`Bearer ${token}`
                }
            )
            
            // console.log("UPDATE_PROFILE_API_RESPONSE",response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            // Updated the additionalDetails part only with previous other values using ...user
            dispatch(setUser({ ...user,additionalDetails: response.data.updatedProfile}));
            console.log("Additional Details:",user.additionalDetails.gender)
            // toast.success("Profile Updated Successfully")

        } catch (error) {
            console.log("UPDATE_PROFILE_API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
    }
}

export function updatePassword(data,token){
    return async() => {
        try {
            const response = await apiConnector("POST",CHANGE_PASSWORD_API,data,{
                Authorization:`Bearer ${token}`
            })

            // console.log("UPDATE_PASSWORD_API",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // toast.success("Password Updated Successfully")
        } catch (error) {
            console.log("UPDATE_PASSWORD_API ERROR............", error)
            toast.error("Unable to Update Password")
        }
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch) => {
        try {
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization:`Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // console.log("DELETE_ACCOUNT_API_RESPONSE",response);
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/signup");
        } catch (error) {
            console.log("DELETE_ACCOUNT_API ERROR............", error)
            toast.error("Unable to Delete Account")
        }
    }
}