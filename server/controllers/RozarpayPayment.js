

const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const {mailSender} = require("../utils/mailSender");
const instance = require("../config/razorpay")
const Course = require("../models/course");
const User = require("../models/user");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

// create order after clicking on "BUY" button
//capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    let totalAmount = 0;
    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false, 
                    message:"Student is already Enrolled"
                });
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false, 
                message:error.message
            });
        }
    }

    // Initiating the order
    
    const options = {
        "amount": totalAmount*100,
        "currency": "INR",
        "receipt": Math.random(Date.now()).toString()
    }
    
    try{
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success:true,
            message:"Order Instantiated Succesfully",
            paymentResponse
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false, 
            message:"Could not Initiate Order"
        });
    }
}

// verifying the payment
exports.verfiyPayment = async(req,res) => {

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY )
        .update(body.toString())
        .digest("hex");
    
    if(expectedSignature === razorpay_signature) {
        //enroll karwao student ko
        await enrollStudents(courses, userId, res);
        //return res
        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(400).json({success:"false", message:"Payment Failed"});
    
}

// enrolling the students into courses and user into courses
const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({
            success:false,
            message:"Please Provide data for Courses or UserId"
        });
    }
    
    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findByIdAndUpdate(courseId,
            {$push:{studentEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({
                success:false,
                message:"Course not Found"
            });
        }

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId
            }},{new:true})
        
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName,enrolledStudent.lastName)
        )    
        
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false, 
                message:error.message
            });
        }
    }

}

// Payment success mail
exports.sendPaymentSuccessEmail = async(req, res) => {

    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false, 
            message:"Please provide all the fields"
        });
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


// create order after clicking on "BUY" button
//capture the payment and initiate the Razorpay order
// exports.createOrder = async(req,res) => {
//     try {
//         // fetch data
//         const {courseId} = req.body;
//         const {userId} = req.user.id;

//         // validation
//         if(!courseId || !userId){
//             res.json({
//                 success:false,
//                 message:"All fields are reuired, Please fill required details"
//             })
//         }

//         // validate if that course exist or not
//         const courseDetails = await Course.findById({courseId});
//         if(!courseDetails){
//             res.json({
//                 success:false,
//                 message:"Course not found"
//             })
//         }

//         // user already paid for the course or not ---------- or you can just remove the BUY button for that user
//         const uID = new mongoose.Types.ObjectId(userId);
//         const userDetails = await User.findById(uID);
//         if(userDetails.courses.includes(courseId)){
//             res.json({
//                 success:false,
//                 message:"Student already enrolled"
//             })
//         }

//         // create order 
//         const paymentResponse = await instance.orders.create({
//             amount: courseDetails.price * 100,
//             currency: "INR",
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//               courseId,
//               userId
//             }
//           })

//         //   send response
//         res.json({
//             success:true,
//             message:"Order Initiated Successfully",
//             courseName:courseDetails.courseName,
//             courseDescription:courseDetails.courseDescription,
//             thumbnail:courseDetails.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//         })
//     } catch (error) {
//         res.json({
//             success:false,
//             message:"Unable to initiate order, please try again",
//             error:error.message,
//         })
//     }
// }

// verify signature of rozarpay and server (once payment is successfull this route will be hit by rozarpay website and not our front end)
// exports.verifySignature = async(req,res) => {
//     try {
//         const webHookSecret = "123456";

//         const signature = req.headers("x-rozarpay-signature");
//         const shasum = crypto.createHmac("sha256",webHookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(signature === digest){
//             const {courseId,userId} = req.body.payload.payment.entity.notes;

//             const user = await User.findByIdAndUpdate({userId},{
//                 $push:{
//                     courses:courseId,
//                 }
//             },{new:true});

//             if(!user){
//                 res.json({
//                     success:false,
//                     message:"User not found"
//                 })
//             }

//             const course = await Course.findByIdAndUpdate({courseId},{
//                 $push:{
//                     studentEnrolled:userId,
//                 }
//             },{new:true});
            
//             if(!course){
//                 res.json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//             // send confirmation email
//             const mail = await mailSender(user.email,"Course Enrolled","Welcome to the Study Notion course");
//             // send response
//             res.json({
//                 success:true,
//                 message:"signature verified succesfully"
//             })
//         }
//     } catch (error) {
//         res.json({
//             success:false,
//             message:"Unable to verify signature, please try again",
//             error:error.message,
//         })
//     }
// }