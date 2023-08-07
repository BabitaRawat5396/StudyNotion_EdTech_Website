import ReactStars from "react-rating-stars-component";

const ReviewCard = ({item,windowSize}) => {
  return (
    <div className="border border-richblack-800 rounded-2xl p-3 xs:p-5 flex flex-col gap-4 bg-richblack-800 h-[22rem] sm:h-80 xs:w-96 overflow-hidden">
      <div className="flex gap-3">
      {
        windowSize.width < 470 ? (
          <div className="flex flex-col gap-1 border-b border-richblack-700 pt-3 pb-2 mx-auto">
            <div className="flex gap-3">
              <div className="rounded-full overflow-hidden aspect-square h-8">
                <img src={item.user.imageUrl} alt={item.user.firstName} className="aspect-square object-cover" />
              </div>
              <p className="text-lg font-semibold">{item.user.firstName} {item.user.lastName}</p>
            </div>
            <p className="text-richblack-500">{item.user.email}</p>

          </div>
        ) : (
          <>
          <div className="rounded-full overflow-hidden aspect-square h-14">
            <img src={item.user.imageUrl} alt={item.user.firstName} className="aspect-square object-cover" />
          </div>
          <div className="">
            <p className="text-lg font-semibold">{item.user.firstName} {item.user.lastName}</p>
            <p className="text-richblack-500">{item.user.email}</p>
          </div>
          </>
        )
      }
        
      </div>
      <p className="text-richblack-200">{item.review.split(" ").splice(0,30).join(" ")}...</p>
      <div className="flex items-center gap-2">
        <p className="text-yellow-200 text-lg">({item.rating})</p>
        <ReactStars
          count={5}
          value={item.rating}
          size={24}
          activeColor="#ffd700"
          />
      </div>
    </div>
  )
}

export default ReviewCard