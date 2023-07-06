
const Category = require("../models/category");

// controller to create category
exports.createCategory = async(req,res) => {
    try {

        // fetch data 
        const {name,description} = req.body;

        // validation
        if(!name && !description){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // category exist or not
        const category = await Category.findOne({name});
        if(category){
            res.json({
                success:false,
                message:"Category already exist"
            })
        }
        // create category and save in DB
        await Category.create({name,description});

        // send successful response
        return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to create category, Please try again",
			error:error.message,
        })
    }
}

// constroller to get all the categories defined 
exports.getAllCategories = async(req,res) => {
    try {
        const allCategory = await Category.find({});
        
        res.status(200).json({
            success:true,
            message:"all Category are fetched",
            allCategory,
        })
    } catch (error) {
      res.status(500).json({
				success: false,
				message: error.message,
				message:"Unable to get all categories"
    	})
    }
}

// controller to show all the courses of the same category and other details
exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId).populate({
			path: "courses",
			match: { status: "Published" },
			populate: [
				{
					path: "ratingAndReviews",
				},
				{
					path: "instructor",
				},
			],
		}).exec();

		// Handle the case when the category is not found
		if (!selectedCategory) {
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}


		const selectedCourses = selectedCategory.courses;

		// Making a shallow copy of the selected courses
		const newCourses = [...selectedCategory.courses];

		// Sort the copied array by date (createdAt)
		newCourses.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		const trendingCourses = selectedCourses.sort((a, b) => 
			b.studentEnrolled.length - a.studentEnrolled.length);


		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate({
			path: "courses",
			match: { status: "Published" },
			populate: [
				{
					path: "ratingAndReviews",
				},
				{
					path: "instructor",
				},
			],
		});
		
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find({}).populate({
			path: "courses",
			match: { status: "Published" },
			populate: [
				{
					path: "ratingAndReviews",
				},
				{
					path: "instructor",
				},
			],
		});
        // here category.courses will give an array and since there are multiple category the array would look like this [[category1 courses],[category2 courses],.........] instead of this we made this array flat to get all the courses
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length)
			.slice(0, 10);

		res.status(200).json({
			success:true,
			message:"fetch category page details",
			data:{
				selectedCourses: selectedCourses,
				differentCourses: differentCourses,
				mostSellingCourses: mostSellingCourses,
				newCourses:newCourses,
				trendingCourses:trendingCourses
			}
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}; 