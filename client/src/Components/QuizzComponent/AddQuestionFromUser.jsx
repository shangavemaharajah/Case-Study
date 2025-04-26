import React, { useEffect, useState } from "react"
import { createQuestion, getSubjects } from "../../Hook/useQuizServices"


const AddQuestionModal = ({ onClose , userId }) => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([])

    console.log("User ID from AddQuestionModal:", userId)

	// useEffect(() => {
	// 	fetchSubjects()
	// }, [])

	// const fetchSubjects = async () => {
	// 	try {
	// 		const subjectsData = await getSubjects()
	// 		setSubjectOptions(subjectsData)
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	const handleAddChoice = () => {
		setChoices([...choices, ""])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((_, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((ans, i) => (i === index ? value : ans)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((_, i) => i !== index))
	}

	const handleAddSubject = () => {
		if (newSubject.trim()) {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = {
			question,
			questionType,
			choices,
            userId,
			correctAnswers: correctAnswers.map((answer) => {
				const letter = answer.charAt(0).toUpperCase()
				const index = letter.charCodeAt(0) - 65
				return index >= 0 && index < choices.length ? letter : null
			}),
			subject
		}

		await createQuestion(result)

		// Reset form
		setQuestionText("")
		setQuestionType("single")
		setChoices([""])
		setCorrectAnswers([""])
		setSubject("")
		onClose()
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Subject */}
			<div>
				<label className="block font-medium">Select Subject</label>
				<select
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					className="w-full mt-1 p-2 border border-gray-300 rounded">
					<option value="">Select</option>
					<option value="New">Add New</option>
					{subjectOptions.map((option, i) => (
						<option key={i} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>

			{/* New Subject */}
			{subject === "New" && (
				<div>
					<label className="block font-medium">New Subject</label>
					<input
						type="text"
						value={newSubject}
						onChange={(e) => setNewSubject(e.target.value)}
						className="w-full mt-1 p-2 border border-gray-300 rounded"
					/>
					<button
						type="button"
						onClick={handleAddSubject}
						className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
						Add Subject
					</button>
				</div>
			)}

			{/* Question */}
			<div>
				<label className="block font-medium">Question</label>
				<textarea
					value={question}
					onChange={(e) => setQuestionText(e.target.value)}
					className="w-full mt-1 p-2 border border-gray-300 rounded"
				/>
			</div>

			{/* Type */}
			<div>
				<label className="block font-medium">Question Type</label>
				<select
					value={questionType}
					onChange={(e) => setQuestionType(e.target.value)}
					className="w-full mt-1 p-2 border border-gray-300 rounded">
					<option value="single">Single</option>
					<option value="multiple">Multiple</option>
				</select>
			</div>

			{/* Choices */}
			<div>
				<label className="block font-medium">Choices</label>
				{choices.map((choice, i) => (
					<div key={i} className="flex items-center gap-2 mb-2">
						<input
							value={choice}
							onChange={(e) => handleChoiceChange(i, e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
						/>
						{choices.length > 1 && (
							<button
								type="button"
								onClick={() => handleRemoveChoice(i)}
								className="text-red-500 hover:text-red-700">
								Remove
							</button>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={handleAddChoice}
					className="bg-gray-200 hover:bg-gray-300 text-sm py-1 px-3 rounded">
					Add Choice
				</button>
			</div>

			{/* Correct Answers */}
			<div>
				<label className="block font-medium">Correct {questionType === "single" ? "Answer" : "Answers"}</label>
				{correctAnswers.map((ans, i) => (
					<div key={i} className="flex items-center gap-2 mb-2">
						<input
							value={ans}
							onChange={(e) => handleCorrectAnswerChange(i, e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
						/>
						{questionType === "multiple" && correctAnswers.length > 1 && (
							<button
								type="button"
								onClick={() => handleRemoveCorrectAnswer(i)}
								className="text-red-500 hover:text-red-700">
								Remove
							</button>
						)}
					</div>
				))}
				{questionType === "multiple" && (
					<button
						type="button"
						onClick={handleAddCorrectAnswer}
						className="bg-gray-200 hover:bg-gray-300 text-sm py-1 px-3 rounded">
						Add Answer
					</button>
				)}
			</div>

			{/* Buttons */}
			<div className="flex justify-end gap-4 pt-4">
				<button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded">
					Save
				</button>
				<button
					type="button"
					onClick={onClose}
					className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded">
					Cancel
				</button>
			</div>
		</form>
	)
}

export default AddQuestionModal
