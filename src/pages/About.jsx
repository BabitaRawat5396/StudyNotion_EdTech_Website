import HeadingContent from "../components/common/HeadingContent"
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import CommonButton from "../components/common/CommonButton";
import {aboutUsCard} from '../data/about-us-card'
import MessageForm from "../components/core/AboutPage/MessageForm";
import Footer from "../components/common/Footer";
import aboutVideo from '../assets/Videos/aboutVideo.mp4'
import ImageContent from "../components/core/AboutPage/ImageContent";


const AboutUs = () => {
    
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        {/* Section1 */}
        <div className=' w-full h-1/4 bg-richblack-900 mx-auto flex flex-col gap-8 items-center'>

            {/* Video display */}
            <div className="container md:pb-60">

                <section>
                    <div className="video">
                        <video src={aboutVideo} muted autoPlay loop className="video"></video>
                    </div>
                    <div className="stuff lg:h-[30rem]" data-type="content">
                        <div className="relative text-center text-richblue-600">
                            <FaQuoteLeft className="absolute -left-2 lg:-left-7 lg:-top-2 text-base lg:text-2xl"/>
                            <p className=" lg:text-4xl font-semibold ">
                                We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.
                            </p>
                            <FaQuoteRight className="absolute bottom-1 right-20 lg:right-[6.4rem] lg:bottom-3 text-base lg:text-2xl"/>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col w-8/12 md:11/12 lg:w-11/12 gap-16 justify-center md:items-center py-20 lg:py-20">
                    <HeadingContent
                        styleHeadingContent="flex-col justify-center items-center"
                        heading={
                        {
                            style:"text-richblack-5 md:text-center lg:w-6/12 lg:mb-7",
                            content:["Driving Innovation in Online Education for a"]
                        }
                        }
                        body={
                        {
                            style:"text-richblack-300 md:text-center lg:w-[69%]",
                            content:"Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community."
                        }
                        }
                        highlighttext=" Brighter Future"
                    />
                </div>
            </div>
            <div className=" relative w-full bg-richblack-800 flex flex-col lg:flex-row justify-center items-center">
                <ImageContent/>
                <div className=" h-36 w-full flex items-center p-14 lg:pt-36 lg:p-28">
                    <div className=" flex flex-col lg:gap-2 w-1/4 text-center border-r border-richblack-400 lg:pr-20">
                        <h1 className="text-richblack-5 text-xl lg:text-3xl font-semibold">5K</h1>
                        <p className="text-richblack-300 text-sm lg:text-base">Active Students</p>
                    </div>
                    <div className=" flex flex-col gap-2 w-1/4 border-r border-richblack-400 pl-12 lg:pr-20 lg:pl-20">
                        <h1 className="text-richblack-5 text-xl lg:text-3xl font-semibold ">10+</h1>
                        <p className="text-richblack-300 text-sm lg:text-base">Mentors</p>
                    </div>
                    <div className=" flex flex-col gap-2 w-1/4 border-r border-richblack-400 pl-12 lg:pr-20 lg:pl-20">
                        <h1 className="text-richblack-5 text-xl lg:text-3xl font-semibold">200+</h1>
                        <p className="text-richblack-300 text-sm lg:text-base">Courses</p>
                    </div>
                    <div className=" flex flex-col gap-2 w-1/4 pl-12 lg:pl-20">
                        <h1 className="text-richblack-5 text-xl lg:text-3xl font-semibold">50+</h1>
                        <p className="text-richblack-300 text-sm lg:text-base">Awards</p>
                    </div>
                </div>
            </div>
            
        </div> 

        {/* Section2 */}
        <div className='wrapper w-full h-1/4 mx-auto flex flex-col gap-8 items-center bg-richblack-900'>

            {/* card display */}
            <div className=" relative w-11/12 grid md:grid-cols-2 md:grid-rows-2 z-[1]">
                <div className=" flex flex-col pt-20 pl-6 z-[1] gap-10">
                    <HeadingContent
                        styleHeadingContent="flex-col justify-center items-start "
                        heading={
                            {
                                style:"text-richblack-5 md:text-start lg:w-9/12 lg:mb-7",
                                content:["World-Class Learning for"]
                            }
                        }
                        body={
                            {
                                style:"text-richblack-300 md:text-start lg:w-11/12",
                                content:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide."
                            }
                        }
                        highlighttext=" Anyone, Anywhere"
                    />
                    <CommonButton
                        linkto={"/signup"}
                        customStyle={"bg-yellow-50 text-richblack-900"}
                    >
                        Learn More
                    </CommonButton>
                </div>
                <div className="md:absolute z[-1] top-28 -right-2 lg:top-20 lg:right-8 grid grid-cols-2 grid-rows-3 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
                    {
                        aboutUsCard.map( (card,index) => (
                            <div key={index} className={`${(index%2 === 1) ? "bg-richblack-700" : "bg-richblack-800"} lg:h-72 w-72 p-4 lg:p-8 ${index === 0 ? "bg-richblack-900" : ""} `}>
                            {
                                index!==0 && 
                                (
                                    <div className="flex flex-col gap-6">
                                        <h1 className="text-richblack-5 text-lg w-10/12">{card.title}</h1>
                                        <p className="text-richblack-100 text-sm w-[95%]">{card.desc}</p>
                                    </div>
                                ) 
                            }
                                
                            </div>
                        ))
                    }
                </div>
                
            </div>
        </div>

        {/* Section3 */}
        <MessageForm/>


        {/* Section4 */}
        <Footer/>
    </div>
  )
}

export default AboutUs;
