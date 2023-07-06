const User = require("../models/user");
const OTP = require("../models/otp");
const validator = require('validator');
const generator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();


// Send OTP For Email Verification
exports.otpSend = async(req,res) => {
    try {
        const {email} = req.body;

        //Email validation
        const isEmailValid = validator.isEmail(email,{
            domain_specific_validation:true, //disallowing certain syntactically valid email addresses that are rejected by specific email providers like Gmail.
            blacklisted_chars: '!#$%', //validator will reject email addresses that include any of the characters in the specified string, but only in the name part (before the @ symbol).
        });
        //
        if(!isEmailValid){
            return res.json({
                success:false,
                message:"Enter Valid Email"
            });
        }

        //check if email already exist in DB 
        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({
                success:false,
                message:"Email already exist."
            })
        }

        // find optimized version for code 32 to 49

        // generate OTP
        var otp = generator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars: false,
        });

        var otpExist = await OTP.findOne({otp: otp});

        while(otpExist){
            otp = generator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false,
                specialChars: false,
            });
            otpExist = await OTP.findOne(otp);
        }

        // Before saving this otp middleware pre("save") will be called which will send this otp to email. once otp is send it will let otp be saved in DB. 

        //store otp in DB
        await OTP.create({email: email,otp:otp});

        res.status(200).json({
            success:true,
            message:"OTP generated successfully",
            otp
        });
    } catch (error) {
        console.log(`${error} ERROR has occured`);
        return res.status(500).json({ 
            success: false, 
            message:"Error while sending otp",
            error: error.message 
        });

    }
}

// Signup Controller for Registering USers
exports.signup = async(req,res) => {
    try {

		// Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;
        
        //check if all the Details are present
        if(
            !firstName && 
            !lastName && 
            !email && 
            !password && 
            !confirmPassword 
        ){
            res.json({
                success:false,
                message: "All Fields are required.",
            })
        }

        // check if pass and confirmPass matching or not
        if(confirmPassword !== password){
            return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
        }
        
        //is password strong
        const isPassStrong = validator.isStrongPassword(password,{ 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1
        }); 
        if(!isPassStrong){
            res.json({
                success:false,
                message:"Password is not strong"
            })
        }
        //Email validation
        const isEmailValid = validator.isEmail(email,{
            domain_specific_validation:true, //disallowing certain syntactically valid email addresses that are rejected by specific email providers like Gmail.
            blacklisted_chars: '!#$%', //validator will reject email addresses that include any of the characters in the specified string, but only in the name part (before the @ symbol).
        });

        if(!isEmailValid){
            return res.json({
                success:false,
                message:"Email address is not valid"
            });
        }

        // if email already exists in the database
        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({
                success:false,
                message: "User already exists. Please sign in to continue.",
            })
        }
        
        // check if otp send in req body by client is equal to recent otp of that user
        // searches for the OTP document(s) with a specific email, sorts them based on the createdAt field in descending order, and limits the result to only the most recent document.
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        //check if otp present
        if(!recentOtp){
            res.json({
                success:false,
                message:"OTP not found"
            })
        }
        // compare the otp and recentOtp
        if(otp !== recentOtp[0].otp){
            res.json({
                success:false,
                message:"Invalid OTP"
            })
        }

        //Encrypt password

        // 1. generating salt 
        const salt = await bcrypt.genSalt(10)
                                .catch((error) => {
                                    res.json({
                                        success:false,
                                        message:"Error occured while generating salt"
                                    })
                                });
        // 2. hashing the password
        const hash = await bcrypt.hash(password,salt)
                                .catch((error) => {
                                    res.json({
                                        success:false,
                                        message:"Error occured while generating salt"
                                    })
                                })
        
        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        //creating default values for the user in the profile document
        const profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });
        
        //creating entry for the user in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hash,
            accountType,
			approved: approved,
            additionalDetails:profile._id,
            imageUrl:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });
        
        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
    
    } catch (error) {
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
            error:error.message,
		});
    } 
}

// Login controller for authenticating users
exports.login = async(req,res) => {
    try {
        // Fetch data
        const {email,password} = req.body;

        // Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

        
        //Email validation
        const isEmailValid = validator.isEmail(email,{
            domain_specific_validation:true, //disallowing certain syntactically valid email addresses that are rejected by specific email providers like Gmail.
            blacklisted_chars: '!#$%', //validator will reject email addresses that include any of the characters in the specified string, but only in the name part (before the @ symbol).
        });

        if(!isEmailValid){
            return res.json({
                success:false,
                message:"Email address is not valid"
            });
        }

        //check if email does not exist
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
			// Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success:false,
                message:"email Does not exist sign in first"
            })
        }

        //check if password is correct
        if(await bcrypt.compare(password,user.password)){

            const payload = {
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_KEY_SECRET,{
                expiresIn:"24h"
            });

            if(!token){
                res.json({
                    success:false,
                    message:"Unable to generate token, Please try again."
                })
            }

			// Save token to user document in database
            user.token = token;
            user.password = undefined;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), //expiration for 3 days
                httpOnly:true,
            }
            
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in succesfully"
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Password incorrect"
            })
        }
    } catch (error) {
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
            error:error.message
		});
    }
}

// Controller for Changing Password
exports.changePassword = async(req,res) => {
    try {
        // Get old password, new password, and confirm new password from req.body
		const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);
        //check if user exist
        if(!user){
            res.json({
                success:false,
                message:"User not found while changing the password"
            });
        }

        //check if password is correct
        const verifyPass = await bcrypt.compare(currentPassword,user.password);
        if(!verifyPass){
            res.status(401).json({
                success:false,
                message:"Incorrect Password"
            });
        }
        
        // Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

        // encrypt the new password
        const encryptedPass = await bcrypt.hash(newPassword,10);
        if(!encryptedPass){
            res.json({
                success:false,
                message:"Error while hashing the password"
            })
        }

        // change the current pass
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{password:encryptedPass},{new:true});

        // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUser.email,
                "Password for your account has been updated",
				passwordUpdated(
					updatedUser.email,
					`Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
				)
			);

		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
        // Return success response
		return res
            .status(200)
            .json({
                success:true,
                message:"Password Changed Succesfully",
            })
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }    
}