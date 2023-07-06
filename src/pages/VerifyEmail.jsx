import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs'
import {FaHistory} from 'react-icons/fa'

const VerifyEmail = () => {
    const [otp,setOtp] = useState(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {signupData,loading} =  useSelector( (state) => state.auth);
    const {firstName, lastName, email, password, confirmPassword,accountType} = signupData;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(signUp(accountType,firstName,lastName,email, password, confirmPassword,otp,navigate))
    }

    return (
        <div className='flex flex-col justify-center items-center h-[90vh] text-white w-11/12'>
            {
                loading ? (
                    <div className="wrap">
                        <div className="loading">
                            <div className="bounceball"></div>
                            <div className="text">NOW LOADING</div>
                        </div>
                    </div>
                ) :
                (
                    <>
                        <div className='flex flex-col  text-white w-7/12 md:w-6/12 lg:w-2/6 text-start gap-2'>
                            <h1 className=' text-3xl text-richblack-5 py-1'>Verify email</h1>
                            <p className=' text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                            <form onSubmit={handleOnSubmit}>
                                <div className='h-3/5 w-full'>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                                        renderInput={(props) => <input {...props} className='bg-richblack-800 text-richblack-5 rounded-2xl outline-none focus:border-[2px] focus:border-yellow-100 h-12 min-w-[2.5rem] sm:min-w-[3.1rem] lg:min-w-[3.2rem]' />}
                                    />
                                    <button type='submit' className=' text-base text-richblack-900 bg-yellow-50 w-full h-10 my-7 rounded-xl font-semibold '>
                                        Verify email
                                    </button>
                                </div>
                            </form> 
                        </div>
                        <div className='flex justify-between w-7/12 md:w-6/12 lg:w-2/6'>
                            <div className='flex items-center gap-2 text-richblack-5 cursor-pointer'
                                onClick={() => {navigate("/login")}}
                                >
                                <BsArrowLeft/>
                                <p>Back to login</p>
                            </div>
                            <div className='flex items-center gap-2 text-blue-100 cursor-pointer'
                                onClick={() => {sendOtp(email)}}
                                >
                                <FaHistory/>
                                <p>Resend it</p>
                            </div>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default VerifyEmail