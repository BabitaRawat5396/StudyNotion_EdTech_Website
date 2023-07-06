import {HomePageExplore} from '../../../data/homepage-explore'
import Card from '../../../components/core/HomePage/Card'
import { useState } from 'react'

const ExploreMore = () => {

    const tabsName = [
        "Free",
        "Most popular",
        "New to coding",
        "Skills paths",
        "Career paths",
    ];


    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);


    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
    }

    return (
        <>
            <div className='mt-5 flex flex-row rounded-full bg-richblack-800 lg:mb-64
                border-richblack-100 p-1 w-fit mx-6 md:mx-14 '
            >
            {
                tabsName.map( (element, index) => {
                    return (
                        <div
                            className={` text-[0.7rem] sm:text-xs lg:text-base flex flex-row items-center gap-2 
                                ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200" } 
                                rounded-full transition-all duration-200 cursor-pointer
                                hover:bg-richblack-700 hover:text-richblack-5 px-[0.5rem] py-[0.2rem] md:px-1 md:py-2 lg:px-7 lg:py-2`}
                            key={index}
                            onClick={() => setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
            </div>
            <div 
                className='relative lg:absolute lg:-bottom-[4rem] flex flex-col lg:flex-row gap-10 items-center justify-between md:w-10/12 lg:w-[80%] p-5 md:p-0'
            >
                {
                    courses.map( (element, index) => {
                        return (
                            <Card 
                                key={index}
                                heading = {element.heading}
                                body = {element.description}
                            />
                        )
                    } )
                }
            </div> 
        </>
    )
}

export default ExploreMore