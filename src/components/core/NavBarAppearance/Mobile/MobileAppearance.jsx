import { setShowSideBar } from '../../../../slices/sideBarSlice';
import {HiOutlineMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import SideBarHome from './SideBarHome';


const MobileAppearance = ({logo,subLinks}) => {
  
  const dispatch = useDispatch();

  return (
    <div className='text-white w-[90%]'>
      <SideBarHome subLinks={subLinks}/>
      <div className='flex gap-3 items-center justify-between'>
        <HiOutlineMenu
          className='text-2xl flex-shrink-0'
          onClick={() => {
            dispatch(setShowSideBar(true));
          }}
          />
        <img src={logo} alt="studyNotion" className=' w-36' loading='lazy'/>
      </div>
      
      
    </div>
  )
}

export default MobileAppearance