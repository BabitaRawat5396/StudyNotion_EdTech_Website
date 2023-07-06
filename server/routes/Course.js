const express = require("express");
const router = express.Router();

// Importing necessary controllers

// COURSE controllers
const { 
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse, 
  getInstructorCourses, 
  deleteCourse,
  getFullCourseDetails
} = require("../controllers/Course");

const {
  createRating,
  getAllRatingReview,
  getAllRatingsReviewsCourse,
  getAverageRating,
  getRatingReviewSpecificCourse,
  updateRating
} = require("../controllers/RatingsAndReviews");

const {createCategory,getAllCategories,categoryPageDetails} = require("../controllers/Category");
const {createSection,updateSection,deleteSection} = require("../controllers/Section");
const {createSubsection,updateSubsection,deleteSubsection} = require("../controllers/SubSection");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Update Courses
router.post("/editCourse",auth,isInstructor,updateCourse);

// DELETE 
router.delete("/deleteCourse",deleteCourse);

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubsection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// Get Details for a view Lectures
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// get Instructor courses
router.get("/getInstructorCourses", auth, getInstructorCourses);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)

// get all the categories which can be seen by any user thus middleware is not applied
router.get("/showAllCategories", getAllCategories);

// get all the page details of a catogry filtered
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

// create rating for a course
router.post("/createRating", auth, isStudent, createRating);

// updating rating for a course
router.post("/updateRating", auth, isStudent, updateRating);

// get average rating of course
router.get("/getAverageRating", getAverageRating);

// get all ratings and reviews of all the courses
router.get("/getReviews", getAllRatingReview);

// get ratings and reviws of the particular course
router.post("/getReviewsOfCourse", getAllRatingsReviewsCourse);

// get ratings and reviws of the particular course reviewed by a user
router.post("/getRatingReviewSpecificCourse", auth, getRatingReviewSpecificCourse)

// exporting the router
module.exports = router;
