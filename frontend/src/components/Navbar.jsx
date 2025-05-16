import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Course Management</Link>
      <div className="navbar-actions">
        {user ? (
          <>
            <Link to="/create-post" className="btn btn-blue">Create Course</Link>
            <button onClick={handleLogout} className="btn btn-blue">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-blue">Login</Link>
            <Link to="/register" className="btn btn-blue">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
