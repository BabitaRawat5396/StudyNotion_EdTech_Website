
import {MdAccessTimeFilled} from 'react-icons/md';
import {FiMousePointer} from 'react-icons/fi'
import {BsDeviceSsd} from 'react-icons/bs';
import {TbCertificate} from 'react-icons/tb';
import { buyCourses } from '../../../services/operations/paymentAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { toast } from 'react-hot-toast';


const CourseBuyCart = ({course,duration}) => {

  const {user} = useSelector((state) => state.profile);
  const {token}= useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if(token){
      if(user.accountType !== ACCOUNT_TYPE.INSTRUCTOR){
        dispatch(addToCart(course))
      }
      else{
        toast.error("Instructor can't add courses to cart");
      }
    }else{
      navigate("/login");
    }
    
  }
  const handleBuyCourses = () => {
    if(token){
      if(user.accountType !== ACCOUNT_TYPE.INSTRUCTOR){
        buyCourses(token,[course._id],user,navigate,dispatch);
      }
      else{
        toast.error("Instructor can't buy courses");
      }
      return;
    }else{
      navigate("/login");
    }
    
  }
  
  return (
    <div className='rounded-xl bg-richblack-800 mt-8 mr-14 ml-5 flex flex-col gap-2 border border-richblack-700'>
      <img src={course?.thumbnail} alt={course?.courseName} className='rounded-xl'/>
      <p className='text-3xl p-2 px-4 text-pink-500'>₹ {course?.price}</p> 

      <div className='flex flex-col items-center gap-4'>
        <button
          onClick={handleAddToCart}
          className='text-center cursor-pointer gap-x-2 rounded-md py-2 px-7 font-semibold bg-yellow-100 text-richblack-900 w-11/12'
          >
          Add to Cart
        </button>
        <button
          onClick={handleBuyCourses}
          className='text-center cursor-pointer gap-x-2 rounded-md py-2 px-7 bg-richblack-900 text-yellow-200 w-11/12'
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          >
          Buy Now
        </button>
      </div>
      
      <div className='p-4 flex flex-col gap-2'>
        <p>This cousre includes:</p>
        <div className='px-4 flex flex-col gap-2 text-caribbeangreen-100'>
          <div className='flex gap-2 items-center'>
            <MdAccessTimeFilled/>
            <p>{duration.hours>0 && duration.hours+ "h"} {duration.minutes>0 && duration.minutes + "m"} on-demand video</p>
          </div>
          <div className='flex gap-2 items-center'>
            <FiMousePointer/>
            <p>Full Lifetime access</p> 
          </div>
          <div className='flex gap-2 items-center'>
            <BsDeviceSsd/>
            <p>Access on Mobile and TV</p> 
          </div>
          <div className='flex gap-2 items-center'>
            <TbCertificate/>
            <p>Certificate of completion</p> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseBuyCart