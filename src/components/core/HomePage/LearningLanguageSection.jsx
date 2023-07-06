import HeadingContent from '../../common/HeadingContent'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'


const LearningLanguageSection = () => {
  return (
    <>
        <div className='flex justify-center mt-20 mb-10 md:ml-20 gap-10'>
            <HeadingContent
                heading={
                    {
                        style:"text-richblack-900 ",
                        content:["Your swiss knife for "]
                    }
                }
                body={
                    {
                        style:"text-richblack-900 text-center w-[82%]",
                        content:["Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more."]
                    }
                }
                highlighttext="learning any language"
                styleHeadingContent="flex-col w-[760px]"
            />
        </div>
        <div className='flex flex-col lg:flex-row md:ml-20'>
            <img src={knowYourProgress} alt="knowYourProgress" className=' w-9/12 md:h-3/5 lg:w-[33%] lg:h-[33%] '/>
            <img src={compareWithOthers} alt="compareWithOthers" className=' relative bottom-20 w-10/12 md:9/12 md:h-3/5 lg:w-[39%] lg:h-[39%] lg:right-20 lg:bottom-5'/>
            <img src={planYourLessons} alt="planYourLessons" className=' relative w-10/12 bottom-44 lg:w-[39%] lg:h-[39%] lg:right-48 lg:bottom-10'/>

        </div>
    </>
  )
}

export default LearningLanguageSection;