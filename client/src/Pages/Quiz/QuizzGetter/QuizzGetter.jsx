import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { fetchQuizForUser } from "../../../Hook/useQuizServices"
import AnswerOptions from "../../../Hook/useAnswerOption"
import { useAuthContext } from "../../../Hook/UseAuthContext"

const QuizGetter = () => {
	const [quizQuestions, setQuizQuestions] = useState([{ id: "", correctAnswers: "", question: "", questionType: "" }])
	const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [totalScores, setTotalScores] = useState(0)
	const location = useLocation()
	const navigate = useNavigate()
	const { selectedSubject, selectedNumQuestions } = location.state
	const { user } = useAuthContext();
  
	console.log("User token from QuizGetter",user.accessToken)
	const token = user?.accessToken

	useEffect(() => {
		fetchQuizData()
	}, [])

	console.log("Token from quiz ",token)

	const fetchQuizData = async () => {
		if (selectedNumQuestions && selectedSubject) {
			const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject,token)
			console.log("Quiz Questions:", questions); // Check if you get data here
			setQuizQuestions(questions) //debug mode not  get question 
		}
	}

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(answer)
				? answer.map((a) => a.charAt(0))
				: answer.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer }
				return updatedAnswers
			} else {
				return [...prevAnswers, { id: questionId, answer: selectedAnswer }]
			}
		})
	}

	const handleCheckboxChange = (questionId, choice) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedOption = choice.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				const existingAnswer = updatedAnswers[existingAnswerIndex].answer
				let newAnswer = Array.isArray(existingAnswer)
					? existingAnswer.includes(selectedOption)
						? existingAnswer.filter((a) => a !== selectedOption)
						: [...existingAnswer, selectedOption]
					: [selectedOption]
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: newAnswer }
				return updatedAnswers
			} else {
				return [...prevAnswers, { id: questionId, answer: [selectedOption] }]
			}
		})
	}

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
		if (!selectedAnswer) return false
		if (Array.isArray(selectedAnswer.answer)) return selectedAnswer.answer.includes(choice.charAt(0))
		return selectedAnswer.answer === choice.charAt(0)
	}

	const handleSubmit = () => {
		let scores = 0
	
		const updatedQuestions = quizQuestions.map((question) => {
			const selectedAnswer = selectedAnswers.find((a) => a.id === question.id)
			const selected = selectedAnswer
				? Array.isArray(selectedAnswer.answer)
					? selectedAnswer.answer.map((o) => o.charAt(0))
					: [selectedAnswer.answer.charAt(0)]
				: []
	
			const correct = Array.isArray(question.correctAnswers)
				? question.correctAnswers.map((o) => o.charAt(0))
				: [question.correctAnswers.charAt(0)]
	
			const isCorrect = selected.length === correct.length && selected.every((o) => correct.includes(o))
			if (isCorrect) scores++
	
			return {
				...question,
				attendedQuestions: selected.length > 0 ? selected.join(", ") : "Not Answered",
				correctAnswer: correct.join(", "),
			}
		})
	
		setTotalScores(scores)
		setSelectedAnswers([])
		setCurrentQuestionIndex(0)
		navigate("/quiz-result", { state: { quizQuestions: updatedQuestions, totalScores: scores, selectedSubject, quizQuestions} })
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1)
		} else {
			handleSubmit()
		}
	}

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1)
		}
	}

	return (
		<div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
			<h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
				Question {currentQuestionIndex + 1} of {quizQuestions.length}
			</h2>

			<div className="bg-gray-100 p-4 rounded-xl shadow-inner mb-6">
				<h4 className="text-lg font-medium text-gray-800 whitespace-pre-wrap">
					{quizQuestions[currentQuestionIndex]?.question}
				</h4>
			</div>

			<AnswerOptions
				question={quizQuestions[currentQuestionIndex]}
				isChecked={isChecked}
				handleAnswerChange={handleAnswerChange}
				handleCheckboxChange={handleCheckboxChange}
			/>

			<div className="mt-8 flex justify-between items-center">
				<button
					className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:opacity-50"
					onClick={handlePreviousQuestion}
					disabled={currentQuestionIndex === 0}
				>
					← Previous
				</button>   

				<button
					className={`px-4 py-2 rounded-md ${
						currentQuestionIndex === quizQuestions.length - 1
							? "bg-yellow-500 hover:bg-yellow-600 text-white"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					} disabled:opacity-50`}
					onClick={handleNextQuestion}
					disabled={
						!selectedAnswers.find(
							(ans) =>
								ans.id === quizQuestions[currentQuestionIndex]?.id &&
								ans.answer &&
								ans.answer.length > 0
						)
					}
				>
					{currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next →"}
				</button>
			</div>
		</div>
	)
}

export default QuizGetter
