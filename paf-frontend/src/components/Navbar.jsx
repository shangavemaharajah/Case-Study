import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <h1 className="text-xl font-bold text-[#0a9bdf] flex items-center">
          <span className="mr-2">📚</span>
          Learning Tracker
        </h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive 
                ? "text-[#0a9bdf] font-semibold px-4 py-2 rounded-md relative after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-5 after:h-[3px] after:bg-[#0a9bdf] after:rounded-md" 
                : "text-[#4a5568] font-medium px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-[#0a9bdf] hover:bg-[#f0f7ff]"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive 
                ? "text-[#0a9bdf] font-semibold px-4 py-2 rounded-md relative after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-5 after:h-[3px] after:bg-[#0a9bdf] after:rounded-md" 
                : "text-[#4a5568] font-medium px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-[#0a9bdf] hover:bg-[#f0f7ff]"
            }
          >
            Add Progress
          </NavLink>
          <NavLink
            to="/achievements"
            className={({ isActive }) =>
              isActive 
                ? "text-[#0a9bdf] font-semibold px-4 py-2 rounded-md relative after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-5 after:h-[3px] after:bg-[#0a9bdf] after:rounded-md" 
                : "text-[#4a5568] font-medium px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-[#0a9bdf] hover:bg-[#f0f7ff]"
            }
          >
            Achievements
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;