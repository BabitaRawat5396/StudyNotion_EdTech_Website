import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {IoIosArrowDropdownCircle}  from 'react-icons/io'
import { NavbarLinks } from '../../../../data/navbar-links'
import { useState } from 'react'

const NavLinks = ({subLinks}) => {
  
  const [showDropDown,setShowDropDown] = useState(false);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath(route,location.pathname);
}

  return (
    <ul className='flex gap-3 md:gap-7 mx-auto text-xs sm:text-sm md:text-base'>
                {
                    NavbarLinks.map( (link, index ) => (
                        <div key={index}>
                        {
                            link.name === "Catalog" ? 
                            (
                                <div className='relative group text-richblack-25'>
                                    <div className='flex cursor-pointer items-center gap-1 '
                                        onClick={() => setShowDropDown((prev) => !prev)}>
                                        <p className=''>{link.name}</p>
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
                                    <li className={`${matchRoute(link?.path) ? 'text-yellow-50' : 'text-richblack-25'} cursor-pointer`}>{link.name}</li>
                                </Link>
                            )
                        }
                        </div>
                    ))
                }
                </ul>
  )
}

export default NavLinks