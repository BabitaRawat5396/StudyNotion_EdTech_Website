
import { Link } from 'react-router-dom';
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import { NavbarLinks } from '../../../../data/navbar-links';
import {GiCrossMark } from 'react-icons/gi';
import SidebarList from '../../Dashboard/SidebarLink'

const SideBarHome = ({subLinks,showSideBar,setShowSideBar}) => {
 

  return (
    <div className={`fixed flex flex-col overflow-y-auto top-0 z-10 w-[64%] left-0 min-h-screen bg-richblack-800 transition-transform duration-300 ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}>
      <GiCrossMark
        className='text-2xl ml-48 mt-5 mb-3'
        onClick={() => {
        setShowSideBar((prev) => !prev);
       }}
          />
      {
        showSideBar && 
          NavbarLinks.map((link,index) => (
            <div key={index} className='text-lg'>
              {
                index!== 1 && (
                  <SidebarList key={index} link={link} setShowSideBar={setShowSideBar}/>
                )
              }
              {
                index === 1 && (
                  <details>
                    <summary className='text-richblack-300 flex items-center gap-3 w-full px-2 md:px-5 py-2'>
                      <p>Catalog</p>
                      <IoIosArrowDropdownCircle/>
                    </summary>
                    <div>
                    {
                      subLinks.map((subLink, index) => (
                        <Link 
                          to={`/catalog/${subLink?.name.split(" ").join("-").toLowerCase()}`} 
                          key={index}
                          onClick={() => {
                            setShowSideBar((prev) => !prev);
                          }}
                          >
                          <p className='text-richblack-500 h-8 hover:text-yellow-50 hover:bg-richblack-800 hover:rounded-full p-1 px-5 scale hover:scale-105'>{subLink?.name}</p>
                        </Link>
                      ))
                    }
                    </div>
                  </details>
                )
              }
            </div>
          ))
        }
      </div>
  )
}

export default SideBarHome