import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../Hook/useQuizServices";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useAuthContext } from "../../../Hook/UseAuthContext";
import AddQuestionModal from "../../../Components/QuizzComponent/AddQuestionFromUser";

const GetAllQuiz = () => {
  const { user } = useAuthContext();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = user?.accessToken;
      const data = await getAllQuestions({ token });
      console.log("Fetched data:", data.id);

      // Filter questions created by the current user
      const filteredQuestions = data.filter(
        (q) => String(q.userId) === String(user.id)
      );
      console.log("Fetched data:", data);
      console.log("Current user ID:", user.id, "Type:", typeof user.id);
      console.log(
        "Question userIds:",
        data.map((q) => q.userId)
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id, user?.accessToken);
      setQuestions(questions.filter((q) => q.id !== id));
      setDeleteSuccess("✅ Question deleted successfully.");
      setTimeout(() => setDeleteSuccess(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        Loading questions...
      </div>
    );
  }

  console.log("current user from getQuestion for edit", user.id);

  return (
    <section className="max-w-6xl mx-auto ml-60 p-4">
      <div className=" justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          All Quiz Questions
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 transition"
        >
          <FaPlus className="mr-2" /> Add Question
        </button>
      </div>

      {deleteSuccess && (
        <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700 text-center font-medium">
          {deleteSuccess}
        </div>
      )}

      {questions.length === 0 ? (
        <p className="text-gray-500 text-center">No questions found.</p>
      ) : (
        <div className=" gap-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white w-[75%] mt-2 shadow-md rounded-lg p-5 border border-gray-100"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {index + 1}. {question.question}
              </h4>

              <ul className="list-disc list-inside mb-3 text-gray-600">
                {question.choices.map((choice, idx) => (
                  <li key={idx}>{choice}</li>
                ))}
              </ul>

              <p className="text-sm text-green-600 font-medium mb-4">
                Correct Answer: {question.correctAnswers}
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/update-quiz/${question.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-yellow-600 border border-yellow-500 rounded hover:bg-yellow-100 transition"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-500 rounded hover:bg-red-100 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <AddQuestionModal userId={user.id} />
          </div>
        </div>
      )}
    </section>
  );
};

export default GetAllQuiz;
