

import { getAllRatingsReviewCourse } from '../services/operations/ratingsReviewAPI';
import CourseContent from '../components/core/CoursePage/CourseContent';
import CourseBuyCart from '../components/core/CoursePage/CourseBuyCart';
import ReviewSection from '../components/core/HomePage/ReviewSection';
import { getCourseDetails } from '../services/operations/courseAPI';
import RatingStars from '../components/common/RatingStars';
import { courseDuration} from '../utils/totalTimeDuration';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate } from '../utils/dateFormatter';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/common/Footer';
import GetAvgRating from '../utils/avRating';
import {BsInfoCircle} from 'react-icons/bs';
import { useEffect,useState } from 'react';
import {RxDotFilled} from 'react-icons/rx';



const Course = () => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [subsectionLength,setSubsectionLength] = useState(0);
  const {course,loading} = useSelector( (state) => state.course);
  const [ratingCount,setRatingCount] = useState(0);
  const [reviewData,setReviewData] = useState(null);
  // const [loading,setLoading] = useState(false);
  const [duration,setDuration] = useState(0);
  const [date,setDate] = useState(null);
  const {courseId} = useParams();
  const dispatch = useDispatch();

  
  // Full course details
  useEffect( () => {

    // setLoading(true);

    // Fetching course specific ratings and reviews
    const getReviewData = async() =>{
      const res = await getAllRatingsReviewCourse({courseId:courseId});
      setReviewData(res);
    }
    getReviewData();

    // Getting Course Details
    dispatch(getCourseDetails({courseId:courseId}));
    // setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[courseId]);
  useEffect(() => {
    // Function to update window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Event listener for window resize
    window.addEventListener('resize', updateWindowSize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);
  // ratings and date
  useEffect( () => {
    if(course){
      setRatingCount(GetAvgRating(course?.ratingAndReviews))
      setDate(formattedDate(course?.createdAt));
      
      // Calculated subsections 
      setSubsectionLength(course?.courseContent.reduce((acc, section) => acc + section.subsection.length, 0));
     
      // Calculating total time
      setDuration(courseDuration(course?.courseContent));
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[course?.ratingAndReviews,course?.createdAt]);

  return (
    <div className='text-white'>
    {
      loading ? (
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="text"> LOADING...</div>
          </div>
        </div>
      ) : (
        <div>
          <div className='lg:flex lg:relative'>
            <div>
            {
              course && 
              <div>

                {/* Top section */}
                <div className='bg-richblack-800 p-10  rounded-b-lg w-full'>
                  <div className='flex flex-col gap-4 lg:w-[62%] lg:border-r-2 lg:border-richblack-700 px-5'>
                    <p className='text-sm text-richblack-200'><Link to="/" className='hover:text-yellow-50'>Home </Link> / Learning / <span className='text-yellow-100'>{course?.category?.name}</span></p>
                    <p className=' text-3xl'>{course?.courseName}</p>
                    <div className='flex flex-col gap-1 text-richblack-200 text-base'>
                      <p className=' text-sm text-richblack-400'>{course?.courseDescription}</p>
                      <div className='flex gap-2 text-base items-center text-richblack-500'>
                        <p className=' text-lg text-yellow-200'>({ratingCount})</p>
                        <RatingStars Review_Count={ratingCount} Star_Size={20}/>
                        <p>({course?.ratingAndReviews.length} Ratings)</p>
                        <p>{course?.studentEnrolled.length} Students</p>
                      </div>
                      
                      <p>Created by {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                      <div className='flex gap-2 items-center'>
                        <BsInfoCircle/>
                        {
                          date &&
                          <span>Created at {date.toString()}</span>

                        }
                      </div>
                    </div>
                  </div>
                </div>
                    
                <div className='p-10 lg:w-[64%]'>
                  {/* What You will learn */}
                  <div className='p-10 border border-richblack-600 rounded-xl'>
                    <p className='text-3xl border-b text-richblack-50 border-richblack-600 py-1'>What you'll learn</p>
                    <ol  className='tick-list py-5 text-richblack-400'>
                    {
                      course?.whatYouWillLearn.split("\n").map( (list,index) => (
                        <li key={index} className='text-sm py-[0.1rem]'>{list}</li>
                      ))
                    }
                    </ol>
                  </div>

                  {/* Course Content (Section)*/}
                  <div className='py-10 text-richblack-400'>
                    <h1 className=' text-3xl text-richblack-5 px-4'>Course Content</h1>
                    <div className='flex gap-1 items-center text-sm pb-4 px-4 text-richblack-100'>
                      <span>{course?.courseContent.length} Sections</span>
                      <RxDotFilled/> 
                      <span>{subsectionLength} lectures</span>
                      <RxDotFilled/> 
                      <span>{duration.hours>0 && duration.hours+ "h"} {duration.minutes>0 && duration.minutes + "m"} total length</span>
                    </div>
                    <div className='border-2 border-richblack-700'>
                    {
                      course?.courseContent.map( (section) => (
                        <CourseContent section={section} key={section._id}></CourseContent>
                      ))
                    }
                    </div>
                  </div>

                  {/* Author Section */}
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl border-b-2 px-2 border-richblack-700'>Author</h1>
                    <div className='px-6 py-3'>
                      <div className='flex gap-2 items-center '>
                        <img src={course?.instructor?.imageUrl} alt={course?.instructor?.firstName} className='h-10 object-cover rounded-full aspect-square'/>
                        <p className='font-semibold text-lg'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                      </div>
                      <p className='py-2 text-richblack-400'>{course?.instructor?.additionalDetails?.about}</p>
                    </div>
                    
                  </div>

                  
                </div>

                {/* Reviews Section */}
                <ReviewSection reviewData={reviewData} windowSize={windowSize}/>
              </div>
                
            }
            </div>
            
            {/* Course Cart */}
            <div className='lg:absolute lg:right-10 lg:w-4/12 sm:h-5/6 w-11/12 sm:w-9/12 mb-16 md:w-7/12 mx-auto'>
            {
              course && 
              <CourseBuyCart course = {course} duration={duration}/>
            }
            </div>
          </div>
          <Footer/>
        </div>
      )
    }
    </div>
  )
}

export default Course