
import { createCourse, fetchCategories, updateCourse } from "../../../../../../services/operations/courseAPI";
import { setEditCourse, setRenderPageNo } from "../../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import CourseInstructions from "./CourseInstructions";
import {HiCurrencyRupee} from 'react-icons/hi';
import FileUpload from "../Common/FileUpload";
import { useForm } from "react-hook-form";
import {GrFormNext} from 'react-icons/gr';
import TagSelection from "./TagSelection";
import {useState,useEffect} from "react";
import { toast } from "react-hot-toast";



const CourseCreation = () => {

  const { register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
  const {course, editCourse} = useSelector((state) => state.course);
  const [courseCategories,setCourseCategories] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseName !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      currentValues.tag.toString() !== course.tag.toString() ||
      currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValues.category !== course.category._id ||
      currentValues.instructions.toString() !== course.instructions.toString() ||
      currentValues.thumbnail !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const SubmitCourseDetails = (data) => {

    // editing Course
    if(editCourse){
      
      if (isFormUpdated()) {
        
        const currentValues = getValues();
        
        const formData = new FormData()
        
        
        formData.append("courseId", course._id)
        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", data.courseName)
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price)
        }
        if (currentValues.tag.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag))
        }
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn)
        }
        if (currentValues.category !== course.category._id) {
          formData.append("category", data.category)
        }
        if (currentValues.instructions.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail)
        }
        dispatch(updateCourse(formData,token));
  
      } else {
        toast.error("No changes made to the form")
      }
      return
    }
    
    // Adding new course
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("price", data.price);
    formData.append("tag", JSON.stringify(data.tag));
    formData.append("category", data.category);
    formData.append("instructions", JSON.stringify(data.instructions));
    formData.append("thumbnailImage", data.thumbnail);
    formData.append("status", COURSE_STATUS.DRAFT);

    
    // Create Course API Call
    dispatch(createCourse(formData, token));

    dispatch(setEditCourse(false));
  }
  
  // Calling Categories Function in the first render So that Categories drop down will be shown
  useEffect( () => {
    // fetching all categories
    const getAllCategories = async() => {

      setLoading(true)
      const categories = await fetchCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    // If courses edit is true then seting the value from course
    if(editCourse){
      setValue("courseName", course.courseName)
      setValue("courseDescription", course.courseDescription)
      setValue("price", course.price)
      setValue("tag", course.tag)
      setValue("whatYouWillLearn", course.whatYouWillLearn)
      setValue("category", course?.category)
      setValue("instructions", course.instructions)
      setValue("thumbnail", course.thumbnail)
    }

    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <form onSubmit={handleSubmit(SubmitCourseDetails)} className="flex flex-col gap-10 w-full lg:w-[80%]">
      <div className=" bg-richblack-800 border border-richblack-700 rounded-2xl p-7 flex flex-col gap-5 py-10">
        {/* Course Name */}
        <label htmlFor="courseName" className="flex flex-col gap-1">
          <p className="text-richblack-25 text-sm px-1"> Course Title 
            <span className="text-pink-400 text-lg"> *</span>
          </p>
          <input
            type="text"
            id="courseName"
            name="courseName"
            placeholder="Enter Course Title"
            {...register("courseName", { required: true})}
            defaultValue={course?.courseName || ""}
            className="form-style w-full"
          />
          {
            errors.courseName && ( <span className=" text-pink-300 text-sm px-1"> Please Enter Course Name </span> )
          }
        </label>

        {/* Course Description */}
        <label htmlFor="courseDescription" className="flex flex-col gap-1">
          <p className=" text-richblack-25 text-sm px-1">Course Short Description 
            <span className=" text-pink-400 text-lg"> *</span>
          </p>
          <textarea
            id="courseDescription"
            name="courseDescription"
            placeholder="Enter Description"
            {...register("courseDescription", { required: true})}
            defaultValue={course?.courseDescription || ""}
            className="form-style w-full h-52 py-4"
          />
          {
            errors.courseDescription && ( <span className=" text-pink-300 text-sm px-1"> Please Enter Course Description </span> )
          }
        </label>

        {/* Course Price */}
        <label htmlFor="price" className=" relative flex flex-col gap-1">
          <p className=" text-richblack-25 text-sm px-1"> Price <span className=" text-pink-400 text-lg"> *</span></p>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            {...register("price", { required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },})}
            defaultValue={course?.price || ""}
            className="form-style w-full px-12"
          />
          {
            errors.price && ( <span className=" text-pink-300 text-sm px-1"> Please Enter Course Price </span> )
          }
          <HiCurrencyRupee className="absolute bottom-[0.9rem] left-4 text-xl text-yellow-300"/>

        </label>

        {/* Course Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-25 px-1" htmlFor="category">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            {...register("category", { required: true })}
            defaultValue=""
            id="category"
            className="form-style w-full"
          >
            <option value="" disabled> Choose a Category </option>
            {!loading &&
              courseCategories?.map((category, indx) => (
                <option key={indx} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>        

        {/* Tags Added to Course */}
        <TagSelection
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Thumbnail */}
        <FileUpload
          data={course}
          register={register}
          setValue={setValue}
          errors={errors}
          fileType="image"
          name="thumbnail"
          label="Course Thumbnail"
        />

        {/* Course Benefit */}
          <label htmlFor="whatYouWillLearn" className="flex flex-col gap-1">
            <p className="text-richblack-25 text-sm px-1">Benefits of the course <span className=" text-pink-400 text-lg"> *</span></p>
            <textarea
              id="whatYouWillLearn"
              name="whatYouWillLearn"
              placeholder="Enter Benefits of the course"
              {...register("whatYouWillLearn",{required:true})}
              defaultValue={course?.whatYouWillLearn}
              className=" bg-richblack-700 rounded-md p-4 px-5 outline-none w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              cols={50}
              rows={9}
            />
            {
              errors.whatYouWillLearn && (
                <p className=" text-pink-300 text-sm px-1">Please Enter Course Benefits</p>
              )
            }
          </label>

          {/* Instructions */}
          <CourseInstructions
            setValue={setValue}
            register={register}
            errors={errors}
          />

          <div className="flex justify-end w-full px-8 gap-5">
            {
              editCourse && (
                <button
                  onClick={() => dispatch(setRenderPageNo(2))}
                  type="button"
                  className='whitespace-nowrap bg-blue-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'  
                >
                  Continue Without Saving
                </button>
              )
            }
            <button
              type="submit"
              className=" whitespace-nowrap flex bg-yellow-300 items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900"
              >
              <p>{editCourse ? "Save Changes" : "Next"}</p>
              <GrFormNext/>
            </button>
        </div>
      </div>  
    </form>
  )
    
}

export default CourseCreation