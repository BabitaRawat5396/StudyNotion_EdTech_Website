import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useNavigate } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [email,setEmail] = useState('');
    const [sentEmail,setSentEmail] = useState(false);

    const {loading} = useSelector( (state) => state.auth);


    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setSentEmail))
    }

    const handleOnChange = (event) => {
        setEmail(event.target.value);
    }
    return (
        <div className="flex flex-col justify-center items-center h-[90vh] w-11/12">
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
                    <div className={`flex flex-col w-2/6 text-start ${sentEmail ? "gap-2" : "gap-8"}`}>
                        <div className="flex flex-col gap-3">
                            <h1 className=' text-3xl text-richblack-25'>
                                {
                                    !sentEmail ? "Reset your password" : "Check email"
                                }
                            </h1>
                            <p className=' text-base text-richblack-400'>
                                {
                                    !sentEmail ? "Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                    : `We have sent the reset email to ${email}`
                                }
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleOnSubmit} className="flex flex-col gap-3">
                            {
                                !sentEmail &&
                                <label className="w-full">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 px-1">
                                    Email Address <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={handleOnChange}
                                        placeholder="Enter email address"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    />
                                    </label>
                                    
                            }
                            <button type="submit" className=' text-base text-richblack-900 bg-yellow-50 w-full h-10 my-7 rounded-xl font-semibold '>
                                {
                                    !sentEmail ? "Reset Password" : "Resend email"
                                }
                            </button>
                        </form>
                        <div className='flex items-center gap-2 text-richblack-5 cursor-pointer'
                            onClick={() => {navigate("/login")}}
                        >
                            <BsArrowLeft/>
                            <p>Back to login</p>
                        </div>
                        </div>
                    </div>
                )
            }
        </div>
        
    )
}

export default ForgotPassword