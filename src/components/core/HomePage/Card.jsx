import {MdGroup} from 'react-icons/md';
import {ImTree} from 'react-icons/im';
import { useState } from 'react';


const Card = ({heading,body}) => {

    const [active,setActive] = useState(false);

    const handleMouseOver = () =>{
        setActive(prev => !prev)
    }
    const handleMouseOut = () => {
        setActive(prev => !prev)
    }
    return (
        <div className={` ${active ? "bg-white shadow-yellow-50 shadow-bottom-right2 cursor-pointer": "bg-richblack-800"} 
         h-60 w-11/12 sm:h-[21rem] md:h-80 lg:w-1/3 flex flex-col justify-between px-2 sm:px-10 pt-4 sm:pt-10 pb-6 md:pt-7 md:pb-2 md:px-5 relative rounded-lg`
        }
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className='flex flex-col gap-2'>
                <h1 className={`${active ? "text-richblack-800": "text-richblack-25"} text-base sm:text-xl`}>{heading}</h1>
                <p className={`${active ? "text-richblack-500": "text-richblack-400"} text-sm sm:text-base`}>{body}</p>
            </div>
            <div className={`${active ? `border-blue-500`: "border-richblack-300"} absolute left-0 bottom-14 lg:bottom-10 border border-dashed h-px w-full`}></div>
            <div className={`${active ? `text-blue-500`: "text-richblack-300"} flex justify-between`}>
                <div className='flex gap-2 items-center'>
                    <MdGroup/>
                    <p>Beginner</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <ImTree/>
                    <p>6 Lessons</p>
                </div>
            </div>
        </div>
  )
}

export default Card;