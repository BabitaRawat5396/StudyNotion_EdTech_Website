
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { fetchCategories, fetchCategoryPageDetails } from '../services/operations/courseAPI';
import CourseSlider from '../components/core/CategoryPage/CourseSlider';
import Footer from '../components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slices/courseSlice';
import CourseCard from '../components/core/CategoryPage/CourseCard';

const Category = () => {

  const [categoryCourses,setCategoryCourses] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const {loading} = useSelector((state) => state.course);
  const categoryName = useParams().categoryName;
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const options = [
    { label: "Most Popular" },
    { label: "New" },
    { label: "Trending" },
  ];

  const handleOptionClick = (index) => {
    
    setActiveIndex(index);
    // Perform any additional logic or state updates based on the selected option
  };

  // Getting categoryId 
  useEffect( () => {
    dispatch(setLoading(true));
    const getCategories = async() => {
      const result = await fetchCategories();
      const category = result.filter( (category) => category.name.toUpperCase() === categoryName.split("-").join(" ").toUpperCase());   
      setCategoryDetails(category[0]);
    }
    getCategories();
    dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[categoryName])

  // Getting Category Page Details
  useEffect( () => {
    const getCategoryCourses = async() => {
      if(categoryDetails){
        const result = await fetchCategoryPageDetails({categoryId:categoryDetails._id},dispatch);
        setCategoryCourses(result);
      }
      
    }
    getCategoryCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[categoryDetails])


  return (
    <div className='text-richblack-300'>
    {
      loading ? (
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="text"> LOADING</div>
          </div>
        </div>
      ) : (
        <div>
        {
          categoryDetails && (
            <div>
              <div className='px-14 py-8 text-sm flex flex-col gap-5 bg-richblack-800'>
                <p className='tracking-wider'> <Link to="/"  className='hover:text-yellow-100'>Home </Link>/ Catelog / <Link to={`/catalog/${categoryDetails.name}`} className='text-yellow-100'>{categoryDetails.name}</Link></p>
                <div className='flex flex-col gap-2'>
                  <p className='text-3xl text-richblack-25'>{categoryDetails.name}</p>
                  <p className='text-base'>{categoryDetails.description}</p>
                </div>
              </div>
              
              <div className='flex flex-col'>

                {/* Section one which toggle btw Most Popular, trending, new*/}
                <div className='px-14 py-8 flex flex-col gap-5'>
                  <h1 className='text-4xl text-richblue-400 px-1'>Courses to get you started</h1>
                  <div className="flex gap-5 border-b border-richblue-600 px-3">
                    {options.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`${
                          activeIndex === index ? "text-yellow-200 border-b" : "text-richblue-200"
                        } cursor-pointer`}
                      >
                        {option.label}
                      </p>
                    ))}
                  </div>
                </div>
                {
                  categoryCourses && 
                    <CourseSlider 
                      courses={activeIndex === 0 ? categoryCourses?.selectedCourses : activeIndex === 1 ? categoryCourses?.newCourses : categoryCourses?.trendingCourses}/>
                }

                {/* Section for top courses */}
                <h1 className='mx-14 px-4 pb-3 pt-8 text-4xl text-richblue-400 border-b-2 border-blue-700'>Explore More Courses</h1>
                {
                  categoryCourses && 
                    <CourseSlider courses={categoryCourses?.differentCourses}/>
                }
                
                {/* Section for frequently bought */}
                <h1 className='mx-14 px-4 pb-3 pt-8 text-4xl text-richblue-400 border-b-2 border-blue-700'>Frequently Bought Together</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-16 gap-8'>
                {
                  categoryCourses?.mostSellingCourses?.slice(0,6).map((course, index) => (
                    <CourseCard course={course} key={index} customStyle={"lg:h-96 lg:w-[23rem]"}/>
                  ))
                }
                </div>  
              <div>
            </div>
          </div>

              
              
              <Footer/>
            </div>
          )
        }
          

        </div>
      )
    }
    </div>
  )
}

export default Category