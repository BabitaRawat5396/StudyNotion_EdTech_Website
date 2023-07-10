import { useRef } from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { updateCourseProgress } from '../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';


const VideoSection = () => {

  const {entireCourseData, courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);
  const [subsectionDetails,setSubsectionDetails] = useState(null);
  const {courseId, sectionId, subsectionId} = useParams();
  const { token } = useSelector( (state) => state.auth);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location  = useLocation();
  const navigate = useNavigate();
  const playerRef = useRef();

  useEffect( () => {

    const videoSpecificDetails = async() => {
      // setting clicked video data
      const sectionData = courseSectionData.filter( (section) => section._id === sectionId);
      if(sectionData[0]){
        const subsectionData = sectionData[0].subsection.filter( (subsection) => subsection._id === subsectionId);
        setSubsectionDetails(subsectionData[0]);  
      }
      
    }

    videoSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[entireCourseData,courseSectionData,location.pathname])


  const isFirstVideo = () => {
    const firstVideo = courseSectionData[0].subsection[0];

    if(firstVideo._id === subsectionId){
      return true;
    }else{
      return false;
    }
  }

  const isLastVideo = () => {
    const sectionLength = courseSectionData.length-1;
    const subsectionLength = courseSectionData[sectionLength].subsection.length - 1;
    const lastVideo = courseSectionData[sectionLength].subsection[subsectionLength];

    if(lastVideo._id === subsectionId){
      return true;
    }else{
      return false;
    }
  }

  const goToNext = () => {
    
    const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const subsectionLength = courseSectionData[sectionIndex].subsection.length - 1;
    const subsectionIndex = courseSectionData[sectionIndex].subsection.findIndex((subsection) => subsection._id === subsectionId);
    
    if(subsectionIndex !== subsectionLength){
      const subsection_id = courseSectionData[sectionIndex].subsection[subsectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subsection/${subsection_id}`)
    }
    else{
      const section_id = courseSectionData[sectionIndex + 1]._id;
      const subsection_id = courseSectionData[sectionIndex + 1].subsection[0]._id;
      navigate(`/view-course/${courseId}/section/${section_id}/subsection/${subsection_id}`)
    }
    setVideoEnded(false);
  }

  const goToPrevious = () => {
    
    const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const subsectionIndex = courseSectionData[sectionIndex].subsection.findIndex((subsection) => subsection._id === subsectionId);
    
    if(subsectionIndex !== 0){
      const subsection_id = courseSectionData[sectionIndex].subsection[subsectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subsection/${subsection_id}`)
    }
    else{
      const section_id = courseSectionData[sectionIndex - 1]._id;
      const subsectionLength = courseSectionData[sectionIndex - 1].length - 1;
      const subsection_id = courseSectionData[sectionIndex - 1].subsection[subsectionLength]._id;
      navigate(`/view-course/${courseId}/section/${section_id}/subsection/${subsection_id}`)
    }
    setVideoEnded(false);
  }

  const handleLectureCompletion = async() => {
    setLoading(true);
    const data = {
      courseId:courseId,
      subsectionId:subsectionId
    }
    dispatch(updateCourseProgress(data,token));
    dispatch(updateCompletedLectures(subsectionId));
    setVideoEnded(false);
    setLoading(false);
    if(!isLastVideo()){
      goToNext();
    }
  }

  return (
    <div className=''>
    {
      !subsectionDetails ? (
        <div>No Data found</div>
      ) : (
        <div>
          <div className='pt-8'>
            <Player
              ref = {playerRef}
              aspectRatio="16:8"
              playsInline
              autoPlay
              onEnded={() => setVideoEnded(true)}
              src={subsectionDetails?.videoUrl}
              className={videoEnded ? 'blur-sm' : ''}
              />
          </div>
        
          {
            videoEnded && (
              <div className='relative lg:bottom-[20rem] md:bottom-[12rem] bottom-[8rem] sm:bottom-[10rem] flex flex-col gap-2 blur-0 items-center justify-center'>
                {
                  !completedLectures.includes(subsectionId) && (
                    <IconBtn 
                      disabled={loading}
                      onclick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                      customClasses='hover:text-xl transition-all duration-200 w-fit text-xs lg:text-base'
                      />
                    )
                }

                <IconBtn 
                  disabled={loading}
                  onclick={() => {
                    if(playerRef?.current) {
                      playerRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses='hover:text-xl transition-all duration-200 w-fit  text-xs lg:text-base'
                />

                <div className='flex gap-4'>
                {
                  !isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevious}
                      className='blackButton text-sm hover:text-base transition-all duration-200'
                      >
                        Prev
                    </button>
                  )
                }
                {
                  !isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNext}
                      className='blackButton text-sm hover:text-base transition-all duration-200'
                      >
                        Next
                    </button>
                  )
                }
                </div>
              </div>
            )
          }
        </div>
        
        
      )
    }
    <div className='text-white sm:p-4 sm:px-10 flex flex-col gap-2 px-4 py-3'>
      <h1 className='text-3xl text-richblack-100 font-semibold'>
        {subsectionDetails?.title}
      </h1>
      <p className='text-sm text-richblack-400'>
        {subsectionDetails?.description}
      </p>
    </div>
    </div>
  )
}

export default VideoSection