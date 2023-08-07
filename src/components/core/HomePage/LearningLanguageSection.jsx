import HeadingContent from '../../common/HeadingContent'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'


const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='flex justify-center mt-20 mb-16 gap-10 md-more:w-10/12 md:mb-28 lg:mb-14'>
            <HeadingContent
                heading={
                    {
                        style:"text-richblack-900 w-full lg:text-center",
                        content:["Your swiss knife for "]
                    }
                }
                body={
                    {
                        style:"text-richblack-900 sm:text-center ",
                        content:["Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more."]
                    }
                }
                highlighttext="learning any language"
                styleHeadingContent="flex-col"
            />
        </div>
        <div className='flex flex-col md:flex-row items-center md:mb-28'>
            <img src={knowYourProgress} alt="knowYourProgress" className='relative md:right-20 md-more:right-14 md:bottom-14 w-9/12 sm:w-8/12 md:w-[50%] md-more:w-[42%] lg:right-0 md:h-3/5 lg:w-[37%] lg:h-[33%] '/>
            <img src={compareWithOthers} alt="compareWithOthers" className=' relative bottom-14  xs:bottom-20 md:bottom-16 md:right-44 md-more:right-36 w-10/12 sm:w-9/12 md:w-[55%] md-more:w-6/12 md:h-3/5 lg:w-[42%] lg:h-[39%] lg:right-20 lg:bottom-5'/>
            <img src={planYourLessons} alt="planYourLessons" className=' relative w-10/12 bottom-36 xs:bottom-44 md:bottom-14 md:right-72 md-more:right-60 sm:w-9/12 md:w-[58%] md-more:w-[52%] lg:w-[42%] lg:h-[39%] lg:right-48 lg:bottom-10'/>
        </div>
    </div>
  )
}

export default LearningLanguageSection;