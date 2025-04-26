import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PopupForCreatChooseOption from "../../Components/QuizzComponent/PopupForCreatChooseOption";
import { useAuthContext } from "../../Hook/UseAuthContext";
import QuizShowLoad from "../../Components/QuizzComponent/QuizzShowToLoad";

const Quiz = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.user) {
      // Future logic for user
    }
  }, [user]);


  const handleCreateClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
   <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
  <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Quiz Dashboard
        </h1>
        <p className="text-gray-600 mb-8 text-base md:text-lg">
          Manage and create quiz questions easily and effectively.
        </p>

        <button
          onClick={handleCreateClick}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
        >
          + Create New Questions
        </button>
      </div>
    </motion.main>

    {/* Popup Modal */}
    {showPopup && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
        >
          <button
            onClick={handleClosePopup}
            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
          <PopupForCreatChooseOption userId={user?.id} />
        </motion.div>
      </motion.div>
    )}

    <div className="w-full px-1 ml-12 py-2">
      <QuizShowLoad />
    </div>
  </div>
</main>

  );
};

export default Quiz;
