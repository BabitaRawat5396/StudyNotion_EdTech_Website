const express = require("express");
const router = express.Router();

// Importing necessary controllers
const {capturePayment, verfiyPayment, sendPaymentSuccessEmail} = require("../controllers/RozarpayPayment");

// Importing middlewares
const { auth, isStudent} = require("../middlewares/auth");

// Creating order or capturing the payment
router.post("/capturePayment", auth, isStudent, capturePayment);

// After succesful payment verfiying the signature
router.post("/verifyPayment", auth, isStudent, verfiyPayment);

router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);


// exporting the router
module.exports = router;