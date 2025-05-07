import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Logo from "../../../assets/lOGO CASE.png";
import { useAuthContext } from "../../../Hook/UseAuthContext";

const QuizResult = () => {

     const { user } = useAuthContext();
    const location = useLocation();
    const certificateRef = useRef();
    const { quizQuestions, totalScores, name, selectedSubject, } = location.state;

    const numQuestions = quizQuestions.length;
    const attendedQuestions = quizQuestions.filter((q) => q.userAnswer).length;
    const percentage = Math.round((totalScores / numQuestions) * 100);

    const getGrade = (score) => {
        if (score <= 50) return "F";
        if (score <= 60) return "D";
        if (score <= 70) return "C";
        if (score <= 80) return "B";
        if (score >= 80) return "A";
    };
  useEffect(() => {
    if (user && user.user) {
      // Future logic for user
    }
  }, [user]);



const username = user?.message
    const handleDownload = async () => {
        if (certificateRef.current === null) return;
        try {
            // Convert the certificate to a PNG image
            const dataUrl = await toPng(certificateRef.current, {
                backgroundColor: '#ffffff', // Ensure white background
                pixelRatio: 2, // Higher resolution
            });

            // Download the image
            download(dataUrl, `${name}_certificate.png`);
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center px-4 py-8">
            {/* 🔹 Download Button */}
            <button
                onClick={handleDownload}
                className="mb-6 mr-80 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 self-end"
            >
                Download Certificate
            </button>

            {/* 🔸 Certificate Area */}
            <div
                ref={certificateRef}
                className="w-full max-w-3xl border-4 border-blue-700 rounded-md p-10 bg-white shadow-xl text-center relative mb-10"
            >
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-20 absolute top-5 right-5"
                />
                <h2 className="text-2xl font-bold text-blue-700">CERTIFICATE OF COMPLETION</h2>
                <p className="mt-4 text-sm font-semibold">THIS IS AWARDED TO</p>
                <h1 className="text-3xl font-bold my-2">{username}</h1>
                <p className="text-lg">in recognition of achieving a</p>
                <h2 className="text-xl font-bold my-2">Grade {getGrade(percentage)}</h2>
                <p>Subject: {selectedSubject}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>

                {/* 🧠 Quiz Stats inside Certificate */}
                <div className="mt-6 text-left px-6">
                    <h3 className="font-semibold text-lg mb-1">Quiz Performance:</h3>
                    <p>Total Questions: <strong>{numQuestions}</strong></p>
                    <p>Correct Answers: <strong>{totalScores}</strong></p>
                    <p>Score: <strong>{percentage}%</strong></p>
                </div>

                <div className="mt-6">
                    <p className="italic font-semibold">Well done!</p>
                    <p>Case Study Academy</p>
                </div>
            </div>

            {/* 📋 Outside Certificate - Full Summary */}
            <div className="w-full max-w-3xl bg-gray-50 border rounded-md p-6 shadow-md">
                <h3 className="text-lg font-bold mb-3">📚 Detailed Question Summary</h3>
                <ul className="list-disc pl-6 space-y-4 text-left">
                    {quizQuestions.map((q, index) => (
                        <li key={index}>
                            <strong>Q{index + 1}:</strong> {q.question}
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default QuizResult;