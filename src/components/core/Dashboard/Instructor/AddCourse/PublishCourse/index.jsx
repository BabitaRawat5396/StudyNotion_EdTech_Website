
import { resetCourseState , setRenderPageNo} from '../../../../../../slices/courseSlice';
import { updateCourse } from '../../../../../../services/operations/courseAPI';
import { COURSE_STATUS } from '../../../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import {GrFormPrevious} from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


const PublishCourse = () => {

  const {register, setValue, handleSubmit} = useForm();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToMyCourses = () =>{
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
    
  }

  const SaveDraft = () => {
    goToMyCourses();
  }

  const formSubmit = (data) => {

    // When no edit has been done
    if((course.status === COURSE_STATUS.DRAFT && data.publish === false) || 
    (course.status === COURSE_STATUS.PUBLISHED && data.publish === true)){
      goToMyCourses();
      return;
    }

    // If edit is done
    const formData = new FormData();
    const updatedStatus = data.publish ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status",updatedStatus);
    formData.append("courseId",course._id);
    dispatch(updateCourse(formData,token)).then( () => {
      goToMyCourses();
    });
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-16 lg:w-[80%]'>
      <div className='bg-richblack-800 border border-richblack-700 rounded-xl p-5 py-8'>
        <h1 className=' text-2xl text-richblack-25 px-5 font-semibold leading-9 tracking-wide'>Publish Settings</h1>
        <label htmlFor="publish" className='px-9 flex gap-3 py-4'> 
          <input 
            type="checkbox" 
            name="publish" 
            id='publish'
            {...register("publish")} 
          />
          <span className=' text-base text-richblack-300 tracking-wider leading-7'>Make this Course Public</span>
        </label>
      </div>
          
      <div className='flex flex-col sm:flex-row justify-between gap-4'>
        <button
          onClick={() => {dispatch(setRenderPageNo(2))}}
          type='button'
          className='w-fit flex items-center bg-blue-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'
          >
          <GrFormPrevious/>
          <p>Back</p>
        </button>
        <div className='flex gap-4 '>
          <button
            type='button'
            onClick={SaveDraft}
            className='whitespace-nowrap bg-blue-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'
            >
              Save as a Draft
          </button>
          <IconBtn
            type="submit"
            text="Save and Publish"
            customClasses='whitespace-nowrap'
          />
        </div>
      </div>
    </form>
  )
}

export default PublishCourse