import { useState } from "react";
import { useAuthContext } from "./UseAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    if (!password || !email || !username) {
      setIsLoading(false);
      setError("All fields are required. Please fill in all details.");
      return { error: "All fields are required. Please fill in all details." };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsLoading(false);
      setError("Invalid email address. Please enter a valid email.");
      return { error: "Invalid email address. Please enter a valid email." };
    }

    console.log("API URL:", import.meta.env.VITE_FRONT_END_API_URL);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setIsLoading(false);
        setError(errorText);
        return { error: errorText };
      }

      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return json;
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return { register, isLoading, error };
};
