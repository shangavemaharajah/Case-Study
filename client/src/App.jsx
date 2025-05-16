import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import News from "./Pages/FeedNews/News";
import Side from "./Components/FixedSideBar/SideBar";
import RightSide from "./Components/FixedRightSide/RightSideBar";
import Profile from "./Pages/UserProfile/Profile";
import Course from "./Pages/Course/Course";
import Messages from "./Pages/Message/Message";
import Notification from "./Pages/Notification/Notification";
import SignUp from "./Pages/Autentication_Pages/SignUp";
import SignIn from "./Pages/Autentication_Pages/SignIn";
import Quiz from "./Pages/Quiz/Quiz";
import { useAuthContext } from "./Hook/UseAuthContext";
import { useEffect } from "react";
import QuizGetter from "./Pages/Quiz/QuizzGetter/QuizzGetter";
import QuizResult from "./Pages/Quiz/QuizzResult/QuizzResult";
import GetAllQuiz from "./Pages/Quiz/GetQuestionForEditable/GetQuestionForEditable";
import UpdateQuestion from "./Pages/Quiz/UpdateForUserCreateQuestion/UpdateForUserCreateQuestion";

function App() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.user) {
      console.log("User from AuthContext in navbar", user);
      console.log("User id:", user.user.id);
      console.log("User email:", user.user.email);
      console.log("User role:", user.user.role);
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  // Layout component for authenticated routes
  const AuthenticatedLayout = ({ children }) => (
    <div className="flex min-h-screen">
      <div className="w-[4%]">
        <Side user={user} />
      </div>
      <div className="flex-grow">
        {children}
      </div>
      <div className="w-[5%]">
        <RightSide />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/signUp"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signIn"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            user ? (
              <AuthenticatedLayout>
                <News />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/profile"
          element={
            user ? (
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/course"
          element={
            user ? (
              <AuthenticatedLayout>
                <Course />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/notification"
          element={
            user ? (
              <AuthenticatedLayout>
                <Notification />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/message"
          element={
            user ? (
              <AuthenticatedLayout>
                <Messages />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/quiz"
          element={
            user ? (
              <AuthenticatedLayout>
                <Quiz />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/quiz-result"
          element={
            user ? (
              <AuthenticatedLayout>
                <QuizResult />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/quizGetter"
          element={
            user ? (
              <AuthenticatedLayout>
                <QuizGetter />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/quizAllShowUser"
          element={
            user ? (
              <AuthenticatedLayout>
                <GetAllQuiz />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
        
        <Route
          path="/update-quiz/:id"
          element={
            user ? (
              <AuthenticatedLayout>
                <UpdateQuestion />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/signIn" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;