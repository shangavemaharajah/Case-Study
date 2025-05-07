import {
  FaUser,
  FaBook,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaNewspaper,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaLink,
  FaCalendarAlt,
  FaComment,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const News = () => {
  return (
    //bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500
    <div className="flex min-h-screen mx-1.5 bg-gray-100">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Center Content */}
        <main className="w-[58%]  p-6 ml-[20%] ">
          <button className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-white bg-gray-100 hover:bg-sky-500 rounded-lg shadow-md transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back
          </button>

          {/* this is for news profile start */}

          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500">221 Posts</p>
            <img
              src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg"
              alt="Cover"
              className="w-full h-40 object-cover rounded-lg mt-4"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg"
                  alt="DP"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h5 className="font-semibold">John Doe</h5>
                  <p className="text-gray-500">@johndoe</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <FaEnvelope className="text-gray-700 text-xl cursor-pointer" />  No Need
                <FaEllipsisH className="text-gray-700 text-xl cursor-pointer" /> No Need
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Follow up
                </button>
              </div>
            </div>
          </div>
  
          <div className="w-full mt-6">
            <div className="bg-white p-5 shadow-md rounded-lg -mt-8">
              <p className="mt-2 text-gray-700">
                We power cross‑border payments for the world’s fastest‑growing
                startups and enterprises. Send and receive instant payments
                globally seamlessly.
              </p>
              <div className="mt-3 flex space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>London, United Kingdom</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaLink />
                  <span>vertofx.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt />
                  <span>Joined March 2019</span>
                </div>
              </div>
              <div className="mt-3 flex space-x-6 font-semibold text-gray-700">
                <p>
                  <span className="text-black">334</span> Following
                </p>
                <p>
                  <span className="text-black">600</span> Followers
                </p>
              </div>
              <p className="text-gray-500 mt-2">
                Followed by Amanda, Efemena, and 7 others
              </p>
            </div>
          </div>
        */}

          {/* profile end */}

          {/* ex -1 */}
          <div className="flex mt-7">
            <img
              src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg"
              alt="Post User DP"
              className="w-15 h-15 rounded-full"
            />
            <div className="bg-white p-5 w-full shadow-md rounded-lg ml-3">
              <div className="flex items-center space-x-3">
                <div>
                  <h5 className="font-semibold">John Doe</h5>
                  <p className="text-gray-500">@johndoe</p>
                </div>
              </div>
              <p className="text-gray-700 mt-3 text-lg">
                Here is an interesting post! Check out this cool link to some
                awesome content. This resource provides valuable insights into
                the latest trends in technology. Whether you're a beginner or an
                expert, you'll find something exciting and informative. Don't
                miss out on exploring new ideas and staying up-to-date with the
                fast-paced world of innovation.
              </p>
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                https://www.example.com
              </a>
              <img
                src="https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Post Preview"
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
              <div className="mt-4 flex space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-gray-700" />
                  <span>Like</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <FaComment className="text-xl" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShareAlt className="text-gray-700" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
          {/* ex -2 */}
          <div className="flex mt-7">
            <img
              src="https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Post User DP"
              className="w-15 h-15 rounded-full"
            />
            <div className="bg-white p-5 w-full shadow-md rounded-lg ml-3">
              <div className="flex items-center space-x-3">
                <div>
                  <h5 className="font-semibold">John Doe</h5>
                  <p className="text-gray-500">@johndoe</p>
                </div>
              </div>
              <p className="text-gray-700 mt-3 text-lg">
                Here is an interesting post! Check out this cool link to some
                awesome content. This resource provides valuable insights into
                the latest trends in technology. Whether you're a beginner or an
                expert, you'll find something exciting and informative. Don't
                miss out on exploring new ideas and staying up-to-date with the
                fast-paced world of innovation.
              </p>
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                https://www.example.com
              </a>
              <img
                src="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Post Preview"
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
              <div className="mt-4 flex space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-gray-700" />
                  <span>Like</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <FaComment className="text-xl" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShareAlt className="text-gray-700" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>

          {/* ex -3 */}
          <div className="flex mt-7">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Post User DP"
              className="w-15 h-15 rounded-full"
            />
            <div className="bg-white p-5 w-full shadow-md rounded-lg ml-3">
              <div className="flex items-center space-x-3">
                <div>
                  <h5 className="font-semibold">John Doe</h5>
                  <p className="text-gray-500">@johndoe</p>
                </div>
              </div>
              <p className="text-gray-700 mt-3 text-lg">
                Here is an interesting post! Check out this cool link to some
                awesome content. This resource provides valuable insights into
                the latest trends in technology. Whether you're a beginner or an
                expert, you'll find something exciting and informative. Don't
                miss out on exploring new ideas and staying up-to-date with the
                fast-paced world of innovation.
              </p>
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                https://www.example.com
              </a>
              <img
                src="https://th.bing.com/th/id/OIP.c77HarQw_Q3UN2j2VlXuegHaEJ?rs=1&pid=ImgDetMain"
                alt="Post Preview"
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
              <div className="mt-4 flex space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-gray-700" />
                  <span>Like</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <FaComment className="text-xl" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShareAlt className="text-gray-700" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.main>
    </div>
  );
};

export default News;
