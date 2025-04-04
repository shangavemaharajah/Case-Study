import { useAuthContext } from "./UseAuthContext"; 

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user"); // Remove the user from local storage
    window.location.reload(); // Refresh the page to apply the changes
  };

  return { logout };
};

