import React from "react";
import { motion } from "framer-motion";

const Quiz = () => {
  console.log("Course page");
  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Center Content */}
        <main className="w-[58%]  p-6 ml-[20%] ">Hi this is Quiz</main>
      </motion.main>
    </div>
  );
};

export default Quiz;
