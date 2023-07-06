
import SideBarCourseDetails from '../components/core/ViewLecturePage/SideBarCourseDetails';
import CourseReviewModal from '../components/core/ViewLecturePage/CourseReviewModal';
import { getFullCourseDetails } from '../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect , useState} from 'react';

import { 
  setCompletedLectures, 
  setCourseSectionData, 
  setEntireCourseData, 
  setTotalNoOfLectures 
  } from '../slices/viewCourseSlice';


const ViewLecture = () => {

  const { entireCourseData } = useSelector((state) => state.viewCourse);
  const [reviewModal, setReviewModal] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [ratingReview,setRatingReview] = useState(null);
  const {courseId} = useParams();
  const dispatch = useDispatch();
  
  useEffect( () => {

    const setCourseSpecificDetails = async() => {

      const result = await getFullCourseDetails(courseId,token);
      dispatch(setEntireCourseData(result?.courseDetails));
      setRatingReview(entireCourseData?.ratingAndReviews);
      dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
      dispatch(setCompletedLectures(result?.completedVideos));

      const totalLectures = result?.courseDetails.courseContent
        .reduce((acc,section) => acc + section.subsection.length,0 );
      
      dispatch(setTotalNoOfLectures(totalLectures));
    }

    setCourseSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <div className='flex min-h-[calc(100vh-3.5rem)] bg-richblack-900 w-screen'>
        <div className=' w-[90%] sm:w-[500px] md:w-[450px] lg:w-[30%] h-[calc(100vh-3.5rem)] overflow-auto bg-richblack-800'>
          <SideBarCourseDetails setReviewModal={setReviewModal} />
        </div>
        <div className='h-[calc(100vh-3.5rem)] overflow-y-auto w-5/6'>
            <Outlet/>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} ratingReview={ratingReview}/>}

    </>
  )
}

export default ViewLecture