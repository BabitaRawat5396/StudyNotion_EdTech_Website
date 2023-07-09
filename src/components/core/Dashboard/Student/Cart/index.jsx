import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from "./RenderTotalAmount";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import EmptyCart from './EmptyCart';


export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);

    return (
        <div className=" text-richblack-100 flex flex-col gap-8 sm:pl-8 h-full">
            <p className=" text-sm text-richblack-300 mt-6"> <Link to='/'>Home</Link>  / Dashboard  / <span className=" text-yellow-100">Wishlist</span></p>
            {total > 0 
            ? (
                <div className='flex flex-col gap-10'>
                    <h1 className=" text-3xl text-richblack-50"> My Wishlist</h1>
                    <p className=" text-lg text-richblack-500 border-b-[1px] border-b-richblack-500 mr-8">{totalItems} Courses in Cart</p>
                    <div className='flex flex-col lg:flex-row gap-10'>
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                    
                </div>
            )
            : (<EmptyCart/>)}
        </div>
    )
}