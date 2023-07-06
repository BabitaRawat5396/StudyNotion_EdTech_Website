import { useEffect, useState } from "react";
import GetAvgRating from "../../../../../utils/avRating";
import RatingStars from '../../../../common/RatingStars'

const RatingAndReviews = ({course}) => {

  const [reviewCount,setReviewCount] = useState(0)

  useEffect( () => {
    const result = GetAvgRating(course?.ratingAndReviews);
    setReviewCount(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    <div className="flex items-center gap-2">
      <span>{reviewCount}</span>
      <RatingStars Review_Count={reviewCount} />
      <span className="text-yellow-100">({course?.ratingAndReviews?.length}) Ratings</span>
    </div>
  )
}

export default RatingAndReviews