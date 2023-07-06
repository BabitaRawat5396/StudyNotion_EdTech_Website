import { useState } from "react";
import { useForm } from "react-hook-form"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../../services/operations/settingsAPI";

const UpdatePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector( (state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState:{errors},

  } = useForm();

  const submitPasswordForm = (data) => {
    setLoading(true);
    dispatch(updatePassword(data,token)).then( () => {setLoading(false)});
  }
  
  
  return (
    <form
      onSubmit={handleSubmit(submitPasswordForm)}
      className='flex flex-col text-sm gap-7 border border-richblack-700 w-9/12 rounded-lg bg-richblack-800 justify-between p-8 text-richblack-50'
    >
      <div className="my-4 flex flex-col gap-y-6 rounded-md bg-richblack-800">
        <h1 className="text-lg font-semibold text-richblack-5">Password</h1>
        <div className="flex gap-5">
          <div className=" relative flex flex-col w-1/2 gap-2">
            <label htmlFor="currentPassword" className="lable-style">Current Password</label>  
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter Current Password"
              {...register("currentPassword", { required: true })}
              className="form-style"
            />
            {
              errors.currentPassword && 
              ( 
                <span className="-mt-1 text-[12px] text-yellow-100"> {errors.currentPassword.message} </span> 
              )
            }
            <div
              onClick={() => {setShowCurrentPassword( prev => !prev)}}
              className="absolute top-11 right-3 text-xl cursor-pointer"
            >
            {
              showCurrentPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
            }
            </div>
          </div>
          <div className=" relative flex flex-col w-1/2 gap-2">
            <label htmlFor="newPassword" className="lable-style">Change Password </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              {...register("newPassword", { required: true })}
              className="form-style"
            />
            {
              errors.newPassword && 
              ( 
                <span className="-mt-1 text-[12px] text-yellow-100">{errors.newPassword.message} </span> 
              )
            }
            <div
              onClick={() => {setShowNewPassword( prev => !prev)}}
              className=" absolute top-11 right-3 text-xl cursor-pointer"
            >
            {
              showNewPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
            }
            </div> 
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text={loading ? "Updating..." : "Update"}/>
      </div>   
    </form>
  )
}

export default UpdatePassword