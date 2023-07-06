// Import necessary modules
const Subsection = require("../models/subsection");
const Section = require("../models/section");
const Course = require("../models/course");

const { fileUploadToCloudinary } = require("../utils/fileUploader");
require("dotenv").config();


// creating subsection
exports.createSubsection = async(req,res) => {
    try {
        // fetch data 
        const {
            courseId,
            sectionId,
            title,
            description
        } = req.body;

        // fetch video
        const video = req.files.videoFile;

        // validate data
        if(!sectionId || 
            !title || 
            !description || 
            !video
        ){
            res.status(404).json({
                success:false,
                message:"All fields are required",
            })
        }

        // upload video in cloudinary
        const uploadedVideo = await fileUploadToCloudinary(video,process.env.FOLDER_NAME);
        if(!uploadedVideo){
            res.json({
                success:false,
                message:"Unable to upload the file, Please try again"
            })
        }
        

        // create Subsection
        const subsection = await Subsection.create({
            title:title,
            description:description,
            timeDuration:`${uploadedVideo.duration}`,
            videoUrl:uploadedVideo.secure_url
        });

        if(!subsection){
            res.json({
                success:false,
                message:"Unable to create Subsection, Please try again"
            })
        }
        // update the id into section schema
        await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subsection:subsection._id,
            }
        },{new:true}).populate("subsection").exec();
        // populate

        const updatedCourse = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
            path: 'subsection',
            },
        });
        // send response
        res.status(200).json({
            success:true,
            message:"Successfully created subsection",
            updatedCourse
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to create Subsection, Please try again",
            error:error.message
        })
    }
}

// update subsection 
exports.updateSubsection = async(req,res) => {
    try {

        // fetch data
        const {subsectionId,courseId,title,description} = req.body;
        
        // Build the update object
        const updateFields = {};

        // fetch video
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await fileUploadToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            updateFields.videoUrl = uploadDetails.secure_url
            updateFields.timeDuration = `${uploadDetails.duration}`
        }
        if (title) {
            updateFields.title = title;
        }        

        if (description){
            updateFields.description = description;
        }

        // Update the subsection
        const updatedSubsection = await Subsection.findByIdAndUpdate(subsectionId,
                                        { $set: updateFields },
                                        { new: true }
                                        );
                                        

        if (!updatedSubsection) {
            // Subsection not found
                res.json({
                    success: false,
                    message: 'Subsection not found',
            });
        }
        

        const updatedCourse = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
            path: 'subsection',
            },
        });
        

        return res.status(200).json({
            success:true,
            message:"subsection updated Successfully",
            updatedCourse
        })

    } catch (error) {
        res.json({
            success:false,
            message:"Unable to update Subsection, Please try again",
            error:error.message
        })
    }
}

// delete subsection
exports.deleteSubsection = async(req,res) => {
    try {
        // fetch data
        const {subsectionId,sectionId,courseId} = req.body;

        if( !subsectionId || !sectionId || !courseId){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            })
        }
        // delete subsection id
        await Subsection.findByIdAndDelete(subsectionId);

        // update section schema by deleting  
        await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subsection:subsectionId,
            }
        },
        {new:true});
        
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subsection',
                },
            });                         
        // send response
        res.json({
            success:true,
            message:"Subsection delete successfully",
            updatedCourse
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Unable to delete Subsection, Please try again",
            error:error.message
        })
    }
}