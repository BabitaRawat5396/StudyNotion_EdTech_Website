
import { createSubsection, updateSubsection } from '../../../../../../services/operations/subsectionAPI';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from '../Common/FileUpload';
import { useEffect, useState } from 'react';
import {GiCrossMark} from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';


const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
  
  
  const {token} = useSelector( (state) => state.auth);
  const [loading,setLoading] = useState(false);
  const {course} = useSelector( (state) => state.course);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm();

  useEffect(() => {
    if(view || edit) {
        setValue("lectureTitle", modalData.title);
        setValue("lectureDescription", modalData.description);
        setValue("lectureURL", modalData.videoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isFormUpdated = () => {
      const currentValues = getValues();
      if(currentValues.lectureTitle !== modalData.title ||
          currentValues.lectureDescription !== modalData.description ||
          currentValues.lectureURL !== modalData.videoUrl ) {
              return true;
          }
      else {
          return false;
      }

  }
  const handleEditSubSection = () => {
    
      const currentValues = getValues();
      const formData = new FormData();

      formData.append("courseId", course._id);
      formData.append("subsectionId", modalData._id);

      if(currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle);
      }

      if(currentValues.lectureDescription !== modalData.description) {
          formData.append("description", currentValues.lectureDescription);
      }

      if(currentValues.lectureURL !== modalData.videoUrl) {
          formData.append("videoFile", currentValues.lectureURL);
      }
      
      setLoading(true);
      //API call
      dispatch(updateSubsection(formData, token));
      
      setModalData(null);
      setLoading(false);
  }

  const handleSubsectionForm = (data) => {
    
    if(view)
      return;

    if(edit) {
      
      if(!isFormUpdated()) {
        toast.error("No changes made to the form")
      }
      else {
        //edit krdo store me 
        handleEditSubSection();
      }
      return;
    }
    
    if(add){
      const formData = new FormData();
      formData.append("courseId",course._id)
      formData.append("sectionId",modalData.sectionId);
      formData.append("title",data.lectureTitle);
      formData.append("description",data.lectureDescription);
      formData.append("videoFile",data.lectureURL);
      setLoading(true);
      dispatch(createSubsection(formData,token))
      .then( () => {
        setLoading(false);
        setModalData(null);
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm p-12">
    <div className='bg-richblack-800 md:w-[700px] rounded-xl border border-richblack-700'>
      <div className='flex justify-between rounded-t-xl text-xl font-semibold px-3 py-2 md:px-6 md:py-3 items-center leading-10 bg-blue-700 text-yellow-500'>
        <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
        <GiCrossMark className='cursor-pointer' onClick={() => (!loading ? setModalData(null): {})}/>
      </div>
      <form
        onSubmit={handleSubmit(handleSubsectionForm)}
        className=' px-4 sm:px-14 py-10 flex flex-col gap-5 sm:h-[60%]'
      >
        <FileUpload
          setValue={setValue}
          errors={errors}
          register={register}
          data={modalData}
          fileType="video"
          name="lectureURL"
          label="Lecture Video"
        />
        <label htmlFor="lectureTitle" className="flex flex-col gap-1">
          <p className="text-richblack-25 text-sm px-1"> Lecture Title 
            <span className="text-pink-400 text-lg"> *</span>
          </p>
          <input
            type="text"
            id="lectureTitle"
            name="lectureTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true})}
            defaultValue={modalData?.title || ""}
            className=" bg-richblack-700 rounded-md p-2 px-5 outline-none w-full h-12"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {
            errors.lectureTitle && ( 
              <span className=" text-pink-300 text-sm px-1"> Please Enter Lecture Title </span> 
            )
          }
        </label>
        <label htmlFor="lectureDescription" className="flex flex-col gap-1">
          <p className="text-richblack-25 text-sm px-1"> Lecture Description 
            <span className="text-pink-400 text-lg"> *</span>
          </p>
          <textarea
            id="lectureDescription"
            name="lectureDescription"
            placeholder="Enter Lecture Description"
            {...register("lectureDescription", { required: true})}
            defaultValue={modalData?.description || ""}
            className=" bg-richblack-700 rounded-md p-2 px-5 outline-none w-full h-52"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {
            errors.lectureDescription && ( <span className=" text-pink-300 text-sm px-1"> Please Enter Lecture Title </span> )
          }
        </label>
        {
          !view && (
            <div className="flex justify-end w-full px-8">
              <button 
                type='submit'
                className=' rounded-md bg-blue-600 text-center py-2 px-6 text-[16px] font-bold
                  text-yellow-300 w-fit'
              >
                {
                  loading ? "Loading...": edit ? "Save Changes" : "Save"
                }
              </button>
            </div>
          )
        }
      </form>
    </div>
    </div>
  )
}

export default SubSectionModal