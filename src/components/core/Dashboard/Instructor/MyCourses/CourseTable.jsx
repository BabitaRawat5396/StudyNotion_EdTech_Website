

import { deleteCourse, fetchInstructorCourses } from '../../../../../services/operations/courseAPI';
import { courseDuration, formatTime } from '../../../../../utils/totalTimeDuration';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import {MdAccessTimeFilled, MdModeEditOutline} from 'react-icons/md';
import { formattedDate } from '../../../../../utils/dateFormatter';
import { useDispatch, useSelector } from 'react-redux';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {RiDeleteBin6Line} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const CourseTable = ({courses,setCourses}) => {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const {loading} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    
    dispatch(deleteCourse({courseId:courseId}))
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null);
  }
  // useEffect( () => {
  //   const result = await fetchInstructorCourses(token,dispatch)
  //   if (result) {
  //     setCourses(result)
  //   }
  // },[courses])
  const formatTimeDuration = (courseContent) => {
    const duration = courseDuration(courseContent);
    return `${duration.hours}h ${duration.minutes}m`;
  };

  return (
    <div className='border border-richblack-700 rounded-2xl my-10'>
    {
      loading ? (
        <div className="wrap">
          <div className="loading text-base lg:text-lg lg:pl-52">
            <div className="bounceball"></div>
            <div className="text"> LOADING</div>
          </div>
        </div>
      ) : (
        <>
        <Table>
        {/* Table Heading */}
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-5">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        {/* Table body */}
        <Tbody>
            {
              courses.length > 0 ? (
                <>
                {
                  courses.map((course) => (
                    <Tr 
                      key={course._id}
                      className="flex items-center gap-x-10 border-b border-richblack-800 px-6 py-8 text-richblack-300"
                      >
                        {/* Courses */}
                        <Td className="flex items-center flex-1 gap-x-4">
                          <img 
                            src={course?.thumbnail} 
                            alt='Course thumbnail' 
                            className="h-[170px] w-[230px] rounded-lg object-cover"
                            />
                          <div className='flex flex-col gap-2 text-sm py-7 text-richblack-300'>
                            <h1 className=' text-richblack-50 font-semibold text-xl'>{course?.courseName}</h1>
                            <p>{course?.courseDescription}</p>
                            <div>
                              <span>Created: </span>
                              <span>{formattedDate(course?.createdAt)}</span> | 
                              <span> {formatTime(course?.createdAt)}</span>
                            </div>
                            <div className={`flex flex-row-reverse items-center gap-1 font-semibold rounded-xl tracking-wide
                              ${course?.status === "Published" ? "text-yellow-100 bg-richblack-700" : "bg-blue-800 text-pink-100"}
                              px-2 py-2 w-fit`}>
                              <p>{course?.status}</p>
                              {
                                course?.status === "Published" ? (
                                  <BsFillCheckCircleFill className='text-yellow-50'/>
                                ) : (
                                  <MdAccessTimeFilled className=' text-pink-100 text-base'/>
                                )
                              }
                            </div>
                          </div>
                        </Td>

                        {/* Time Duration */}
                        <Td>
                        {
                          formatTimeDuration(course?.courseContent)
                        }
                        </Td>

                        {/* Course Price */}
                        <Td className='flex items-center'>
                          ₹ {course?.price}
                        </Td>

                        {/* Actions */}
                        <Td>
                          <div className='flex gap-3 lg:text-2xl'>
                            <MdModeEditOutline 
                              onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}
                              className='text-blue-700 cursor-pointer'/>
                            <RiDeleteBin6Line
                              disabled={loading}
                              onClick={() => {
                                setConfirmationModal({
                                  text1: "Do you want to delete this course?",
                                  text2:
                                    "All the data related to this course will be deleted",
                                  btn1Text: !loading ? "Delete" : "Loading...  ",
                                  btn2Text: "Cancel",
                                  btn1Handler: !loading
                                    ? () => handleCourseDelete(course._id)
                                    : () => {},
                                  btn2Handler: !loading
                                    ? () => setConfirmationModal(null)
                                    : () => {},
                                })
                              }}
                              className='text-pink-600 cursor-pointer'/>
                          </div>
                          
                        </Td>
                    </Tr>
                  ))
                  
                }
                </>
              ) : (
                <Tr>
                  <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No courses found
                  </Td>
                </Tr>
              )
            }
            </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
      )
    }
      
    </div>
  )
}

export default CourseTable