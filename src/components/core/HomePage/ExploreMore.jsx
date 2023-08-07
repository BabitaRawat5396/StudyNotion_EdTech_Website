import {HomePageExplore} from '../../../data/homepage-explore'
import Card from '../../../components/core/HomePage/Card'
import { useState } from 'react'

const ExploreMore = () => {

    const tabsName = [
        "Free",
        "Popular",
        "Coding",
        "Skills",
        "Career",
    ];


    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
    }

    return (
        <div className='w-full sm:w-11/12 flex flex-col items-center'>
            <div className='mt-5 flex flex-wrap rounded-full bg-richblack-800 lg:mb-64 
                    md:px-3 border-richblack-100 p-1 w-[80%] xs:w-[75%] xs-more:w-[65%] sm:w-[75%] md:w-[68%] 
                    lg:w-[53%]'>
            {
                tabsName.map((element, index) => (
                    <div
                        className={`whitespace-nowrap text-sm sm:text-base flex flex-row items-center justify-center 
                                    gap-2 ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} 
                                    rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-700
                                    hover:text-richblack-5 text-center mx-auto py-1 sm:py-2`}
                        style={{ width: `${100 / tabsName.length}%` }} // Adjust the width dynamically
                        key={index}
                        onClick={() => setMyCards(element)}
                        >
                        {element}
                    </div>
                ))
            }
            </div>

            <div 
                className=' w-11/12 xs:w-[80%] xs-more:w-[75%] sm:w-full lg:w-10/12 lg:absolute
                    lg:-bottom-[4rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                    gap-10 items-center justify-between py-10 lg:py-0'
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
        </div>
    )
}

export default ExploreMore