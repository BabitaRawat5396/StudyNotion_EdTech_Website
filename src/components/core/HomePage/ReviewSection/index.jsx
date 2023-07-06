
import HighlightText from "../../../common/HighlightText";
import ReviewSlider from "./ReviewSlider";

const ReviewSection = ({reviewData}) => {
  
  
  return (
    <div>
      {
        reviewData && reviewData.length>0 && (
          <div className="text-richblack-25 w-full flex flex-col items-center gap-10 p-10 border-t border-richblack-700">
            <h1 className="text-4xl">
              <HighlightText 
                text="Reviews " 
                color="bg-gradient-to-r text-transparent bg-clip-text from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
              />
              from other learners
            </h1>
            <ReviewSlider reviewData={reviewData}/>
          </div>
        )
      }
    </div>
    
  )
}

export default ReviewSection