import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png'

const TimelineSection = () => {

    const timeline = [
        {
            title:"Leadership",
            body:"Fully committed to the success company",
            logo:Logo1
        },
        {
            title:"Responsibility",
            body:"Students will always be our top priority",
            logo:Logo2
        },
        {
            title:"Flexibility",
            body:"The ability to switch is an important skills",
            logo:Logo3
        },
        {
            title:"Solve the problem",
            body:"Code your way to a solution",
            logo:Logo4
        },

    ]

    return (
        <div className='relative flex flex-col lg:flex-row gap-20 items-center my-20'>
            <div className='flex flex-col lg:w-[45%] gap-5'>
                {
                    timeline.map( (element,index) => {
                        return <div key={index} className='relative flex gap-3 sm:gap-6'>
                                    <div className=' bg-white rounded-full h-10 w-10 flex items-center justify-center drop-shadow-2xl shadow-xl shadow-richblack-50'>
                                        <img src={element.logo} alt="logo" className=''/>
                                    </div>
                                    <div className={` hidden sm:visible ${index === 3 ? "absolute" : "absolute top-[3.3rem] left-[0.26rem] sm:top-[3.35rem] sm:left-[0.35rem] border border-dotted border-richblack-100 w-7 h-px rotate-90"}`}></div>

                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold text-richblack-800 text-base'>{element.title}</h1>
                                        <p className='text-richblack-700 text-sm'>{element.body}</p>
                                    </div>
                                    
                                </div>  
                    })
                }
            </div>
            <div className='relative z-[1]'>
                <img src={timelineImage} alt="timelineImage"/>
                <div className='absolute top-3 left-3 h-full w-full bg-white z-[-1]'></div>
                <div className='absolute z-[-2] top-16 w-full md:top-28 md:left-8 h-3/6 md:w-[32rem] rounded-full'
                    style={
                        {
                            // this is creating multilayer of shadow where spread is for 1st layer is 10 then for 2nd 20 and 3rd layer 30 
                            boxShadow: '0 0 20px 10px rgba(156, 236, 251, 0.6), 0 0 40px 20px rgba(101, 199, 247, 0.6), 0 0 60px 30px rgba(0, 82, 212, 0.6)'
                        }
                    }
                ></div>
            </div>
            <div className=' w-[90%] h-[15%] flex px-6 py-2 sm:p-6 md:p-10 absolute -bottom-14 md:right-14 md:-bottom-16 z-[2] bg-caribbeangreen-700 sm:w-80 sm:h-24 md:w-[26rem] md:h-[7rem] text-caribbeangreen-300' >
                <div className='flex flex-col sm:flex-row sm:gap-2 md:gap-4 border-r border-caribbeangreen-500 px-1 md:px-2'>
                    <h1 className='font-bold text-lg sm:text-2xl md:text-4xl text-white'>10</h1>
                    <p className=' text-xs sm:text-sm leading-5'>YEARS EXPERIENCE </p>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-2 md:gap-4 px-4 md:px-6'>
                    <h1 className='font-bold text-lg sm:text-2xl md:text-3xl text-white'>250</h1>
                    <p className=' text-xs sm:text-sm  leading-5'>TYPES OF COURSES</p>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection;