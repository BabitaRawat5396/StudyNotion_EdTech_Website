import { Link } from "react-router-dom";
import {BsArrowRightShort} from 'react-icons/bs';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import instructor from "../assets/Images/Instructor.png"
import ReviewSection from "../components/core/HomePage/ReviewSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HeadingContent from "../components/common/HeadingContent";
import CommonButton from "../components/common/CommonButton";
import { useEffect } from "react";
import { useState } from "react";
import { getAllRatingsReview } from "../services/operations/ratingsReviewAPI";


// Home page related code will be here
const Home = () => {

  const [reviewData,setReviewData] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect( () => {
    const getReviewsRating = async() => {
      const res = await getAllRatingsReview();
      setReviewData(res);
    }
    getReviewsRating();
  },[]);
  useEffect(() => {
    // Function to update window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Event listener for window resize
    window.addEventListener('resize', updateWindowSize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);
  return (
    <>
      {/* Section1 */}
      <div className="relative mx-auto flex flex-col gap-8 items-center h-1/4 py-14 px-4 sm:px-20 bg-richblack-900"> 
        
        {/* Video Section */}
        <div className="flex flex-col w-11/12 gap-8 justify-center md:items-center ">          
          <Link to={"/signup"} className="group transition-all duration-200 hover:scale-95">
            <button className="shadow-inset-white flex gap-2 p-[4px] not-italic text-base leading-6 text-center 
                justify-center font-medium w-[235px] h-[44px] rounded-[500px] items-center bg-richblack-800
              text-richblack-200 transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <BsArrowRightShort/>
            </button>
          </Link>
          <HeadingContent
            styleHeadingContent="flex-col justify-center items-center"
            heading={
              {
                style:"text-richblack-5 md:text-center",
                content:["Empower Your Future with"]
              }
            }
            body={
              {
                style:"text-richblack-300 md:text-center lg:w-9/12",
                content:"With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
              }
            }
            highlighttext=" Coding Skills"
          />
          <div className="flex gap-6">
            <CommonButton
              linkto={"/signup"}
              customStyle={"bg-yellow-50 text-richblack-900"}
              icon={"MdArrowForward"}
            >
              Learn More
            </CommonButton>
            <CommonButton 
              linkto={"/login"}
              customStyle={"bg-richblack-800 text-richblack-5"}
            >
              Book a Demo
            </CommonButton>
          </div>
          <div className="relative z-20 mt-6 lg:w-9/12 ">
            <div className="absolute left-5 z-[-1] shadow-richblue-800 shadow-top-left rounded-full h-full w-full"></div>
            <div className="absolute z-10 shadow-richblack-5 shadow-bottom-right1 h-full w-full "></div>
            <video 
              muted
              autoPlay
              loop
            >
              <source src={Banner} type="video/mp4"/>
            </video>
          </div>
        </div>

        {/* Animated Codeblocks Section */}
        <div className="flex flex-col w-11/12 gap-40 mt-16 lg:mt-28 mb-24 ">
          <CodeBlocks
            styleHeadingContent="flex-col lg:w-4/5"
            styleCodeBlocks="lg:flex-row"
            highlighttext=" coding potential"
            heading={
              {
                style:"text-richblack-5 text-3xl",
                content:["Unlock your"," with our online courses."]
              }
            }
            subsection={
              {
                style:"text-richblack-300",
                content:["Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."]
              }
            }
            button1={
              {
                content:"Try it Yourself",
                linkto:"/signup",
                style:"bg-yellow-50 text-richblack-900",
                icon:"MdArrowForward"
              }
            }
            button2={
              {
                content:"Learn More",
                linkto:"/login",
                style:" bg-richblack-800 text-richblack-5"
              }    
            }
            codeblocks={
              ` <!DOCTYPE html>
                <html>
                <head>
                  <title>Example</title>
                  <link rel="stylesheet" href="styles.css"/>
                </head>
                  <body>
                    <h1><a href="/">Header</a></h1>
                    <nav><ahref="one">One</a><ahref="two">Two</a><ahref="three">Three</a></nav>
                  </body>
                </html>
              `
            }
            codeColor="text-pink-600"
            backColor="bg-gradient-to-r from-[#8A2BE2E6] via-[#FFA500E6] to-[#F8F8FFE6]"
            right="13.5rem"
            bottom="8.5rem"
          />
          <CodeBlocks
            styleHeadingContent="flex-col"
            styleCodeBlocks="lg:flex-row-reverse lg:gap-28"
            highlighttext=" coding in seconds"
            heading={
              {
                style:"lg:w-52 text-richblack-5",
                content:["Start"]
              }
            }
            subsection={
              {
                style:"text-richblack-300 w-5/6",
                content:["Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."]
              }
            }
            button1={
              {
                content:"Continue Lesson",
                linkto:"/signup",
                style:"bg-yellow-50 text-richblack-900",
                icon:"MdArrowForward"
              }
            }
            button2={
              {
                content:"Learn More",
                linkto:"/login",
                style:" bg-richblack-800 text-richblack-5"
              }
            }
            codeblocks={
              ` <!DOCTYPE html>
                <html>
                <head>
                  <title>Example</title>
                  <link rel="stylesheet" href="styles.css"/>
                </head>
                  <body>
                    <h1><a href="/">Header</a></h1>
                    <nav><ahref="one">One</a><ahref="two">Two</a><ahref="three">Three</a></nav>
                  </body>
                </html>
              `
            }
            codeColor="text-caribbeangreen-600"
            backColor="bg-gradient-to-r from-[#1FA2FFE6] via-[#12D8FAE6] to-[#A6FFCBE6]"
            right="12rem"
            bottom="7rem"
          />
        </div>

        {/* Explore cards slide Section */}
        <div className="flex flex-col w-11/12 gap-4 lg:gap-8 items-center">
          <HeadingContent
            styleHeadingContent="flex-col items-center lg:w-7/12 md:w-9/12"
            heading={
              {
                style:"text-richblack-5 md:text-center",
                content:["Unlock the"]
              }
            }
            body={
              {
                style:"text-richblack-300 md:text-center",
                content:"Learn to Build Anything You Can Imagine"
              }
            }
            highlighttext=" Power of Code"
          />
          <ExploreMore/>
        </div>

      </div>

      {/* Section2 */}
      <div className=" bg-pure-greys-5 text-richblack-700 h-1/4 flex flex-col gap-20 items-center">
        
        {/* rombus frame Section*/}
        <div className="homepage_bg h-80 w-full"> 
          <div className="flex gap-6 py-32 mx-auto justify-center items-center">
            <CommonButton
              customStyle={"bg-yellow-50 text-richblack-900"}
              icon={"MdArrowForward"}
            >
              Explore Full Catalog
            </CommonButton>
            <CommonButton
              customStyle={"bg-richblack-800 text-richblack-5"}
            >
              Learn More
            </CommonButton>
          </div>
        </div>
          

        <div className="lg:max-w-max-content w-8/12 md:px-20 md:w-11/12 flex flex-col">
          <div>
            <HeadingContent
              styleHeadingContent="flex flex-col lg:flex-row mb-10 md:mb-4"
              heading={
                {
                  style:"text-richblack-900 w-[90%]",
                  content:["Get the skills you need for a "]
                }
              }
              body={
                {
                  style:"text-richblack-700",
                  content:"The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills."
                }
              }
              highlighttext="job that is in demand."
            />
            <div className="flex lg:justify-center lg:ml-[10.5rem]">
              <CommonButton
                customStyle={"bg-richblack-800 text-richblack-5"}
              >
                Learn More
              </CommonButton>
            </div>
          </div>
                       
          <TimelineSection/>
          <LearningLanguageSection/>
          <div className="flex flex-col items-center lg:my-10 mb-20">
            <CommonButton
              customStyle={"bg-richblack-800 text-richblack-5"}
            >
              Learn More
            </CommonButton>
          </div>
        </div>
      </div>

      {/* Section3 */}
      <div className="bg-richblack-900 h-1/4 mx-auto flex flex-col gap-20 justify-center items-center">
        <div className="flex flex-col lg:flex-row w-11/12 gap-20 justify-center items-center mt-20 lg:my-32 p-10">
          <div className="relative w-full h-full z-[2]">
            <img src={instructor} alt="instructor"/>
            <div className="absolute -left-4 bottom-4 z-[-1] bg-richblack-5 h-full w-full"></div>
          </div>
          <div className="flex flex-col gap-12">
            <HeadingContent
              styleHeadingContent="flex-col"
              heading={
                {
                  style:"text-richblack-5 w-52",
                  content:["Become an"]
                }
              }
              body={
                {
                  style:"text-richblack-300 w-[100%]",
                  content:"Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love."
                }
              }
              highlighttext=" instructor"
            />
            <CommonButton
              linkto={"/signup"}
              customStyle = {"bg-yellow-50 text-richblack-900"}
            >
              Start Teaching Today
            </CommonButton>
          </div>
        </div>
      </div>
      <ReviewSection reviewData={reviewData} windowSize={windowSize}/>
      {/* Section4 */}
      <Footer/>
    </>
  )
}

export default Home;