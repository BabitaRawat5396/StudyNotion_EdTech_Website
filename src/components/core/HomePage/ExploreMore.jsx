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
        <>
            <div className='mt-5 flex flex-wrap rounded-full bg-richblack-800 py-1 lg:mb-64 md:px-3 border-richblack-100 p-1 mx-6 md:mx-14 w-10/12 sm:w-[75%] md:w-[68%] lg:w-[53%]'>
            {tabsName.map((element, index) => (
                <div
                className={`whitespace-nowrap text-[0.7rem] text-base flex flex-row items-center justify-center gap-2 
                            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} 
                            rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-richblack-700 hover:text-richblack-5 text-center mx-auto py-2`}
                style={{ width: `${100 / tabsName.length}%` }} // Adjust the width dynamically
                key={index}
                onClick={() => setMyCards(element)}
                >
                {element}
                </div>
            ))}
            </div>


            <div 
                className=' w-full relative lg:absolute lg:-bottom-[4rem] flex flex-col lg:flex-row gap-10 items-center justify-between md:w-10/12 lg:w-[80%] p-5 md:p-0'
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