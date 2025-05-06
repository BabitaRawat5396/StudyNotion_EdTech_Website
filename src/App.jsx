import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/common/Loader";

const EnrolledCourse = lazy(() =>
  import("./components/core/Dashboard/Student/EnrolledCourse")
);
const EditCourse = lazy(() =>
  import("./components/core/Dashboard/Instructor/EditCourse")
);
const AddCourses = lazy(() =>
  import("./components/core/Dashboard/Instructor/AddCourse")
);
const MyCourses = lazy(() =>
  import("./components/core/Dashboard/Instructor/MyCourses")
);
const PrivateRoute = lazy(() =>
  import("./components/core/Auth/Routes/PrivateRoute")
);
const VideoSection = lazy(() =>
  import("./components/core/ViewLecturePage/VideoSection")
);
const InstructorDashboard = lazy(() =>
  import("./components/core/Dashboard/Instructor/InstructorDashboard")
);
const OpenRoute = lazy(() => import("./components/core/Auth/Routes/OpenRoute"));
const Settings = lazy(() => import("./components/core/Dashboard/SettingPage"));
const MyProfile = lazy(() => import("./components/core/Dashboard/MyProfile"));
const Cart = lazy(() => import("./components/core/Dashboard/Student/Cart"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NavBar = lazy(() => import("./components/common/NavBar"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ViewLecture = lazy(() => import("./pages/ViewLecture"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Category = lazy(() => import("./pages/Category"));
const Contact = lazy(() => import("./pages/Contact"));
const Signup = lazy(() => import("./pages/Signup"));
const Course = lazy(() => import("./pages/Course"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Error = lazy(() => import("./pages/Error"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <ResetPassword />
              </OpenRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            element={
              <PrivateRoute>
                <ViewLecture />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="/view-course/:courseId/section/:sectionId/subsection/:subsectionId"
                element={<VideoSection />}
              />
            )}
          </Route>

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourse />}
                />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route
                  path="/dashboard/instructor"
                  element={<InstructorDashboard />}
                />
                <Route path="/dashboard/add-course" element={<AddCourses />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route
                  path="/dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          <Route path="/catalog/:categoryName" element={<Category />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
