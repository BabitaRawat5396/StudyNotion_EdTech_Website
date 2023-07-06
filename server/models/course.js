const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { 
        type: String 
    },
	courseDescription: { 
        type: String 
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
            required:true,
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
            required:true,
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Drafted", "Published"],
	},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course",courseSchema);