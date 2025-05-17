import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import EmojiPicker from 'emoji-picker-react'

export default function PostDetail() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editedPost, setEditedPost] = useState(null)
  const [editingComment, setEditingComment] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [mediaInfo, setMediaInfo] = useState([])
  const [isDeletingPost, setIsDeletingPost] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Load post data when component mounts or ID changes
  useEffect(() => {
    loadPost()
  }, [id])

  // Record post view
  useEffect(() => {
    if (post) {
      api.post(`/posts/${id}/view`)
    }
  }, [post, id])

  // Setup edited post data when entering edit mode
  useEffect(() => {
    if (post && editMode) {
      setEditedPost({
        title: post.title,
        text: post.text,
        tags: post.tags
      })
    }
  }, [editMode, post])

  useEffect(() => {
    const fetchMediaInfo = async () => {
      if (post?.mediaIds?.length > 0) {
        const mediaData = await Promise.all(
          post.mediaIds.map(async (id) => {
            try {
              const res = await fetch(`http://localhost:8080/media/${id}/type`)
              const type = await res.text()
              return { id, type: type.trim() }
            } catch {
              return { id, type: 'unknown' }
            }
          })
        )
        setMediaInfo(mediaData)
      }
    }

    fetchMediaInfo()
  }, [post])

  const loadPost = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/posts/${id}`)
      setPost(response.data)
    } catch (error) {
      toast.error('Failed to load post')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${id}/like`)
      setPost(response.data)
      toast.success('Post liked!')
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const response = await api.post(`/posts/${id}/comments`, null, {
        params: { text: comment }
      })
      setPost(response.data)
      setComment('')
      toast.success('Comment added!')
    } catch (error) {
      toast.error('Failed to add comment')
    }
  }

  const handleEdit = async () => {
    if (!editedPost) return

    try {
      const response = await api.put(`/posts/${id}`, {
        title: editedPost.title,
        text: editedPost.text,
        tags: editedPost.tags
      })
      setPost(response.data)
      setEditMode(false)
      toast.success('Post updated successfully!')
    } catch (error) {
      toast.error('Failed to update post')
    }
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Login required")
      return navigate("/login")
    }

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setShowDeleteModal(false)
      setIsDeletingPost(false)
      toast.success("Post deleted successfully")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const handleEditComment = async (commentId, newText) => {
    if (!newText.trim()) return

    try {
      const response = await api.put(`/posts/${id}/comments/${commentId}`, null, {
        params: { text: newText }
      })
      setPost(response.data)
      setEditingComment(null)
      toast.success('Comment updated!')
    } catch (error) {
      toast.error('Failed to update comment')
    }
  }

  const confirmDeleteComment = (commentId) => {
    setCommentToDelete(commentId)
    setIsDeletingPost(false)
    setShowDeleteModal(true)
  }

  const handleDeleteComment = async () => {
    if (!commentToDelete) return

    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Login required")
      return navigate("/login")
    }

    try {
      const response = await api.delete(`/posts/${id}/comments/${commentToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPost(response.data)
      setShowDeleteModal(false)
      setCommentToDelete(null)
      toast.success('Comment deleted!')
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  const isCurrentUserCreator = (creatorUsername) => {
    return user?.username === creatorUsername
  }

  if (loading) {
    return (
      <div className="post-detail">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
        <div className="skeleton" style={{ height: '1.5rem', width: '40%', marginBottom: '1.5rem' }}></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: '75%' }}></div>
      </div>
    )
  }

  if (!post) return <div className="post-detail">Post not found</div>

  return (
    <div className="post-detail fade-in">
      {editMode ? (
        <div className="edit-post scale-in">
          <h2>Edit course</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editedPost?.title || ''}
              onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={editedPost?.text || ''}
              onChange={(e) => setEditedPost({...editedPost, text: e.target.value})}
              rows={5}
              placeholder="Write your post content here..."
            />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              value={editedPost?.tags?.join(', ') || ''}
              onChange={(e) => setEditedPost({
                ...editedPost,
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
              })}
              placeholder="news, tech, programming"
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleEdit} className="btn btn-primary">
              ✏️ Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="post-header">
            <div className="avatar">
              {post.creator?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="post-meta-author">
              <span className="post-author">{post.creator?.name}</span>
              <span className="post-date">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <h1>{post.title}</h1>
          
          <div className="tags">
            {post.tags?.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="post-content">{post.text}</div>

          {mediaInfo.length > 0 && (
            <div className="post-media">
              {mediaInfo.map(({ id, type }) => (
                <div key={id} style={{ marginBottom: '1rem' }}>
                  {type?.trim().startsWith('image/') ? (
                    <img
                      src={`/media/${id}`}
                      alt="Post media"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  ) : type?.trim().startsWith('video/') ? (
                    <video controls width="100%">
                      <source src={`/media/${id}`} type={type} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p style={{ color: 'red' }}>Unsupported media: {type}</p>
                  )}

                </div>
              ))}
            </div>
          )}
          
          <div className="post-stats">
            <div className="stats-left">
              <span>{post.views} views</span>
            </div>
            <div className="stats-right">
              <button onClick={handleLike} className={`like-button ${post.liked ? 'active' : ''}`}>
                ❤️ <span>{post.likes}</span>
              </button>
            </div>
          </div>
          
          {user?.username === post.creator?.user?.username && (
            <div className="post-actions">
              <button onClick={() => setEditMode(true)} className="btn btn-secondary">
                ✏️ Edit course
              </button>
              <button 
                onClick={() => { 
                  setCommentToDelete(null); 
                  setIsDeletingPost(true);
                  setShowDeleteModal(true); 
                }} 
                className="btn btn-danger"
              >
                🗑️ Delete Post
              </button>
            </div>
          )}

          <div className="comments-section">
            <h3>Comments ({post.comments?.length || 0})</h3>
            
            <form onSubmit={handleComment} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
              />
              <div className="comment-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEmojiPicker((val) => !val)}
                >
                  😊 Emoji
                </button>
                <button type="submit" className="btn btn-primary">
                  📤 Add Comment
                </button>
              </div>
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <div className="emoji-picker-wrapper">
                    <EmojiPicker onEmojiClick={handleEmojiClick} height={300} />
                  </div>
                </div>
              )}
            </form>

            <div className="comments-list">
              {post.comments?.length === 0 ? (
                <div className="no-comments">No comments yet. Be the first to comment!</div>
              ) : (
                post.comments?.map((comment) => (
                  <div key={comment.id} className="comment">
                    {editingComment === comment.id ? (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEditComment(comment.id, e.target.text.value);
                      }}>
                        <textarea 
                          name="text" 
                          defaultValue={comment.text} 
                          rows={3}
                        />
                        <div className="comment-edit-actions">
                          <button type="submit" className="btn btn-primary">Save</button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => setEditingComment(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="comment-header">
                          <div className="comment-avatar">
                            {comment.creator?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="comment-meta">
                            <span className="comment-author">{comment.creator?.name}</span>
                            <span className="comment-date">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <p>{comment.text}</p>
                        {user?.username === comment.creator?.user?.username && (
                          <div className="comment-actions">
                            <button 
                              onClick={() => setEditingComment(comment.id)}
                              className="btn btn-secondary"
                            >
                              ✏️ Edit
                            </button>
                            <button 
                            onClick={() => confirmDeleteComment(comment.id)}
                              className="btn btn-danger"
                            >
                              🗑️ Delete
                            </button>

                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Delete Modal (for both post and comment deletion) */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal scale-in">
            <div className="modal-header">
              <h3>{commentToDelete ? "Delete Comment" : "Delete Post"}</h3>
              <button 
                className="close-button" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setCommentToDelete(null);
                  setIsDeletingPost(false);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {commentToDelete ? (
                <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
              ) : (
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setCommentToDelete(null);
                  setIsDeletingPost(false);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => {
                  console.log("🧪 Delete button clicked");
                  if (isDeletingPost) {
                    handleDelete(); // ✅ Explicitly call deletePost
                  } else {
                    handleDeleteComment(); // ✅ Comment delete
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
