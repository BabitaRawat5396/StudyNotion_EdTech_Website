import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCategories,
  fetchCategoryPageDetails,
  fetchCoursesByPrice,
} from "../services/operations/courseAPI";
import CourseSlider from "../components/core/CategoryPage/CourseSlider";
import Footer from "../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/courseSlice";
import CourseCard from "../components/core/CategoryPage/CourseCard";

const Category = () => {
  const [categoryCourses, setCategoryCourses] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const { loading } = useSelector((state) => state.course);
  const categoryName = useParams().categoryName;
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const options = [
    { label: "Most Popular" },
    { label: "New" },
    { label: "Trending" },
  ];

  const handleOptionClick = (index) => {
    setActiveIndex(index);
    // Perform any additional logic or state updates based on the selected option
  };

  // const handleFilter = async () => {
  //   // const res = await fetchCoursesByPrice(minPrice, maxPrice);
  //   // console.log("res", res);
  //   const min = parseFloat(minPrice) || 0;
  //   const max = parseFloat(maxPrice) || Infinity;

  //   const filterByPrice = (courses) =>
  //     courses.filter((course) => course.price >= min && course.price <= max);

  //   const filteredData = {
  //     selectedCourses: filterByPrice(categoryCourses.selectedCourses),
  //     newCourses: filterByPrice(categoryCourses.newCourses),
  //     trendingCourses: filterByPrice(categoryCourses.trendingCourses),
  //   };

  //   setCategoryCourses((prev) => ({
  //     ...prev,
  //     ...filteredData,
  //   }));
  // };

  // Getting categoryId
  useEffect(() => {
    dispatch(setLoading(true));
    const getCategories = async () => {
      const result = await fetchCategories();
      const category = result.filter(
        (category) =>
          category.name.toUpperCase() ===
          categoryName.split("-").join(" ").toUpperCase()
      );
      setCategoryDetails(category[0]);
    };
    getCategories();
    dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  // Getting Category Page Details
  useEffect(() => {
    const getCategoryCourses = async () => {
      if (categoryDetails) {
        const result = await fetchCategoryPageDetails(
          { categoryId: categoryDetails._id },
          dispatch
        );
        setCategoryCourses(result);
      }
    };
    getCategoryCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryDetails]);

  const handleFilter = async () => {
    const result = await fetchCategoryPageDetails(
      {
        categoryId: categoryDetails._id,
        minPrice,
        maxPrice,
      },
      dispatch
    );
    setCategoryCourses(result);
  };

  const clearFilter = async () => {
    setMinPrice("");
    setMaxPrice("");
    const result = await fetchCategoryPageDetails(
      { categoryId: categoryDetails._id },
      dispatch
    );
    setCategoryCourses(result);
  };

  return (
    <div className="text-richblack-300">
      {loading ? (
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="text"> LOADING</div>
          </div>
        </div>
      ) : (
        <div>
          {categoryDetails && (
            <div>
              <div className="px-14 py-8 text-sm flex flex-col gap-5 bg-richblack-800">
                <p className="tracking-wider">
                  {" "}
                  <Link to="/" className="hover:text-yellow-100">
                    Home{" "}
                  </Link>
                  / Catelog /{" "}
                  <Link
                    to={`/catalog/${categoryDetails.name}`}
                    className="text-yellow-100"
                  >
                    {categoryDetails.name}
                  </Link>
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl text-richblack-25">
                    {categoryDetails.name}
                  </p>
                  <p className="text-base">{categoryDetails.description}</p>
                </div>
              </div>

              <div className="flex flex-col">
                {/* filters */}
                {/* <div className="flex gap-2 p-4">
                  <input
                    type="number"
                    placholder="Min Price"
                    value={minPrice ?? ""}
                    onChange={(e) => {
                      console.log("price", e.target.value);
                      setMinPrice(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <button onClick={handleFilter}>Apply filter</button>
                  <button
                    onClick={clearFilter}
                    className="text-red-500 border px-2 rounded"
                  >
                    Clear Filter
                  </button>
                </div> */}

                {/* Section one which toggle btw Most Popular, trending, new*/}
                <div className="px-14 py-8 flex flex-col gap-5">
                  <h1 className=" text-3xl sm:text-4xl text-richblue-400 px-1">
                    Courses to get you started
                  </h1>
                  <div className="flex gap-5 border-b border-richblue-600 px-3">
                    {options.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`${
                          activeIndex === index
                            ? "text-yellow-200 border-b"
                            : "text-richblue-200"
                        } cursor-pointer`}
                      >
                        {option.label}
                      </p>
                    ))}
                  </div>
                </div>
                {categoryCourses && (
                  <CourseSlider
                    courses={
                      activeIndex === 0
                        ? categoryCourses?.selectedCourses
                        : activeIndex === 1
                        ? categoryCourses?.newCourses
                        : categoryCourses?.trendingCourses
                    }
                  />
                )}

                {/* Section for top courses */}
                <h1 className=" text-3xl sm:text-4xl mx-14 px-4 pb-3 pt-8 text-richblue-400 border-b-2 border-blue-700">
                  Explore More Courses
                </h1>
                {categoryCourses && (
                  <CourseSlider courses={categoryCourses?.differentCourses} />
                )}

                {/* Section for frequently bought */}
                <h1 className="mx-14 px-4 pb-3 pt-8 text-3xl sm:text-4xl text-start text-richblue-400 border-b-2 border-blue-700">
                  Frequently Bought Together
                </h1>
                <div className="w-full xl:w-11/12 flex flex-col justify-center items-center">
                  <div className="w-9/12 xs-more:w-7/12 sm:w-6/12 md:w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 xl:gap-32 py-10 xl:py-20">
                    {categoryCourses?.mostSellingCourses
                      ?.slice(0, 6)
                      .map((course, index) => (
                        <CourseCard
                          course={course}
                          key={index}
                          isSlider={false}
                          customStyle={" w-full lg:h-96 lg:w-[23rem]"}
                        />
                      ))}
                  </div>
                </div>
                <div></div>
              </div>

              <Footer />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
