import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avRating";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../slices/courseSlice";


const CourseCard = ({course,customStyle,isSlider}) => {
  
  const [ratingCount,setRatingCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setLoading(true));
    if(course){
      const count = GetAvgRating(course.ratingAndReviews);
      setRatingCount(count);
    }
    dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[course])

  return (
    <div className={`${customStyle} ${ isSlider ? "" : "w-full" }` }>
    {
      course && 
      <Link  to={`/courses/${course._id}`}>
        <div className="flex flex-col gap-5">
          <img src={course?.thumbnail} alt={`${course?.courseName}`} className={`${isSlider ? "h-[25rem] md:h-[15rem] w-96" : "h-[12rem] md:h-[14rem] w-full md:w-11/12 xl:h-[13rem]"} object-fit aspect-square rounded-xl`}/>
          <div className="flex flex-col gap-2">
            <h1 className=" text-xl text-blue-300 font-semibold">{course.courseName}</h1>
            <p className="text-richblack-100 text-sm">Instructor : {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className="flex gap-2 text-yellow-50 font-medium items-center">
              <p>{ratingCount}</p>
              <RatingStars Review_Count={ratingCount} Star_Size={20}/>
              <span>({course?.ratingAndReviews?.length}) Ratings</span>
            </div>
            <p className=" text-xl text-richblack-100 font-medium">₹ {course?.price}</p>
          </div>
          
        </div>
      </Link>
      
    }
    </div>
  )
}

export default CourseCard