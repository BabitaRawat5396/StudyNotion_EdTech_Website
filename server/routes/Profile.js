const express = require("express");
const router = express.Router();

// Importing necessary controllers
const {
  updateProfile,
  deleteProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  deleteEnrolledCourse,
  updateCourseProgress,
  instructorDashboard
} = require("../controllers/Profile");

// Importing necessary middlewares
const { auth ,isInstructor} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", auth, deleteProfile);

// Update User Account
router.put("/updateProfile", auth, updateProfile);

// Get All User Details
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);


// Delete Enrolled Courses
router.delete("/deleteEnrolledCourses", auth, deleteEnrolledCourse);

// update user's display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// update user's course progress
router.put("/updateCourseProgress", auth, updateCourseProgress);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
// exporting the router
module.exports = router;
