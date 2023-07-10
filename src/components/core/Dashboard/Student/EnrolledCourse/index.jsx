

import { fetchEnrolledCourses } from '../../../../../services/operations/courseAPI';
import EnrolledCoursesTable from './EnrolledCoursesTable';
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const EnrolledCourse = () => {

  const {token} = useSelector( (state) => state.auth);
  const {loading} = useSelector( (state) => state.course);

  const [enrolledCourses,setEnrolledCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect( () => {
    
    const getEnrolledCourses = async() => {
      const result = await fetchEnrolledCourses(token,dispatch);
      setEnrolledCourses(result);
    }
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div>
      {
        !enrolledCourses || loading ? (
          <div className="wrap">
            <div className="loading sm:ml-20">
              <div className="bounceball"></div>
              <div className="text"> LOADING...</div>
            </div>
          </div>
        ) : (
          <div>
            <div className=" text-sm text-richblack-300 mt-6 ml-6">
              <Link to='/'>Home</Link> /
              <span> Dashboard / </span>
              <span className='text-yellow-100'>Enrolled Courses</span>
            </div>
            <h1 className='text-3xl text-richblack-50 mx-8 py-2 my-3 px-2 border-b border-richblack-600'>Enrolled Courses</h1>
            {
              !enrolledCourses.length ? (
                <p className="text-2xl text-richblack-500 text-center">You have not enrolled in any course yet.</p>
              ) : (
                
                <div>
                  Navigation
                  <EnrolledCoursesTable enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses}/>
                </div>
              )
            }
          </div>
          
        )
      }

    </div>
  )
}

export default EnrolledCourse
