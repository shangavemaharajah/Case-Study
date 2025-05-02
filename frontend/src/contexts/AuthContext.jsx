import { createContext, useContext, useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    try {
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      console.error('Invalid user JSON in localStorage:', stored)
      localStorage.removeItem('user') // clear the bad data
      return null
    }
  })

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const userData = response.data;
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify({
        username: userData.username,
        name: userData.name,
        email: userData.email,
      }));
      setUser({
        username: userData.username,
        name: userData.name,
        email: userData.email,
      });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Something went wrong';
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      localStorage.setItem('token', response.data);
      localStorage.setItem('user', JSON.stringify({
        username: userData.username,
        name: userData.name,
        email: userData.email,
      }));
      setUser({
        username: userData.username,
        name: userData.name,
        email: userData.email,
      });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Something went wrong';
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)