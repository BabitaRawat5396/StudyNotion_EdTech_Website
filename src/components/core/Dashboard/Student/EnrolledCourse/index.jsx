
import { fetchInstructorCourses } from '../../../../../services/operations/courseAPI';
import { getInstructorData } from '../../../../../services/operations/profileAPI';
import React, { useEffect, useState } from 'react';
import InstructorChart from './EnrolledCoursesTable';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='p-5 sm:p-10 flex flex-col gap-6'>
      {loading ? (
        <div className="wrap">
          <div className="loading text-base lg:text-lg lg:pl-52">
            <div className="bounceball"></div>
            <div className="text"> LOADING</div>
          </div>
        </div>
        )
      : courses && courses.length > 0 
        ? (<div className=' flex flex-col gap-8'>
            <div className='flex flex-col gap-3 '>
              <h1 className='text-3xl font-semibold text-richblack-50'>Hi {user?.firstName}</h1>
              <p className='text-sm text-richblack-600'>Let's start something new</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-8'>
              <InstructorChart  courses={instructorData}/>
                <div className='sm:w-[30%] bg-richblack-800 rounded-xl p-6 flex flex-col gap-6'>
                  <p className='text-3xl font-semibold text-yellow-400'>Statistics</p>
                  <div>
                    <p className='text-xl font-semibold text-richblack-500'>Total Courses</p>
                    <p className='text-3xl text-yellow-700'>{courses.length}</p>
                  </div>

                  <div>
                    <p className='text-xl font-semibold text-richblack-500'>Total Students</p>
                    <p className='text-3xl text-yellow-700'>{totalStudents}</p>
                  </div>

                  <div>
                    <p className='text-xl font-semibold text-richblack-500'>Total Income</p>
                    <p className='text-3xl text-yellow-700'>{totalAmount}</p>
                  </div>
                </div>
              </div>
            <div>
            {/* Render 3 courses */}
            <div className='bg-richblack-800 p-6 rounded-xl'>
              <div className='flex justify-between p-4 '>
                  <p className='text-2xl font-semibold text-richblack-400'>Your Courses</p>
                  <Link to="/dashboard/my-courses">
                      <p className='text-yellow-200'>View all</p>
                  </Link>
              </div>
              <div className='flex flex-col sm:flex-row gap-7'>
                  {
                      courses.slice(0,3).map((course,index)=> (
                          <div key={index} className='sm:w-96 flex flex-col gap-5'>
                              <img 
                                  src={course.thumbnail}
                                  alt={course.courseName}
                                  className=' h-[12rem]  sm:w-[20rem] rounded-xl aspect-square object-cover'
                              />
                              <div className=''>
                                  <p className='text-xl text-blue-500'>{course.courseName}</p>
                                  <div className='flex gap-2 text-richblack-400'>
                                      <p>{course.studentEnrolled.length} students</p>
                                      <p> | </p>
                                      <p> Rs {course.price}</p>
                                  </div>

                              </div>
                          </div>
                      ))
                  }
              </div>
            </div>  
          </div>
        </div>
        
        )
        :(<div>
            <p>You have not created any courses yet</p>
            <Link to={"/dashboard/addCourse"}>
                Create a Course
            </Link>
        </div>)}
    </div>
  )
}

export default InstructorDashboard