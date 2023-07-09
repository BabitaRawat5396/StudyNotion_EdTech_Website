import {RiDeleteBinLine} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/settingsAPI';

const DeleteAccount = () => {

  const {token} = useSelector( (state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAccount(token,navigate));
  }
  return (
    <div className='flex flex-col text-sm gap-7 w-11/12 sm:w-9/12'>
      <div className='flex flex-col sm:flex-row gap-5 border border-pink-700 p-4 py-6 sm:p-8 rounded-lg bg-pink-900 '>
        <div className='flex gap-3 border-b sm:border-b-0 border-pink-800 py-1 sm:py-0'>
          <p className='rounded-full bg-pink-700 h-9 w-9 sm:h-14 sm:w-14 flex items-center justify-center text-xl'><RiDeleteBinLine /></p>
          <h1 className='text-pink-5 text-lg sm:hidden '>Delete Account</h1>
        </div>
        <div className='flex flex-col gap-3 w-11/12 sm:w-9/12'>
          <h1 className='text-pink-5 text-lg hidden sm:block'>Delete Account</h1>
          <div className='text-pink-25 text-sm flex flex-col gap-1'>
            <p >Would you like to delete account?</p>
            <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
          </div>
          <p className='text-pink-300 text-base'>I want to delete my account.</p>
        </div>
      </div>
      <div className='flex items-end justify-end gap-4 px-8'>
        <button
          onClick={ () => {navigate("/dashboard/my-profile")}}
          className="cursor-pointer rounded-md bg-richblack-700 py-3 px-4 sm:px-6 font-semibold text-richblack-50"

        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded-md bg-pink-900 py-3 px-4 sm:px-6 font-semibold text-pink-400"

        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount