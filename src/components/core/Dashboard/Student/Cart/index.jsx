import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from "./RenderTotalAmount";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"

export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);

    return (
        <div className=" text-richblack-100 flex flex-col gap-8 ml-8">
            <p className=" text-sm text-richblack-300 mt-6"> <Link to='/'>Home</Link>  / Dashboard  / <span className=" text-yellow-100">Wishlist</span></p>
            <h1 className=" text-3xl text-richblack-50"> My Wishlist</h1>
            <p className=" text-lg text-richblack-500 border-b-[1px] border-b-richblack-500 mr-8">{totalItems} Courses in Cart</p>
            {total > 0 
            ? (<div className='flex flex-col lg:flex-row gap-10'>
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            : (<p className="lg:text-4xl text-yellow-400 text-center mt-4">Your Cart is Empty</p>)}
        </div>
    )
}