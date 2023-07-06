import { useEffect } from 'react';
import { useState } from 'react'
import {MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineOndemandVideo} from 'react-icons/md'
import { sectionDuration } from '../../../utils/totalTimeDuration';

const CourseContent = ({section}) => {

  const [sectionTime,setSectionTime] = useState(0);
  const [showIcon,setShowIcon] = useState(false);


  useEffect( () => {
    setSectionTime(sectionDuration(section?.subsection))
  },[section]);


  return (
    <details>
      {/* Section Heading */}
      <summary className='flex justify-between cursor-pointer bg-richblack-700 py-3 px-4'>
        <div className='flex gap-2 items-center'>
          <MdKeyboardArrowUp className='text-3xl text-richblack-200 font-bold '/>
          <p>{section?.name}</p>
        </div>
        <div className='flex'>
          <p>{section?.subsection.length} lectures</p>
          <p>{sectionTime.hours>0 && sectionTime.hours + "h"}  {sectionTime.minutes>0 && sectionTime.minutes + "m"}</p>
        </div>
      </summary>

      {/* Subsections */}
      <div className='px-9 py-4'>
        {
          section?.subsection.map( (subsection) => (
            <details key={subsection._id} className='py-2'>

              {/* Subsection heading */}
              <summary
                className='flex gap-2 items-center  cursor-pointer text-richblack-200'
                onClick={()=>setShowIcon((prev) => !prev)}
                >
                <MdOutlineOndemandVideo/>
                <div className='flex gap-2 items-center'>
                {subsection?.title}
                {
                  showIcon ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>
                }
                </div>
                
              </summary>

              {/* Subsection description */}
              <p className='px-6 text-richblack-25 py-2 text-sm'>{subsection?.description}</p>
            </details>
          ))
        }
        </div>
    </details>
  )
}

export default CourseContent