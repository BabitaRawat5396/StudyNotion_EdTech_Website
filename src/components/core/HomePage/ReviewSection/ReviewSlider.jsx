// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import ReviewCard from "./ReviewCard";


const ReviewSlider = ({reviewData}) => {
  
  return (
    <Swiper 
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween:100,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween:0,

        },
        
      }}
      slidesPerView={1}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      >
      {
        reviewData ? (
          reviewData?.map( (item,index) => (
            item && (
                <SwiperSlide key={index}>
                  <ReviewCard item={item}/>
                </SwiperSlide>
              )          
          ))
        ) : (
          <div>No Ratings and Reviews found</div>
        )
        
      }
      </Swiper>
  )
}

export default ReviewSlider