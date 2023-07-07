import {BsChatLeftFill}  from 'react-icons/bs'
import {BiWorld} from 'react-icons/bi'
import {MdCall} from 'react-icons/md'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'
import React from 'react'

const contact = [
    {
        icon:BsChatLeftFill,
        title:"Chat on us",
        desc1:"Our friendly team is here to help.",
        desc2:"@mail address"
    },
    {
        icon:BiWorld,
        title:"Visit us",
        desc1:"Come and say hello at our office HQ.",
        desc2:"Here is the location/ address"
    },
    {
        icon:MdCall,
        title:"Call us",
        desc1:"Mon - Fri From 8am to 5pm",
        desc2:"+123 456 7890"
    },    
];
const Contact = () => {
  return (
    <>
        <div className='text-richblack-50 mx-auto flex flex-col lg:flex-row p-7 sm:p-20 gap-20 items-center lg:items-start'>
            <div className='flex flex-col items-center gap-5 rounded-lg h-96 sm:w-[450px] bg-richblack-800 p-10'>
            {
                contact.map ( (element,index) => (
                    <div className='flex gap-3 w-full' key={index}>
                        <p className='py-2'>{React.createElement(element.icon)}</p>
                        <div>
                            <p className='text-richblack-5 text-lg'>{element.title}</p>
                            <p className='text-richblack-200 text-sm'>{element.desc1}</p>
                            <p className='text-richblack-200 text-sm'>{element.desc2}</p>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className='border rounded-lg border-richblack-600'>
                <div className='px-4 sm:px-16 pt-10'>
                    <h1 className='text-richblack-5 text-4xl pb-4'>
                        Got a Idea? We’ve got the skills. Let’s team up
                    </h1>
                    <p className='text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
                </div>
                <ContactUsForm/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Contact