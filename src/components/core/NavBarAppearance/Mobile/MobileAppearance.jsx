import { useState } from 'react';
import {HiOutlineMenu } from 'react-icons/hi';
import SideBarHome from './SideBarHome';

const MobileAppearance = ({logo,subLinks}) => {
  const [showSideBar,setShowSideBar] = useState(false);
  

  return (
    <div className='text-white w-[90%]'>
      <SideBarHome showSideBar={showSideBar} subLinks={subLinks} setShowSideBar={setShowSideBar}/>
      <div className='flex gap-3 items-center justify-between'>
        <HiOutlineMenu
          className='text-2xl flex-shrink-0'
          onClick={() => {
            setShowSideBar((prev) => !prev);
          }}
          />
        <img src={logo} alt="studyNotion" className=' w-36' loading='lazy'/>
      </div>
      
      
    </div>
  )
}

export default MobileAppearance