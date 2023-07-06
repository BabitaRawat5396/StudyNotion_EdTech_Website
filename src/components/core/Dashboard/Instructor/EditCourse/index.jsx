
import AddCourses from '../AddCourse'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../../../../../services/operations/courseAPI'
import { setEditCourse } from '../../../../../slices/courseSlice'
import { useEffect } from 'react'

const EditCourse = () => {
  
  const {courseId} = useParams();
  const {course,loading} = useSelector((state) => state.course);
  const dispatch = useDispatch();


  useEffect( () => {
    dispatch(getCourseDetails({courseId:courseId}));
    dispatch(setEditCourse(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div>
      {
        loading ? (
          <div className="wrap">
            <div className="loading text-base lg:text-lg lg:pl-52">
              <div className="bounceball"></div>
              <div className="text"> LOADING</div>
            </div>
          </div>
        ) : (
          <div>
          {
            course && (
            <div>
              <h1 className='text-3xl text-blue-600 pl-6 pt-14 tracking-wide font-semibold border-b border-blue-400 mx-10'>Edit Course</h1>
              <AddCourses/>
            </div>
            )
          }
          </div>
        )
      }
    </div>
  )
}

export default EditCourse