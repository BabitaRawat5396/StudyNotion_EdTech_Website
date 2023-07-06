const { contactUsEmail } = require("../mail/templates/contactUsTemplate");
const { mailSender } = require("../utils/mailSender");
const Contact = require("../models/contact");


// contact us controller
exports.contactUs = async(req,res) =>{
  try {
    const {firstName,lastName,phoneNumber,email,message} = req.body;
    
    const contact = await Contact.create({
      firstName:firstName,
      lastName:lastName,
      email:email,
      phoneNumber:phoneNumber,
      message:message
    });

    // sending mail to the user
    await mailSender(email,
      message.split(" ").slice(0,6).join(" "),
      contactUsEmail(email, firstName, lastName, message, phoneNumber)
    );

    await mailSender("studynotion12@gmail.com",`Complaint Registered by Id: ${contact._id}`,
    `Please Look into the issue faced by the user: ${contact._id}`);

    res.status(200).json({
      success:true,
      message:"Complaint registered Successfully"
    })
  } catch (error) {
    console.log(`Error faced while registering the complaint: ${error}`);
  }
}


