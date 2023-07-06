// creating instance of rozarpay after installing rozarpay

const Razorpay = require("razorpay");

require("dotenv").config();

var instance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_SECRET_KEY, 
});

module.exports = instance;
