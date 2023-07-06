const express = require("express");
const router = express.Router();

const { contactUs } = require("../controllers/ContactUs");
const { auth } = require("../middlewares/auth")

router.post("/contact", auth, contactUs);

module.exports = router;

