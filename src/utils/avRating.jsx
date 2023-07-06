export default function GetAvgRating(ratingArr) {
  // Check if the ratingArr is empty
    if (ratingArr?.length === 0) return 0

    // Calculate the total review count by summing up all the ratings in the array
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
      acc += curr.rating
      return acc
    }, 0)
  
    // Calculate the average review count by dividing the total by the number of ratings
    const multiplier = Math.pow(10, 1)
    const avgReviewCount =
      Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
    // Return the average review count
    return avgReviewCount
  }