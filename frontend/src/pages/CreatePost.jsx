import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('')
  const [mediaFiles, setMediaFiles] = useState([]);
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error('You can upload up to 3 files only.');
      return;
    }
    for (const file of files) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error('Only images and videos are allowed.');
        return;
      }
      if (file.type.startsWith('video/') && file.size > 30 * 1024 * 1024) {
        toast.error('Video files must be less than 30 seconds.');
        return;
      }
    }
  
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add required field validation
    if (!title.trim() || !text.trim()) {
      toast.error('Title and content are required.');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      tags.split(',').forEach((tag) => formData.append('tags', tag.trim()));
      formData.append('category', category);
      mediaFiles.forEach((file) => formData.append('mediaFiles', file));

      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('course created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create course');
    }
  };

  return (
    <div className="create-course">
      <h2>Create New course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Content</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="skill1, skill2, skill3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
            <option value="business">Business</option>
            <option value="language">Language</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mediaFiles">Upload Media (Max: 3 files)</label>
          <input
            type="file"
            id="mediaFiles"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create course
        </button>
      </form>
    </div>
  )
}