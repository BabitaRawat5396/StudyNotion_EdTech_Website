
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowUp, MdOndemandVideo } from 'react-icons/md';
import { sectionDuration } from '../../../utils/totalTimeDuration';
import {IoIosArrowBack} from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import {GiCrossMark} from 'react-icons/gi';
import { setLectureSideBar } from '../../../slices/sideBarSlice';


const SideBarCourseDetails = ({setReviewModal}) => {

  const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);
  const {lectureSideBar} = useSelector((state) => state.showSidebar);
  const [activeSubSection, setActiveSubSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const {courseId, sectionId, subsectionId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
      if(sectionId){
        setExpandedSection(sectionId);
      }
      if(subsectionId){
        setActiveSubSection(subsectionId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className='text-richblack-200'>
      {
        lectureSideBar && (
          <GiCrossMark onClick={() => dispatch(setLectureSideBar(false))} className='text-xl w-full pl-72 mt-2'/>
        )
      }
      <div className='flex justify-between'>
        <span 
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className='whitespace-nowrap cursor-pointer flex gap-1 items-center p-4 px-2'
          >
          <IoIosArrowBack/>
            Back to courses
        </span>
        <IconBtn
          text='Add review'
          onclick={() => setReviewModal(true)}
          customClasses=' w-fit m-4 whitespace-nowrap'
          />
      </div>
      <h1 className='px-4 pt-2 text-lg text-richblack-50 border-b border-caribbeangreen-700 
        font-semibold mb-6'>
        {courseEntireData?.courseName} (
          <span className=' text-caribbeangreen-600'>
            {completedLectures.length} / {totalNoOfLectures}
          </span>
        )
      </h1>
      {
        courseSectionData.map( (section) => (
          <div
            key={section._id}
            onClick={() => {
              setExpandedSection(section._id);
            }}
            >
            <div 
              className='flex justify-between items-center cursor-pointer bg-richblack-700 py-2 pl-2 pr-4'
              >
              <div className='flex gap-2 items-center'>
                <MdKeyboardArrowUp className='text-3xl text-richblack-200 font-bold ' />
                <p>{section?.name}</p>
              </div>
              <p className='inline-block whitespace-nowrap'>
                {sectionDuration(section?.subsection).hours + 'h ' + sectionDuration(section?.subsection).minutes + 'm'}
              </p>
            </div>
            <div className='px-9'>
            {
              expandedSection === section._id && (
                section?.subsection.map((subsection) => (
                <div 
                  key={subsection._id} 
                  className={`py-3 flex gap-2 justify-between cursor-pointer ${activeSubSection === subsection._id ? "text-yellow-200 font-semibold" : "text-richblack-25 "}`}
                  onClick={() => {
                    navigate(`/view-course/${courseId}/section/${section._id}/subsection/${subsection._id}`)
                    setActiveSubSection(subsection._id)
                  }}>
                  {/* Subsection heading */}  
                    <label className='flex gap-4'>
                      <input
                        type='checkbox'
                        checked= {completedLectures.includes(subsection?._id)}
                        onChange={() => {}}
                        className='mb-4 flex-shrink-0'
                        />
                      <span>
                        {subsection.title}
                      </span>
                    </label>
                    
                      
                    <MdOndemandVideo className='mt-1 flex-shrink-0'/>
                </div>
              ))
              )
            }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SideBarCourseDetails