import { Link } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import logo from '../../assets/Logo/Logo-Full-Light.png'
import ProfileDropdown from '../core/Auth/ProfileDropDown';
import { ACCOUNT_TYPE } from '../../utils/constants';
import MobileAppearance from '../core/NavBarAppearance/Mobile/MobileAppearance';
import NavLinks from '../core/NavBarAppearance/Desktop/NavLinks';
import useWindowSize from '../../hooks/windowSize';


const NavBar = () => {

    const windowSize = useWindowSize();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    

    const [subLinks, setSubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.allCategory);

            // console.log("FETCH_CATEGORY_API_RESPONSE",result);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSublinks();
    },[] )


    

    return (
            
        <div className='flex border-b border-richblack-700 h-14 items-center justify-center'>
            <div className='flex bg-richblack-900 w-11/12 max-w-maxContent justfiy-between items-center'>
                {
                    windowSize.width > 0 && windowSize.width < 640 ? (
                        <MobileAppearance logo={logo} NavbarLinks={NavbarLinks} subLinks={subLinks}/>
                    ) : (
                        <>
                            <Link to={"/"}>
                                <img src={logo} alt="studyNotion" className=' w-32 md:w-40' loading='lazy'/>
                            </Link>
                            <NavLinks subLinks={subLinks}/>
                        </>
                    )

                }
                
                {/* Section to show whether login /signup or profile buttons for which backend will be required */}
                <div className='flex gap-x-4 items-center pl-[25%] sm:pl-0'>
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR &&
                    (
                        <Link 
                            to={"/dashboard/cart"}
                            className='text-richblack-200 text-xl relative px-2'
                        >
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute bottom-2 left-6 bg-yellow-100
                                     text-richblack-900 text-sm rounded-full w-fit h-fit px-1
                                     font-bold'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                         <Link to="/login">
                            <button className='whitespace-nowrap border border-richblack-700 bg-richblack-800 text-xs sm:text-sm md:text-base px-2 py-1 lg:px-[10px] lg:py-[6px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                         </Link>
                    )
                }
                {
                    token === null && (
                         <Link to="/signup">
                            <button className='whitespace-nowrap border border-richblack-700 bg-richblack-800 text-xs sm:text-sm md:text-base px-2 py-1 lg:px-[10px] lg:py-[6px] text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                         </Link>
                    )
                }
                {
                    token !== null && (
                        <ProfileDropdown className="text-2xl"/>
                    )
                }
                </div>
            </div>
        </div>
        
        
    )
}

export default NavBar