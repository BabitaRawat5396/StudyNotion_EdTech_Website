import { fetchInstructorCourses } from "../../../../../services/operations/courseAPI";
import { useNavigate, Link } from "react-router-dom";
import {MdAddCircleOutline} from 'react-icons/md';
import IconBtn from "../../../../common/IconBtn";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import CourseTable from "./CourseTable";

export default function MyCourses() {
  
  const {loading} = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-6">
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
          {/* Navigation section */}
          <div className='flex justify-between border-b border-blue-500 mx-3 pt-5 pb-3'>
            <div className='flex flex-col gap-4'>
              <div className='relative bottom-7 right-4 text-sm text-richblack-300'>
                <Link to='/'><span>Home /</span></Link>
                <span> Dashboard /</span>
                <Link to='/dashboard/my-courses'><span className=' text-yellow-100'> Courses</span></Link>
              </div>
              <h1 className=' text-3xl px-4 text-blue-600 font-semibold '>My Course</h1>
            </div>
            <IconBtn
              text='New'
              customClasses='m-4 flex-row-reverse relative top-3'
              onclick={() => navigate("/dashboard/add-course")}
            >
              <MdAddCircleOutline/>
            </IconBtn>
          </div>
          {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
        </div>
      )
    }
    </div>
  )
}