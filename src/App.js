
import EnrolledCourse from "./components/core/Dashboard/Student/EnrolledCourse";
import EditCourse from "./components/core/Dashboard/Instructor/EditCourse";
import AddCourses from "./components/core/Dashboard/Instructor/AddCourse";
import MyCourses from "./components/core/Dashboard/Instructor/MyCourses";
import PrivateRoute from "./components/core/Auth/Routes/PrivateRoute";
import OpenRoute from "./components/core/Auth/Routes/OpenRoute";
import Settings from "./components/core/Dashboard/SettingPage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Cart from "./components/core/Dashboard/Student/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NavBar from "./components/common/NavBar";
import {Route, Routes} from "react-router-dom";
import {ACCOUNT_TYPE} from "./utils/constants";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import {useSelector} from "react-redux";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Course from "./pages/Course";
import Login from "./pages/Login";
import About from "./pages/About";
import Error from "./pages/Error";
import Home from "./pages/Home";
import "./App.css";
import ViewLecture from "./pages/ViewLecture";
import VideoSection from "./components/core/ViewLecturePage/VideoSection";
import InstructorDashboard from "./components/core/Dashboard/Instructor/InstructorDashboard";



function App() {
  
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route 
          path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }  
        />
        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }  
        />
        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }  
        />
        <Route 
          path="/forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }  
        />
        <Route 
          path="/update-password/:id" 
          element={
            <OpenRoute>
              <ResetPassword/>
            </OpenRoute>
          }  
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={ <Contact/>}/>

        <Route 
          element={
            <PrivateRoute>
              <ViewLecture/>
            </PrivateRoute>
          }
        >
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="/view-course/:courseId/section/:sectionId/subsection/:subsectionId" element={<VideoSection/>}/>
          )
        }
        </Route>
        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          <Route path="dashboard/settings" element={<Settings/>} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart/>}/>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourse/>}/>

              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
            (
              <>
                <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
                <Route path="/dashboard/add-course" element={<AddCourses/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
              </>
            )
          }
        </Route>
        <Route path="/catalog/:categoryName" element={<Category/>}/>
        <Route path="/courses/:courseId" element={<Course/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
