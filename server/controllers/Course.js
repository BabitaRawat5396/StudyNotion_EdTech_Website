const Course = require("../models/course");
const Category = require("../models/category");
const User = require("../models/user");
const {fileUploadToCloudinary} = require("../utils/fileUploader");
const mongoose = require("mongoose");
const Section = require("../models/section");
const Subsection = require("../models/subsection");

require("dotenv").config();

// New course creation
exports.createCourse = async(req,res) => {
    
    try {
        // Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

        // fetch thumbnail from cloudinary files
        const thumbnail = req.files.thumbnailImage;
        
        // Parse the instructions and tags to have string into an array of string
        instructions = JSON.parse(instructions);
        tag = JSON.parse(tag);

        // Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
        if (!status || status === undefined) {
			status = "Draft";
		}

        //Upload Image top Cloudinary
        const thumbnailImage = await fileUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
        
        // check if category is valid or not (it for if externally using postman user has entered tag that nt present) 
        const categoryDetails = await Category.findById(category);
        
        if(!categoryDetails){
            return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
        }


        // Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: req.user.id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

        // update category schema with newly created course
        await Category.findByIdAndUpdate(category,
            {
                $push:{
                    courses:newCourse._id,
                },
            },
            {new:true}
        )

        // save this course in instructor(user schema) courses details as for instructor all the courses will be shown that he/she created while in student only those will be added to course list which they have bought
        await User.findByIdAndUpdate({_id:req.user.id},
                                        {
                                            $push: {
                                                courses: newCourse._id,
                                            }
                                        },
                                        {new:true}
                                );

        // Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
    } catch (error) {
        // Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Unable to create course,Please try again",
			error: error.message,
		});
    }

}

// course updation
exports.updateCourse = async(req,res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
        return res.status(404).json({ error: "Course not found" })
        }

        if(req.files && req.files.thumbnailImage){
            // fetch thumbnail from cloudinary files
            const thumbnail = req.files.thumbnailImage;

            //Upload Image top Cloudinary
            const thumbnailImage = await fileUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

       // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updates[key])
            } else if( key === "category"){
                course[key] = new mongoose.Types.ObjectId(updates[key])
                console.log(typeof(updates[key]),updates[key]);

            }
            else {
                course[key] = updates[key]
            }
            }
        }

        //   saved the courses
        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subsection",
          },
        })
        .exec()

        return res.status(200).json({
            success:true,
            message:"Successfully updated Course details.",
            updatedCourse
        })

    } catch (error) {
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Unable to update course,Please try again",
			error: error.message,
		});
    }
}

// get Course Details using particular courseId
exports.getCourseDetails = async(req,res) => {
    try {
        // fetch data
        const {courseId} = req.body;

        // validate data
        if(!courseId){
            res.json({
                success:false,
                message:"course id not found"
            })
        }

        // get course
        // the path parameter represents the key or field name in the model that you want to populate
        const courseDetails = await Course.findById(courseId)
                                        .populate({
                                            path: 'courseContent',
                                            populate: {
                                            path: 'subsection',
                                            },
                                        })
                                        .populate("ratingAndReviews")
                                        .populate("category")
                                        .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        })
                                        .exec();
                                        
        // send response
        res.json({
            success:true,
            message:"All course details fetched successfully",
            data:courseDetails,
        })
    } catch (error) {
        res.json({
            success:false,
            message:"error occured while geting course details",
            error: error.message,
        })
    }
}

// controller for getting all the existing courses
exports.getAllCourses = async(req,res) => {
    try {
        const allCourses = await Course.find({}).populate({
                                    path: 'courseContent',
                                    populate: {
                                    path: 'subsection',
                                    model: 'Subsection',
                                    },
                                }).populate("instructor")
                                .exec();

        return res.status(200).json({
            success: true,
            message:"All Courses fetched successfully",
            allCourses,
        });
    } catch (error) {
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }
}

// Get Full Course details for Viewing Lecture
exports.getFullCourseDetails = async (req, res) => { 
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findById(courseId)
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subsection",
          },
        })
        .exec()
    
        if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
          }
    const userDetails = await User.findById(userId).populate("courseProgress");

    if(!userDetails){
        return res.status(404).json({
            success: false,
            message: "couldn't find the user",
        })
    }
    
    const courseprogress = userDetails.courseProgress.filter((courseprogress) => courseprogress.courseId.toString() === courseId)
    
    //   let courseProgressCount = await CourseProgress.findOne({
    //     courseID: courseId,
    //     userId: userId,
    //   })

      return res.status(200).json({
        success: true,
        message:"Full course details are fetched",
        data: {
          courseDetails,
          completedVideos: courseprogress[0]?.completedVideos
            ? courseprogress[0]?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

// Fetching instructor created courses API
exports.getInstructorCourses = async(req,res) => {
    try {
        // fetch instructor Id from the request body
        const instructorId = req.user.id

        // Validation for instructor Id
        if(!instructorId){
            return res.status(404).json({
                success:false,
                message:"Instructor Id is not found"
            })
        }

        // Finding all courses for instructor ID
        const instructorCourses = await Course.find({ instructor: instructorId })
        .populate({
            path:"courseContent",
            populate: {
                path:"subsection"
            }
        })
        .sort({ createdAt: -1 })
        .exec();

        // Return the instructor's courses
        return res.status(200).json({
            success: true,
            message:"Instructor Courses fetched Succefully",
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
        })
    }
}

// Course Deletion
exports.deleteCourse = async(req,res) => {
    try {
        // fetching courseId 
        const {courseId} = req.body;
        
        // validation for courseId
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Course Id is not found"
            })
        }

        // Finding the course using courseId
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not found"
            })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
        })
        }  
        
        // Deleting section subsection of that course
        const courseSections = course.courseContent;
        for( const sectionId of courseSections ){
            const section = await Section.findById(sectionId);
            if(section){
                const subsections = section.subsection;
                for(const subsectionId of subsections){
                    await Subsection.findByIdAndDelete(subsectionId);
                }
                await Section.findByIdAndDelete(sectionId);
            }
        }

         

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
    
}

