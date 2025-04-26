

const BASE_URL = import.meta.env.VITE_FRONT_END_API_URL;

// Helper to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Something went wrong");
  }
  return await response.json();
};

// POST: Create a question
export const createQuestion = async (quizQuestion) => {
  try {
    const response = await fetch(`${BASE_URL}/question/create-new-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizQuestion),
    });
    console.log("response from fetching data",response)
    return await handleResponse(response);
   
  } catch (error) {
    console.error("Create Question Error:", error);
  }
};

// GET: Get all questions
export const getAllQuestions = async ({token}) => {
  try {
    const response = await fetch(`${BASE_URL}/question/allquestions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("Get All Questions Error:", error);
    return [];
  }
};

// GET: Fetch quiz for user
export const fetchQuizForUser = async (number, subject, token) => {
  console.log("Constructed URL:", 
    `${BASE_URL}/question/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
  );
  console.log("Token of URL:", 
    token
  );
  
  
  try {
    const response = await fetch(
      `${BASE_URL}/question/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log("Response status:", response.status);
    if (!response.ok) {
      console.log("Response error text:", await response.text());
    }
    
    const data = await response.json();
    console.log("Fetched data:", data);  
    return data;
  } catch (error) {
    console.error("Fetch Quiz Error:", error);
    return [];
  }
};

// GET: Get subjects
export const getSubjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/question/subjects`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Get Subjects Error:", error);
  }
};

// PUT: Update question
export const updateQuestion = async (id, question) => {
  try {
    const response = await fetch(`${BASE_URL}/question/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Update Question Error:", error);
  }
};

// GET: Get question by ID
export const getQuestionById = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Adjust this if you store your token elsewhere
    const response = await fetch(`${BASE_URL}/question/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Get Question By ID Error:", error);
  }
};


// DELETE: Delete question
export const deleteQuestion = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/question/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ include token
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Delete Question Error:", error);
  }
};

