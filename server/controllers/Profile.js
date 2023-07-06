
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/courseProgress");
const fileUpload = require( "../utils/fileUploader");
const Profile = require("../models/profile");
const Course = require("../models/course");
const User = require("../models/user");


// updateProfile
exports.updateProfile = async(req,res) => {
    try {
        // fetch data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get user ID
        const userId = req.user.id;

        // get user 
        const user = await User.findById(userId);
        // get profile id
        const profile_id = user.additionalDetails;
        
        // update profile
        const updatedProfile = await Profile.findByIdAndUpdate(profile_id,{
            gender:gender,
            dateOfBirth:dateOfBirth,
            about:about,
            contactNumber:contactNumber,
          },
          {new:true}
        );
        
        // send response
        res.json({
            success:true,
            message:"profile updated successfully",
            updatedProfile
        });
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:"Unable to update profile, Please try again",
            error:error.message
        })
    }
}

// deleteProfile
exports.deleteProfile = async(req,res) => {
    try {
        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
        // fetch data
        const userId = req.user.id;
        
        // get user 
        const user = await User.findById(userId);   
        if(!user){
            res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        // remove student enrolled id from courses

        // get profile id
        const profile_id = user.additionalDetails;
        // delete profile
        await Profile.findByIdAndDelete(profile_id);

        // delete user
        await User.findByIdAndDelete(userId);

        // send response
        res.status(200).json({
            success:true,
            message:"Profile deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:"Unable to delete profile, Please try again",
            error:error.message
        })
    }
}

// controller to get all the user details
exports.getAllUserDetails = async(req,res) => {
    try {
        // fetch data
        const userId = req.user.id;
        // fetch users
        const users = await User.findById(userId).select('-password -resetPasswordExpires').populate("additionalDetails").exec(); // excluding the password(this field won't be shown in the fetch)
        
        // send response
        res.status(200).json({
            success:true,
            message:"All users details fetched Successfully",
            users
        })

    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:"Unable to get all users profile, Please try again",
            error:error.message
        })
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;

      if(!displayPicture || !userId){
        return res.status(400).json({
          success: false,
          message: "Fields are required to Update Profile Picture"
        })
      }

      const image = await fileUpload.fileUploadToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      if(!image)
      {
        return res.status(500).send({
          success: false,
          message: `Could Not Upload the Image. Please try again.`
        })
      }      

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { imageUrl: image.secure_url },
        { new: true }
      )

      return res.status(200).send({
        success: true,
        message: `Profile Image Updated successfully`,
        data: updatedProfile,
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;

      let userDetails = await User.findOne({
        _id: userId,
      }).populate({
          path:"courseProgress",
          path:"courses",
          populate:{
            path:"courseContent",
            populate:{
              path:"subsection"
            }
          }
        })
        .exec()
        
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          
          SubsectionLength += userDetails.courses[i].courseContent[j].subsection.length
        }
        let courseProgressCount = await CourseProgress.findOne({courseId: userDetails.courses[i]._id});

        courseProgressCount = courseProgressCount?.completedVideos.length
        

        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage = parseInt(Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier);
        }
      }
        
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      
      return res.status(200).json({
        success: true,
        message:"Successfully fetched enrolled courses",
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.deleteEnrolledCourse = async(req,res) => {
  try {
      const {courseId} = req.body;
      const userId = req.user.id;

      if(!courseId || !userId){
          return res.status(404).json({
              success:false,
              message:"fields are required"
          })
      }
      
      // Removing course from student's course List
      const enrolledCourses = await User.findByIdAndUpdate(userId,{
          $pull:{courses:courseId}
      },{new:true});

      if(!enrolledCourses){
          return res.status(404).json({
              success:false,
              message:"User Not Found"
          })
      }

      // Removing user from course
      const course = await Course.findByIdAndUpdate(courseId,{
          $pull:{studentEnrolled:userId}
      });

      if(!course){
          return res.status(404).json({
              success:false,
              message:"Course Not Found"
          })
      }

      return res.status(200).json({
          success:true,
          message:"Enrolled course deleted sucessfully"
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


exports.updateCourseProgress = async(req,res) => {
  try {
    
    const {courseId,subsectionId} = req.body;
    const userId = req.user.id;

    if(!userId){
      res.status(404).json({
          success:false,
          message:"All fields are required"
      })
    }
    

    const course_progress = await CourseProgress.findOne({ courseId: courseId });
    let updatedProgress;
    if (!course_progress) {
      updatedProgress = await CourseProgress.create({
        courseId: courseId,
        completedVideos: [subsectionId] // Initialize the array with the new video ID
      });
    } else {
      updatedProgress = await CourseProgress.findOneAndUpdate({ courseId: courseId },
        { $push: { completedVideos: subsectionId } },{new:true}
      );
    }
    
    // update Course Progress in user model
    const user = await User.findByIdAndUpdate(userId,{
      $push:{courseProgress:updatedProgress._id}
    });   
    if(!user){
        res.status(404).json({
            success:false,
            message:"user not found"
        })
    }


    return res.status(200).json({
      success:true,
      message:"courseProgress updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      sucess:false,
      message:"Unable to update course progress, Please try again",
      error:error.message
  })
  }
}


exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}