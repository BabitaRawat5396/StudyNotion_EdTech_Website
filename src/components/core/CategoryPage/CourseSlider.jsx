// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import CourseCard from "./CourseCard";


const CourseSlider = ({courses}) => {
  
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
        courses ? (
          courses?.map( (course) => (
            course && (
                <SwiperSlide key={course._id}>
                  <CourseCard course={course} isSlider={true} customStyle={"h-[25rem] w-[20rem]"}/>
                </SwiperSlide>
              )          
          ))
        ) : (
          <div>No courses found</div>
        )
        
      }
      </Swiper>
  )
}

export default CourseSlider