import { useEffect } from 'react'
import {useForm} from "react-hook-form"
import CountryCode from '../../../data/countrycode.json'
import { apiConnector } from '../../../services/apiConnector';
import { contactusEndpoint } from '../../../services/apis';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const {CONTACT_US_API} = contactusEndpoint;


const ContactUsForm = () => {

    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);

    const submitContactForm = async(data) => {
        console.log("FOrm Called",data)
        const formData = new FormData();

        formData.append("token",token);
        formData.append("firstName",data.firstname);
        formData.append("lastName",data.lastname);
        formData.append("email",data.email);
        formData.append("countryCode",data.countrycode);
        formData.append("phoneNumber",data.phoneNo);
        formData.append("message",data.message);
        setLoading(true);
        try {
            const response = await apiConnector("POST",CONTACT_US_API,formData,{
                Authorization:`Bearer ${token}`
            })
    
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Message sent successfully");
        } catch (error) {
            console.log("CONTACT_US_API_ERROR",error);
            toast.error("Could Not send Message");
        }
        setLoading(false);
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className=' flex flex-col w-10/12 mx-auto py-10 gap-5'>

            {/* FirstName LastName */}
            <div className="flex gap-4 w-full">
                <label htmlFor='firstname' className='w-1/2'>
                    <p className='label-style text-start px-4 py-1 text-sm'>First Name</p>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='form-style bg-richblack-800 w-full'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span className='text-pink-600 flex px-4 items-center py-2'>
                                ⚠ Please enter First Name
                            </span>
                        )
                    }
                </label>

                <label htmlFor='lastname' className='w-1/2'>
                    <p className='label-style text-start px-4 py-1 text-sm'>Last Name</p>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter Last name'
                        className='form-style bg-richblack-800 w-full'
                        {...register("lastname", {required:true})}
                    />
                    {
                        errors.lastname && (
                            <span className='text-pink-600 flex px-4 items-center py-2'>
                            ⚠ Please enter Your lastname
                            </span>
                        )
                    }
                </label>
            </div>
            
            {/* Email  */}
            <label htmlFor='email'>
                <p className='label-style text-start px-4 py-1 text-sm'>Email Address</p>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    className='form-style w-full bg-richblack-800'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span className='text-pink-600 flex px-4 items-center py-2'>
                        ⚠ Please enter your email address
                        </span>
                    )
                }
            </label>

            {/* PhoneNo */}
            <label htmlFor='phonenumber'>
                <p className='label-style text-start px-4 py-1 text-sm'>Phone Number</p>
                <div className='flex flex-row gap-5'>
                    {/* dropdown */}   
                    <select
                            name='dropdown'
                            id="dropdown"
                            className='form-style w-1/5 bg-richblack-800'
                            {...register("countrycode", {required:true})}
                        >
                        {
                            CountryCode.map( (element , index) => {
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} -{element.country}
                                    </option>
                                )
                            } )
                        }
                    </select>
                            
                    <input
                        type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        className='form-style w-4/5 bg-richblack-800'
                        {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} 
                            })
                        }
                    />
                </div>
                {
                    errors.phoneNo && (
                        <span className='text-pink-600 flex px-4 items-center py-2'>
                        ⚠ {errors.phoneNo.message}
                        </span>
                    )
                }
            </label>
            
            {/* Message */}
            <label htmlFor='message'>
                <p className='label-style text-start px-4 py-1 text-sm'>Message</p>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='form-style w-full h-52 bg-richblack-800'
                    rows="30"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span className='text-pink-600 flex px-4 items-center py-2'>
                        ⚠ PLease enter your message.
                        </span>
                    )
                }
            </label>

            <button 
                type='submit'
                className=' rounded-md bg-yellow-50 text-center py-2 px-6 text-[16px] font-bold text-black'>
                {loading ? "Sending..." : "Send Message"}
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm
