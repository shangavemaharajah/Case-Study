import React, { useEffect } from "react";
import Logo from "../../assets/lOGO CASE.png";
import {
  FaUser,
  FaBook,
  FaBell,
  FaChalkboardTeacher ,
  FaNewspaper,
  FaClipboard,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Hook/UseAuthContext";

const navItems = [
  { icon: FaNewspaper, text: "News", path: "/" },
  { icon: FaUser, text: "Profile", path: "/profile" },
  { icon: FaBook, text: "Courses", path: "/course" },
  { icon: FaBell, text: "Notifications", path: "/notification" },
  { icon: FaChalkboardTeacher, text: "RoadMap", path: "/roadmap" },
  { icon: FaClipboard, text: "Quiz", path: "/quiz" },
];

const Side = () => {
const{user} = useAuthContext()

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

console.log("user from SideBar.js",user)


  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  console.log(user)

  return (
    <>
      {/* Left Sidebar */}
      <aside className="w-[20%] bg-white shadow-md p-6 flex flex-col justify-between rounded-lg fixed top-0 left-0 h-screen">
        {/* Logo */}
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <img src={Logo} alt="Logo" className="w-12 h-12 " />
            <h2 className="text-xl font-bold text-sky-700">Case Study</h2>
          </div>

          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="DP"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h5 className="font-semibold">{user.message}</h5>
              <p className="text-gray-500">@{user.message}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mt-8">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => console.log(`Navigating to ${item.path}`)}
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition duration-200 ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:text-sky -600 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="text-xl" />
                <span className="text-lg font-medium">{item.text}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
         onClick={logoutUser}
         className="w-full mt-10 bg-sky-500 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Logout
        </button>
      </aside>
    </>
  );
};
export default Side;
