const Course = require("../models/course");
const Section = require("../models/section");

// create Section API
exports.createSection = async(req,res) => {
    try {
        // fetch data 
        const {sectionName,courseId} = req.body;

        // Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

        // create section
        const savedSection = await Section.create({name:sectionName});

        // update created section in course schema
        const courseUpdated = await Course.findByIdAndUpdate(courseId,{
                            $push:{
                                courseContent: savedSection._id
                            }
                        },
                        {new:true}
                    ).populate({
                        path: "courseContent",
                        populate: {
                            path: "subsection",
                        },
                    })
                    .exec();

        // send response
        res.status(200).json({
            success:true,
            message:"Section created Succesfully",
            course:courseUpdated,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to create Section, Please try again",
            error:error.message
        })
    }
}

// updateSection API
exports.updateSection = async(req,res) => {
    try {
        // Fetch data
        const {sectionName,sectionId,courseId} = req.body;

        // validate data
        if(!sectionName || !sectionId){
            res.json({
                success:false,
                message:"All fields are required"
            });
        }

        // update section name
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{name:sectionName},{new:true});

        if(!updatedSection){
            res.json({
                sucess:false,
                message:"No section found",
            })
        }

        const updatedCourse = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
            path: 'subsection',
            },
        });

        res.json({
            success:true,
            updatedCourse,
            message:"Section updated Successfully",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to update Section, Please try again",
            error:error.message
        })
    }
}

// deleteSection API
exports.deleteSection = async(req,res) => {
    try {
        // Fetch data-----assuming we are sending id in request params
        const {sectionId,courseId} = req.body;

        // update section name
        await Section.findByIdAndDelete(sectionId);

        // delete this section id from course too
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId
            }
        }).populate({
            path: 'courseContent',
            populate: {
            path: 'subsection',
            },
        })

        if(!updatedCourse){
            res.json({
                success:false,
                message:"No Course found",
            })
        }
        // populate
        res.status(200).json({
            success:true,
            message:"Section deleted Successfully",
            updatedCourse
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to delete Section, Please try again",
            error:error.message
        })
    }
}