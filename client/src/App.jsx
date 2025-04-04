import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const { user } = useAuthContext();

  
  useEffect(() => {
    if (user && user.user) {
      console.log("User from AuthContext in navbar", user);
      console.log("User id:", user.user.id);
      console.log("User email:", user.user.email);
      console.log("User role:", user.user.role);
    } else {
      console.log("User is null or undefined");
    }
  }, [user])

  console.log("user from app.js",user)

  return (
    <Router>
      <Routes>
        {/* If user exists, go to News, else go to SignUp */}
        <Route path="/signUp" element={user ? <Navigate to="/" /> : <SignUp />} />
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        
        {/* If user exists, go to News, else go to SignIn */}
        <Route path="/signIn" element={user ? <Navigate to="/" /> : <SignIn />} />
        {/* <Route path="/signIn" element={<SignIn />} /> */}

        {/* Protect all other routes - redirect to SignIn if no user */}
        <Route
          path="/*"
          element={
            user ? (
              <div className="flex">
                <Side user={user} />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<News />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/message" element={<Messages />} />
                    <Route path="/quiz" element={<Quiz />} />
                  </Routes>
                </div>
                <RightSide />
              </div>
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
