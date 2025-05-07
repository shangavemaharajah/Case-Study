import React from 'react';

// Icons (you can use a library like react-icons for these)
import { FaImage, FaList, FaSmile } from 'react-icons/fa'; // For image, list, and smiley icons
import { BsFiletypeGif } from 'react-icons/bs'; // For GIF icon
import { FiPlusCircle } from 'react-icons/fi'; // For the plus icon

const Post = () => {
  return (
    <div className=" p-4">
      {/* Main container */}
      <div className="flex items-start space-x-3">
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
          {/* Placeholder for profile image */}
          <img
            src="https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with actual profile image URL
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Input and Buttons */}
        <div className="flex-1">
          {/* Text Input */}
          <textarea
            placeholder="What's happening"
            className="w-full text-lg text-gray-800 placeholder-gray-500 border-none focus:outline-none resize-none"
            rows="2"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-2">
            {/* Left Icons */}
            <div className="flex space-x-3">
              <button className="text-blue-500 hover:text-sky-600">
                <FaImage size={20} />
              </button>
              <button className="text-blue-500 hover:text-sky-600">
                <BsFiletypeGif size={20} />
              </button>
              <button className="text-blue-500 hover:text-sky-600">
                <FaList size={20} />
              </button>
              <button className="text-blue-500 hover:text-sky-600">
                <FaSmile size={20} />
              </button>
            </div>

            {/* Right Side: Circle and Tweet Button */}
            <div className="flex items-center space-x-2">
              {/* <button className="text-gray-400 hover:text-blue-500">
                <FiPlusCircle size={20} />
              </button> */}
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-colors">
               Post 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;