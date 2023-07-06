
import { createSection, updateSection } from '../../../../../../services/operations/sectionAPI';
import { setEditCourse, setRenderPageNo } from '../../../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import {RiAddCircleFill} from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import {GrFormNext} from 'react-icons/gr';
import NestedView from './NestedView';
import { useState } from 'react';
import { toast } from 'react-hot-toast';


const CourseBuilder = () => {
  
  const {course} = useSelector( (state) => state.course);
  const {token} = useSelector( (state) => state.auth);
  const [editSection, setEditSection] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
  } = useForm();

  const dispatch = useDispatch();

  const handleSectionSubmit = (data) => {
    
    let result;

    if(editSection){
      result = {
        sectionName:data.sectionName,
        sectionId:editSection,
        courseId:course?._id
      }
      dispatch(updateSection(result,token));
    }else{
      result = {
        sectionName:data.sectionName,
        courseId:course?._id
      }
      dispatch(createSection(result,token));
    }
    //update values
    if(result) {
      setEditSection(null);
      setValue("sectionName", "");
    }
  }

  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
  }

  const handleEditSectionButton = (sectionId,sectionName) => {
    if(editSection === sectionId ){
      cancelEdit();
      return;
    }
    setEditSection(sectionId);
    setValue("sectionName",sectionName);
  }

  const GoBack = () => {

    dispatch(setRenderPageNo(1));
    dispatch(setEditCourse("Editing"));
  }

  const GoToNext = () => {
    if(course?.courseContent.length === 0){
      toast.error("Please Add atleast one section");
      return
    }
    if (course.courseContent.some((section) => section.subsection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setRenderPageNo(3));
  }
  
  return (
    <div className='bg-richblack-800 border border-richblack-700 rounded-2xl p-7 flex flex-col gap-14 lg:w-[80%]'>
      <form 
        className="flex flex-col"
        onSubmit={handleSubmit(handleSectionSubmit)}
      >
        <div className="  flex flex-col gap-5 pt-5">
          <h1 className=' text-richblack-200 text-2xl'>Course Builder</h1>
          <label htmlFor='sectionName' className="flex flex-col gap-1">
            <p className="text-richblack-100 text-sm px-1">Section Name<span className="text-pink-400 text-lg"> *</span></p>
            <input
              type='text'
              id='sectionName'
              name='sectionName'
              {...register("sectionName",{required:true})}
              placeholder='Add a section to build your course'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
            />
            {
              errors.sectionName && (
                <span className=" text-pink-300 text-sm px-1"> Please Enter Section Name </span>
              )
            }
          </label>
          <div className='flex items-center gap-4'>
          <button 
            type='submit'
            className='flex items-center gap-2 border-[2px] rounded-xl border-yellow-300 w-fit p-2
          text-yellow-400 cursor-pointer'
          >
            <RiAddCircleFill/>
            <p>{ editSection ? "Edit Section Name" : "Create Section"}</p>
          </button>
          {
            editSection && (
              <div 
                onClick={cancelEdit}
                className='text-blue-600 font-semibold underline text-sm border-2 rounded-lg p-2 px-3 border-blue-700 cursor-pointer'
              >
                Cancel Edit
              </div>
            )
          }
          </div>
          
        </div>
      </form>
      {
        course?.courseContent.length > 0 && (
          <NestedView
            handleEditSectionButton = {handleEditSectionButton}
          />
        )
      }
      <div className='flex gap-4 justify-end mr-5'>
        <button
          type='button'
          onClick={GoBack}
          className='bg-blue-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'
        >
          Back
        </button>
        <button
          onClick={GoToNext}
          className='flex items-center bg-yellow-300 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 '
        >
          <p>Next</p>
          <GrFormNext/>
        </button>
      </div>

    </div>
  )
}

export default CourseBuilder