import { setShowSideBar } from '../../../../slices/sideBarSlice';
import { NavbarLinks } from '../../../../data/navbar-links';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import SidebarList from '../../Dashboard/SidebarLink';
import Sidebar from '../../Dashboard/Sidebar';
import { GiCrossMark } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const SideBarHome = ({ subLinks}) => {

  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const {showSideBar} = useSelector((state) => state.showSidebar);

  return (
    <div className={`fixed top-0 z-40 left-0 w-auto max-h-screen overflow-y-auto bg-richblack-800 transition-transform duration-300 h-full ${
      showSideBar ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <GiCrossMark
        className='text-2xl ml-48 mt-5 mb-3 mr-7'
        onClick={() => {
          dispatch(setShowSideBar(false));
        }}
      />
      {token && (
        <div className='flex gap-3 text-blue-300 mb-6 px-3'>
          <img src={user.imageUrl} alt={user.firstName} className='w-12 object-cover aspect-square rounded-full' />
          <div>
            <h1 className='text-lg font-semibold'>
              Hi, {user.firstName} {user.lastName}
            </h1>
            <p className='text-richblack-50'>Welcome back</p>
          </div>
        </div>
      )}
      {showSideBar &&
        NavbarLinks.map((link, index) => (
          <div key={index}>
            {index !== 1 && <SidebarList key={index} link={link}/>}
            {index === 1 && (
              <div>
                <div onClick={() => setShowCategories((prev) => !prev)} className='text-richblack-300 flex items-center gap-3 w-full px-2 md:px-5 py-2'>
                  <IoIosArrowDropdownCircle />
                  <p>Catalog</p>
                </div>
                {showCategories && (
                  <div>
                    {subLinks.map((subLink, index) => (
                      <Link
                        to={`/catalog/${subLink?.name.split(' ').join('-').toLowerCase()}`}
                        key={index}
                        onClick={() => {
                          setShowSideBar((prev) => !prev);
                        }}
                      >
                        <p className='text-richblack-500 h-8 hover:text-yellow-50 hover:bg-richblack-800 hover:rounded-full p-1 px-5 scale hover:scale-105'>
                          {subLink?.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      {token && <Sidebar />}
    </div>
  );
};

export default SideBarHome;
