import { useDispatch, useSelector } from "react-redux"
import {BsArrowLeft} from 'react-icons/bs'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { resetPassword } from "../services/operations/authAPI";
import { toast } from "react-hot-toast"


const ResetPassword = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {loading} = useSelector( (state) => state.auth);

  const [formData,setFormData] = useState({
    password:"",
    confirmPassword:""
  });

  const {password,confirmPassword} = formData;

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate))

  }

  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-11/12'>
    {
      loading ?
      (
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="text">NOW LOADING</div>
          </div>
        </div>
      ) :
      (
        <div className="flex flex-col text-start mx-auto w-2/6 ">
          <div className="flex flex-col gap-5">
            <div className='flex flex-col text-start gap-2'>
              <h1 className=' text-3xl text-richblack-5'>Choose  new password</h1>
              <p className=' text-md text-richblack-400'>Almost done. Enter your new password and you're all set.</p>
            </div>                  
            
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
              <div className="flex flex-col gap-4">
                <label>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  New password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter New Password"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                  </label>
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      Confirm new password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm Password"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                  </label>
                </div>
                <button type='submit' className=' text-base text-richblack-900 bg-yellow-50 w-full h-10 my-7 rounded-xl font-semibold '>
                  Reset Password
                </button>
            </form>
            
          </div>
          <div className='flex items-center gap-2 text-richblack-5 cursor-pointer'
            onClick={() => {navigate("/login")}}
          >
            <BsArrowLeft/>
            <p>Back to login</p>
          </div>
        </div>
          
      )
    }
    </div>
  )
}

export default ResetPassword