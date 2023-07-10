import { deleteEnrolledCourses, fetchEnrolledCourses } from '../../../../../services/operations/courseAPI';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {BsThreeDotsVertical, BsFillFileEarmarkCheckFill} from 'react-icons/bs';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { courseDuration } from '../../../../../utils/totalTimeDuration';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import {RiDeleteBinLine} from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrolledCoursesTable = ({enrolledCourses,setEnrolledCourses}) => {
  
  const [confirmationModal, setConfirmationModal] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const [ loading, setLoading ] = useState(false);
  const [showDots, setShowDots] = useState(-1);
  const [openDots, setOpenDots] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enrolledCourseDeletion = async(courseId) => {
    setLoading(true);
    dispatch(deleteEnrolledCourses({courseId:courseId},token));
    const result = await fetchEnrolledCourses(token);
    setEnrolledCourses(result);
    setConfirmationModal(null);
    setShowDots(false);
    setLoading(false);
  }
  const formatTimeDuration = (courseContent) => {
    const duration = courseDuration(courseContent);
    return `${duration.hours}h ${duration.minutes}m`;
  };
  

  return (
    <div className='border border-richblack-700 rounded-2xl my-10 mx-auto w-[95%] sm:w-11/12 py-3'>
      <Table>
        {/* Table heading */}
        <Thead>
          <Tr className="flex gap-x-6 rounded-t-md border-b border-b-richblack-800 px-6 py-5">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Course Name
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100" style={{ width: '13%' }}>
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Progress
            </Th>
            <Th style={{ width: '15%' }}></Th>
          </Tr>
        </Thead>

        {/* Table Content */}
        <Tbody>
        {
          enrolledCourses.map( (course,index) => (
          <Tr key={index}
            className="relative cursor-pointer flex items-center gap-x-10 border-b border-richblack-800 px-6 py-8 text-richblack-300"
            >
            {/* Course Name */}
            <Td className="flex sm:flex-col lg:flex-row items-center flex-1 gap-x-4"
              onClick={() =>  navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]._id}/subsection/${course?.courseContent[0]?.subsection[0]._id}`)}
              >
              <img src={course?.thumbnail} alt={`${course?.courseName}`} className="lg:h-[120px] lg:w-[200px] rounded-lg object-cover"/>
              <div className='flex flex-col gap-2 text-sm py-7 text-richblack-300'>
                <h1 className=' text-richblack-50 font-semibold text-xl'>{course?.courseName}</h1>
                <p>{course?.courseDescription}</p>
              </div>
            </Td>

            {/* Course Duration */}
            <Td className='lg:w-[10%]'>
              {formatTimeDuration(course?.courseContent) }
            </Td>

            {/* Course Progress */}
            <Td className='lg:w-[19%] flex flex-col gap-2'>
              <p>Progress {enrolledCourses[index].progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height='8px'
                isLabelVisible={false}
              />
            </Td>

            <Td>
              <BsThreeDotsVertical 
                className='text-2xl cursor-pointer'
                onClick={() => {
                setShowDots(index);
                setOpenDots(prev =>!prev)
                }}
              />
              {
                showDots === index && openDots && (
                  <div>
                    <div className='absolute bottom-4 right-32 sm:bottom-[14rem] sm:right-2 md:right-3 lg:right-1 lg:bottom-44 '>
                      <div className='bg-richblack-700 p-3 rounded-2xl text-sm flex flex-col gap-2'>
                        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-200 hover:scale-105 transition-all duration-200'
                         >
                          <BsFillFileEarmarkCheckFill className='text-base'/>
                          <p>Mark as Completed</p>
                        </div>
                        <div 
                          onClick={() => {
                            setConfirmationModal({
                            text1: "Do you want to remove this course?",
                            text2: "This course will be deleted from the enrolled courses list. All the data will be removed with it.",
                            btn1Text: !loading ? "Delete" : "Loading...  ",
                            btn2Text: "Cancel",
                            btn1Handler: !loading ? () => enrolledCourseDeletion(course._id) : () => {},
                            btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                          })
                          }}
                          className='flex items-center gap-2 cursor-pointer hover:text-yellow-200 hover:scale-105 transition-all duration-200'
                          >
                          <RiDeleteBinLine className='text-base'/>
                          <p>Remove</p>
                        </div>
                      </div>
                                
                      <div className='relative left-32 bottom-3 bg-richblack-700 h-5 w-5 rotate-45'></div>
                    </div>
                  </div> )}
            </Td>
          </Tr>
          ))
        }
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default EnrolledCoursesTable
