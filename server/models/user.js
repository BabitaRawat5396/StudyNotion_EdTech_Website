const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true, // any leading or trailing whitespace characters are removed
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            enum:["Admin","Student","Instructor"],
            required:true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        token:{
            type:String,
        },
        resetPasswordExpires:{
            type:Date,
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Profile",
        },
        courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Course",
            }
        ],
        imageUrl:{
            type:String,
            required:true,
        },
        courseProgress:[
            {
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"CourseProgress",
            }
        ],
		// Add timestamps for when the document is created and last modified
    },
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User",userSchema);