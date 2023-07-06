import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { buyCourses } from '../../../../../services/operations/paymentAPI';
// import { useState } from 'react';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.profile);
    const {token}= useSelector((state) => state.auth);
    // const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourses = () => {
      let courses = [];
      // setLoading(true);
      for(const course of cart){
        courses.push(course._id);
      }
      buyCourses(token,courses,user,navigate,dispatch);
      // setLoading(false);
      return;
    }
  return (
    <div className='lg:w-[30%] w-[60%] sm:w-[40%] md:w-[30%] h-fit bg-richblack-800 px-5 rounded-xl pt-4 pb-8 gap-2 flex flex-col mr-14'>
        <p>Total:</p>
        <p className='text-2xl text-yellow-100 font-bold'>Rs. {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourses}
            customClasses={"w-full justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount
