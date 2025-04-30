// Instantiating express app
const express = require("express");
const app = express();

// Importing Routes
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const contactRoutes = require("./routes/Contact");

// Necessary Connections
const cloudinary = require("./config/cloudinary");
const database = require("./config/database");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// loading global variables in process
dotenv.config();

const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Cloudinary connect
cloudinary.cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// using cors middleware for cross origin resource sharing between server port and frontend port
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://localhost:5174",
//     ],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://studynotion-edtech-website.vercel.app",
    credentials: true,
  })
);

// middleware for uploading using temp file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Activating the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
