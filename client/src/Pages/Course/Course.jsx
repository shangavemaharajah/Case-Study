import React from "react";
import { motion } from "framer-motion";

const Course = () => {
  console.log("Course page");
  return (
    <div className="flex min-h-screen mx-1.5 bg-gray-100">
      {/* Center Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi this is Course Page
      </motion.main>
    </div>
  );
};

export default Course;
