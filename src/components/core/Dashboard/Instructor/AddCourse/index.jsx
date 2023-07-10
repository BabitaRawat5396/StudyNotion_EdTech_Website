
import {RiArrowDropLeftLine} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import RenderSteps from './RenderSteps';
import { Link } from 'react-router-dom';

const AddCourses = () => {

    const {loading} = useSelector( (state) => state.course);
    
    
    return (
        <div className='text-richblack-100 flex flex-col w-11/12 mx-auto gap-2 py-10 h-full'>

            {/* back to dashboard*/}
            <div className='flex text-richblack-300 items-center'>
                <RiArrowDropLeftLine className='text-4xl'/>
                <Link to={'/dashboard/instructor'}>Back to Dashboard</Link>
            </div>
            {
                loading ? (
                    <div className="wrap">
                        <div className="loading text-base lg:text-lg lg:pl-60">
                            <div className="bounceball"></div>
                            <div className="text"> LOADING</div>
                        </div>
                    </div>
                ) : (
                    <div className='w-full'>
                    {/* Tips for course creation */}
                    <div className=' lg:fixed mx-auto lg:right-10 w-[22rem] h-[21.7rem] md:w-[34rem] md:h-72 border
                        border-richblack-700 bg-richblack-800 text-richblue-200 p-6 rounded-3xl flex flex-col 
                        pt-9 justify-center md:p-10 lg:p-6 lg:-6 lg:w-[22rem] lg:h-[21.7rem] '
                    >
                        <h1 className=' text-pink-600 text-lg md:text-base lg:text-lg font-semibold px-2'> Course Upload Tips ⚡</h1>
                        <ol 
                            className=' text-xs flex flex-col gap-2 p-4'
                            style={{ listStyleType: "disc" }}
                        >
                            <li>Set the Course Price option or make it free.</li>
                            <li>Standard size for the course thumbnail is 1024x576.</li>
                            <li>Video section controls the course overview video.</li>
                            <li>Course Builder is where you create & organize a course.</li>
                            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                            <li>Information from the Additional Data section shows up on the course single page.</li>
                            <li>Make Announcements to notify any important</li>
                            <li>Notes to all enrolled students at once.</li>
                        </ol>
                    </div>
                    <RenderSteps/>
                    </div>
                )
            }
        </div>
    )
}

export default AddCourses