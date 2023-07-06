
import { removeFromCart } from "../../../../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {RiDeleteBin6Line} from "react-icons/ri";
import RatingAndReviews from "./RatingAndReviews";


const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    return (
    <div className="w-[80%] flex flex-col gap-10">
    {
        cart.map((course) => (
            <div key={course._id} className="flex flex-col lg:flex-row justify-between gap-5 border-b border-richblack-800 pb-10">
                <div className="flex flex-col lg:flex-row gap-5">
                    <img src={course?.thumbnail} alt={course?.courseName} className="lg:w-[200px] rounded-xl object-cover"/>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl text-richblack-50">{course?.courseName}</p>
                        <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                        <RatingAndReviews course={course}/>
                    </div>
                </div>
                <div className="flex flex-row-reverse justify-between px-3 lg:px-0 lg:flex-col gap-2 items-center">
                    <button
                    className=" bg-richblack-800 flex items-center gap-2 rounded-lg px-3 py-2 text-pink-200"
                    onClick={() => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p className="text-lg text-yellow-200 font-semibold">Rs. {course?.price} </p>
                </div>
            </div>
        ))
    }
    </div>
  )
}

export default RenderCartCourses
