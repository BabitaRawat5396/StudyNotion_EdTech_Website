
import HighlightText from "../../../common/HighlightText";
import ReviewSlider from "./ReviewSlider";

const ReviewSection = ({reviewData,windowSize}) => {
  
  
  return (
    <div>
      {
        reviewData && reviewData.length>0 && (
          <div className="text-richblack-25 w-full flex flex-col items-center p-10 pt-14 border-t border-richblack-700 mt-4">
            <h1 className="text-4xl text-center">
              <HighlightText 
                text="Reviews " 
                color="bg-gradient-to-r text-transparent bg-clip-text from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
              />
              from other learners
            </h1>
            <ReviewSlider reviewData={reviewData} windowSize={windowSize}/>
          </div>
        )
      }
    </div>
    
  )
}

export default ReviewSection