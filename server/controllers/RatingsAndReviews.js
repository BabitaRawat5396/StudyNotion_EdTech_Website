
const mongoose = require("mongoose");
const Course = require("../models/course");
const Rating_Reviews = require("../models/ratingAndReviews");
const User = require("../models/user");


// create review and rating
exports.createRating = async(req,res) => {
    try {
        // fetch data
        const {rating, review,courseId} = req.body;

        const userId = req.user.id;

        // validate data
        if(!rating || !review || !userId ||!courseId){
            res.json({
                success:false,
                message:"All fields are required"
            })
        }
        // check user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId,
                                        studentEnrolled: {
                                            $elemMatch: {$eq:userId}
                                        }});
        if(!courseDetails){
            return res.json({
                success:false,
                message:"Student is not enrolled in the course, can't review the course."
            })
        }
        // check if user has already reviewed or not
        const ratingReview = await Rating_Reviews.findOne({user:userId,
                                                            course:courseId}
                                                        );
        
        if(ratingReview){
            return res.json({
                success:false,
                message:"User has already rated and reviewed the course"
            })
        }
        // create review and rating
        const rating_review = await Rating_Reviews.create({
                                    user:userId,
                                    rating:rating,
                                    review:review,
                                    course:courseId
                                });
                                
        
        // update this rating_review id in the course schema 
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
                                                                $push:{
                                                                    ratingAndReviews:rating_review._id,
                                                                }
                                                            },
                                                            {new:true}
                                                        );
                                                    
        // send response
        res.status(200).json({
            success:true,
            message:"Course rated and reviewed successfully",
            updatedCourse
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while rating and reviwing the course",
            error:error.message
        });
    }
}

exports.updateRating = async(req,res) => {
    try {
        // fetch data
        const data = req.body;
        const {courseId} = req.body;
        
        const userId = req.user.id;

        // validate data
        if(!userId ||!courseId){
            res.json({
                success:false,
                message:"All fields are required"
            })
        }

        // check user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId,
                                        studentEnrolled: {
                                            $elemMatch: {$eq:userId}
                                        }});
        if(!courseDetails){
            return res.json({
                success:false,
                message:"Student is not enrolled in the course, can't review the course."
            })
        }
        // check if user has already reviewed or not
        const ratingReview = await Rating_Reviews.findOne({user:userId,
                                                            course:courseId}
                                                        );
        
                                                                 
        for(const key in data){
            if (data.hasOwnProperty(key)){
                ratingReview[key] = data[key]
            }
        }
        const rating = await ratingReview.save();
        // create review and rating
                     
        // send response
        res.status(200).json({
            success:true,
            message:"Course rated and reviewed successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while rating and reviwing the course",
            error:error.message
        });
    }
}

exports.getRatingReviewSpecificCourse = async(req,res) => {
    try {
        const userId = req.user.id;
        const {courseId} = req.body;

        if(!userId || !courseId){
            return res.status(404).json({
                success:false,
                message:"All fields required"
            })
        }
        const courseSpecificReview = await Rating_Reviews.findOne({user:userId,course:courseId});
        
        return res.status(200).json({
            success:true,
            message:"course fetched successfully",
            courseSpecificReview
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Course Specific Rating and Review"
        })
    }
}

// get average ratings
exports.getAverageRating = async(req,res) => {
    try {
        // fetch data
        const courseId = req.body.courseId;

        // validate data
        if(!courseId){
            res.json({
                success:false,
                message:"All fields are required"
            })
        }
        // --------------------- METHOD -1 --------------
        // // get course details first
        // const courseDetails = await Course.findById(courseId).populate("ratingAndReviews");

        // // now get all the ratings respect to this course
        // const allRatingsReviews = courseDetails.ratingAndReviews;
        // if(!allRatingsReviews){
        //     res.json({
        //         success:false,
        //         message:"No reviews found on this course"
        //     })
        // }

        // if (allRatingsReviews.length > 0) {
        //     var total = 0;
        //     var average = 0;

        //     allRatingsReviews.map((data) => {
        //         total = total + data.rating
        //     });

        //     average = total / allRatingsReviews.length;
        // }

        // ------------------- METHOD - 2 -----------------
        // aggregating all the ratings and reviews based on the match of courseId then grouping in single group as custom id is not mentioned and calculating average rating
        const average = await Rating_Reviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
                
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"},
                }
            }
        ]);

        if(average.length>0){
            // send response
            res.status(200).json({
                success:true,
                message:"Successfully got average of ratings on this course",
                average:average[0].averageRating,
            })
        }
        else{
            res.status(200).json({
                success:true,
                message:"No ratings given tille now",
                averageRating:0,
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:"Error while getting average ratings"
        });
    }
}

// get All the ratings and reviews of all courses
exports.getAllRatingReview = async(req,res) => {
    try {
        const allReviews = await Rating_Reviews.find({})
                                                .sort({rating:"desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email imageUrl"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName",
                                                })
                                                .exec();
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews are fetched",
            allReviews
        })
    } catch (error) {
        
    }
}

// get All ratings for a particular course
exports.getAllRatingsReviewsCourse = async(req,res) => {
    try {
        
        // fetch data
        const {courseId} = req.body;

        // validate data
        if(!courseId){
            res.json({
                success:false,
                message:"All fields are required"
            })
        }

        // get course details first
        const courseDetails = await Course.findById(courseId).populate({
            path:"ratingAndReviews",
            populate:{
                path:"user"
            }
        });

        // now get all the ratings respect to this course
        const allRatingsReviews = courseDetails.ratingAndReviews;

        // send response
        res.json({
            success:true,
            message:"Successfully got all the ratings and reviews on this course",
            allRatingsReviews
        })

    } catch (error) {
        res.json({
            success:false,
            message:"Error while getting all ratings and reviews"
        });
    }
}