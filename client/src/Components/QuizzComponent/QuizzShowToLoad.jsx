import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../Hook/useQuizServices";

const QuizShowLoad = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
 
      if (selectedSubject && selectedNumQuestions) {
        navigate("/quizGetter", { state: { selectedNumQuestions, selectedSubject } });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Choose a subject:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`cursor-pointer p-4 rounded-xl shadow-md text-center transition-all border-2 
                    ${selectedSubject === subject ? "border-blue-600 bg-blue-50" : "border-transparent bg-white"}
                  `}
                >
                  <p className="text-lg font-medium text-gray-800">{subject}</p>
                </div>
              ))}
            </div>
          </>
        );
      case 2:
        const questionOptions = [5, 10, 15, 20];
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Select number of questions:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {questionOptions.map((num) => (
                <div
                  key={num}
                  onClick={() => setSelectedNumQuestions(num)}
                  className={`cursor-pointer p-4 rounded-xl shadow-md text-center transition-all border-2
                    ${parseInt(selectedNumQuestions) === num ? "border-blue-600 bg-blue-50" : "border-transparent bg-white"}
                  `}
                >
                  <p className="text-lg font-medium text-gray-800">{num}</p>
                </div>
              ))}
              <input
                type="number"
                min="1"
                placeholder="Custom"
                className="col-span-2 md:col-span-1 p-3 border rounded-lg"
                value={selectedNumQuestions}
                onChange={(e) => setSelectedNumQuestions(e.target.value)}
              />
            </div>
          </>
        );
      case 3:
        return (
          <div className="bg-white p-6 rounded-xl shadow-md text-gray-700 space-y-4">
            <h4 className="text-lg font-semibold">Confirmation</h4>
            <p><strong>Subject:</strong> {selectedSubject}</p>
            <p><strong>Number of Questions:</strong> {selectedNumQuestions}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="w-[60%] bg-white p-2 md:p-8 ml-50 rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome to the Quiz!
      </h2>
      {renderProgressBar()}
      <div className="mb-6">{renderStepContent()}</div>
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {currentStep < 3 ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg ml-auto"
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedSubject) ||
              (currentStep === 2 && !selectedNumQuestions)
            }
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg ml-auto"
            onClick={handleNext}
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizShowLoad;
