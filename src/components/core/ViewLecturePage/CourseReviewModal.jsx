import { useForm } from 'react-hook-form';
import {GiCrossMark} from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useEffect } from 'react';
import { createRatingsReviews, updateRatingsReviews } from '../../../services/operations/ratingsReviewAPI';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { useState } from 'react';
import { getRatingReviewSpecificCourse } from '../../../services/operations/ratingsReviewAPI';
import { toast } from 'react-hot-toast';

const CourseReviewModal = ({setReviewModal,ratingReview}) => {
  const [ratingData,setRatingData] = useState(null);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);
  const [reviewEdit,setReviewEdit] = useState(false);
  const {courseId} = useParams();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState:{errors},
    setValue
  } = useForm();

  const isFormUpdated = (data) => {
    
    if(data.courseExperience !== ratingData.review && data.rating !== ratingData.rating){
      return true;
    }else{
      return false;
    }
  }
  const handleSubmitReview = (data) => {
    
    if(reviewEdit){
      if(isFormUpdated(data)){
        setLoading(true);
        
        const formData = new FormData();
  
        formData.append("courseId",courseId);
        if(data.courseExperience !== ratingData.review){
          formData.append("review",data.courseExperience);
        }
        if(data.courseRating !== ratingData.rating){
          formData.append("rating",data.courseRating);
        }
        dispatch(updateRatingsReviews(formData,token));
        setLoading(false);
        setReviewModal(false);
  
      }else{
        toast.error("No changes have been made");
        
        
      }
      return;
    }
    
    setLoading(true);

    const formData = new FormData();
    formData.append("review",data.courseExperience);
    formData.append("courseId",courseId);
    formData.append("rating",data.courseRating);
    dispatch(createRatingsReviews(formData,token))
    setReviewModal(false);
    setLoading(false);
  }
  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }
  useEffect( () => {
    if(ratingData){
      setReviewEdit(true);
      setValue("courseExperience",ratingData?.review);
      setValue("courseRating",ratingData?.rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ratingData]);


  useEffect( () => {
    register("courseRating",{required:true})
    
    const gettingData = async() => {
      const res = await getRatingReviewSpecificCourse({courseId:courseId},token);
      setRatingData(res);
    }
    gettingData();
    setValue("courseRating",ratingData?.rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="text-richblack-800 fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
      <div className='bg-richblack-800 w-[500px] rounded-xl'>
        <div className='flex justify-between p-4 bg-richblack-700 text-richblack-50 items-center rounded-t-xl'>
          <h1 className='font-semibold '>Add Review</h1>
          <GiCrossMark
            onClick={() => setReviewModal(false)}
            className='cursor-pointer'
           />
        </div>
        <div className='flex flex-col items-center justify-center p-8 gap-10'>
          <div className='text-richblack-400'>
            <div className='flex gap-2'>
              <img src={user.imageUrl} alt={user.firstName} className='h-14 aspect-square rounded-full object-cover'/>
              <div>
                <p className='font-semibold text-richblack-50 text-lg'>{user.firstName} {user.lastName}</p>
                <p>Posting Publicly</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSubmitReview)} >
            <div className='flex px-3 items-center'>
              <p className='text-lg text-richblack-50 font-semibold'>Rating : </p>
              <ReactStars 
                count={5}
                isHalf={true}
                onChange={ratingChanged}
                size={30}
                activeColor="#ffd700"
                value={ratingData?.rating}
                />
            </div>
            
            <label htmlFor='courseExperience'>
              <p className='lable-style px-2 py-1'>Add Your Experience <span className='text-pink-600 text-xl mt-2'>*</span></p>
              <textarea
                cols={50}
                name='courseExperience'
                {...register("courseExperience",{required:true})}
                placeholder='Share Details of your own experience for this course'
                className='form-style h-48'
              />
              {
                errors.courseExperience && (
                  <span className='text-sm text-pink-600 px-3'>Write the review please</span>
                )
              }
            </label>
            <div className='flex gap-4 justify-end px-4 py-5'>
              <button
                className='blackButton bg-richblack-700 shadow-[0_1px_0_0] shadow-white/50'
                onClick={() => setReviewModal(false)}
                >
                Cancel
              </button>
              <IconBtn
                type='submit'
                text={loading ? 'Saving...' : 'Save Edits'}
                />
            </div>
          </form>
        </div>
        
      </div>
    </div>
  )
}

export default CourseReviewModal