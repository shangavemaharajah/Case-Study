import { useAuthContext } from "./UseAuthContext"; 

import { useEffect, useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        // Read response as text for debugging
        const errorText = await response.text();
        console.error("Error Response Text:", errorText);
        setIsLoading(false);
        setError("Invalid email or password. Please try again.");
        return;
      }
  
      // Ensure response is JSON before parsing
      const json = await response.json();
      console.log("Login successful:", json);
  
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
  
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return { isLoading, error, login };
};
