
import SideBarCourseDetails from '../components/core/ViewLecturePage/SideBarCourseDetails';
import CourseReviewModal from '../components/core/ViewLecturePage/CourseReviewModal';
import { getFullCourseDetails } from '../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {MdMenuOpen} from 'react-icons/md';
import { useEffect , useState} from 'react';

import { 
  setCompletedLectures, 
  setCourseSectionData, 
  setEntireCourseData, 
  setTotalNoOfLectures 
  } from '../slices/viewCourseSlice';
import useWindowSize from '../hooks/windowSize';
import { setLectureSideBar } from '../slices/sideBarSlice';


const ViewLecture = () => {

  const { entireCourseData } = useSelector((state) => state.viewCourse);
  const {lectureSideBar} = useSelector((state) => state.showSidebar);
  const [reviewModal, setReviewModal] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [ratingReview,setRatingReview] = useState(null);
  const windowSize = useWindowSize();
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
        <div className={`${windowSize.width < 760 ? (lectureSideBar ? 'fixed z-40 bg-richblack-800 top-14 overflow-auto h-[calc(100vh-3.5rem)] w-[85%] sm:w-[65%]' : 'hidden') : 'sm:w-[500px] md:w-[450px] lg:w-[30%] h-[calc(100vh-3.5rem)] overflow-auto bg-richblack-800'}`}>
          <SideBarCourseDetails setReviewModal={setReviewModal}/>
        </div>

        
        <div className='h-[calc(100vh-3.5rem)] overflow-y-auto w-full md:w-5/6'>
            <MdMenuOpen onClick={() => dispatch(setLectureSideBar(true))} className={`${windowSize.width < 760 ? 'text-richblack-200 text-2xl m-2' : ''}`}/>
            <Outlet/>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} ratingReview={ratingReview}/>}

    </>
  )
}

export default ViewLecture