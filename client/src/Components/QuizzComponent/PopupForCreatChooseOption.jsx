import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddQuestionModal from "./AddQuestionFromUser";

const PopupForCreatChooseOption = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome to Questions Creator</h2>
      <hr className="mb-4" />
      <nav className="flex flex-col gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create a New Quiz
        </button>
        <button
          onClick={() => navigate("/quizAllShowUser")}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Manage Edit Quizzes
        </button>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <AddQuestionModal userId={userId} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PopupForCreatChooseOption;
