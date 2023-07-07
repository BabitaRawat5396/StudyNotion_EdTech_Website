import { Link, matchPath, useLocation } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import ProfileDropdown from '../core/Auth/ProfileDropDown';
import {IoIosArrowDropdownCircle}  from 'react-icons/io';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { ACCOUNT_TYPE } from '../../utils/constants';
import {NavbarLinks} from '../../data/navbar-links';
import { categories } from '../../services/apis';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const NavBar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const [showDropDown,setShowDropDown] = useState(false);
    const location = useLocation();
    

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

    const matchRoute = (route) => {
        return matchPath(route,location.pathname);
    }

    return (
        <div className='flex border-b border-richblack-700 h-14 items-center justify-center'>
            <div className='flex bg-richblack-900 w-11/12 max-w-maxContent justfiy-between items-center'>
                <Link to={"/"}>
                    <img src={logo} alt="studyNotion" className=' w-32 md:w-40' loading='lazy'/>
                </Link>
                <ul className='flex gap-3 md:gap-7 mx-auto text-xs sm:text-sm md:text-base'>
                {
                    NavbarLinks.map( (link, index ) => (
                        <div key={index}>
                        {
                            link.title === "Catalog" ? 
                            (
                                <div className='relative group text-richblack-25'>
                                    <div className='flex cursor-pointer items-center gap-1 '
                                        onClick={() => setShowDropDown((prev) => !prev)}>
                                        <p className=''>{link.title}</p>
                                        <IoIosArrowDropdownCircle/>
                                    </div>
                                    {
                                        showDropDown &&
                                        subLinks.length>0 &&
                                        (
                                            <div className='invisible absolute translate-x-[-50%] -md:translate-x-4 lg:left-[50%] lg:translate-x-[-55%] translate-y-7  
                                                top-[50%] flex flex-col rounded-2xl bg-richblack-700 p-4 text-richblack-100
                                                opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                                                lg:w-[300px] z-10 w-[200px] text-sm md:w-[250px] md:text-base'
                                            >
                                                <div className='absolute left-[50%] top-0 translate-x-[80%]
                                                    translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-700'>
                                                </div>
                                                {
                                                    subLinks?.length ? (
                                                            subLinks.map( (subLink, index) => (
                                                                <Link 
                                                                    to={`/catalog/${subLink?.name.split(" ").join("-").toLowerCase()}`} 
                                                                    key={index} 
                                                                    onClick={() => setShowDropDown((prev) => !prev)}
                                                                    >
                                                                    <p className='h-8 hover:text-yellow-50 hover:bg-richblack-800 hover:rounded-full p-1 px-5 scale hover:scale-105'>{subLink?.name}</p>
                                                                </Link>
                                                            ) )
                                                    ) : (<div></div>)
                                                }
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            ) :
                            (
                                <Link to={link?.path}>
                                    <li className={`${matchRoute(link?.path) ? 'text-yellow-50' : 'text-richblack-25'} cursor-pointer`}>{link.title}</li>
                                </Link>
                            )
                        }
                        </div>
                    ))
                }
                </ul>
                {/* Section to show whether login /signup or profile buttons for which backend will be required */}
                <div className='flex gap-x-4 items-center'>
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
                            <button className='border border-richblack-700 bg-richblack-800 text-xs sm:text-sm md:text-base px-2 py-1 lg:px-[10px] lg:py-[6px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                         </Link>
                    )
                }
                {
                    token === null && (
                         <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 text-xs sm:text-sm md:text-base px-2 py-1 lg:px-[10px] lg:py-[6px] text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                         </Link>
                    )
                }
                {
                    token !== null && (
                        <ProfileDropdown/>
                    )
                }
                </div>
            </div>
        </div>
        
    )
}

export default NavBar