const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
        required:true,
    }
});


// Define a function to send emails
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification email from studyNotion",emailTemplate(otp));
        console.log(`mailresponse ${mailResponse}`);
    } catch (error) {
        console.log(`"${error} ERROR has occurred while sending verification email`);
        throw error;
    }
}

// pre("save") hook is a middleware function that is executed before the document is saved to the database.
otpSchema.pre("save",async function(next){
    // Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
})

module.exports = mongoose.model("OTP",otpSchema);