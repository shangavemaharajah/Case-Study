import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Home() {
  const [posts, setPosts] = useState([])  // All posts
  const [filteredPosts, setFilteredPosts] = useState([])  // Filtered posts based on search
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')  // Search term
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch posts when page changes or on initial load
  useEffect(() => {
    loadPosts()
  }, [page])

  // Filter posts whenever search term changes
  useEffect(() => {
    if (search.trim()) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.text.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)  // Show all posts when search is empty
    }
  }, [search, posts])  // Trigger when search or posts change

  const loadPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("token")
      
      const params = { 
        page, 
        size: 10 
      }
      
      const headers = token ? { 
        Authorization: `Bearer ${token}` 
      } : {}

      // Fetch posts from backend
      const response = await api.get('/posts', { 
        params,
        headers
      })
      
      const { content, totalPages } = response.data
      setPosts(content || [])
      setFilteredPosts(content || [])  // Initially, show all posts
      setTotalPages(totalPages)
    } catch (err) {
      console.error('Failed to load posts:', err.response?.data || err.message)
      
      if (err.response?.status === 401) {
        setError('Authentication expired. Please log in again.')
      } else {
        setError(err.response?.data?.message || 'Failed to load posts. Please try again later.')
      }
      
      setPosts([])
      setFilteredPosts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loader"></div>
  
  if (error) {
    return <div className="error-message">
      {typeof error === 'string' ? error : 'An unexpected error occurred. Please try again.'}
    </div>
  }
  
  if (!loading && filteredPosts.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <p>No courses found 😔</p>
      <p>Try a different search or create one!</p>
    </div>
  }
  
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Update search term on input change
        />
      </div>
      
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.text.substring(0, 100)}...</p>
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <Link to={`/posts/${post.id}`} className="btn btn-primary">
              Read more
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button 
          onClick={() => setPage((p) => p + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
