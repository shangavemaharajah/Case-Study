import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaLink,
  FaCalendarAlt,
  FaComment,
  FaShareAlt,
  FaHeart,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Post from "../../Components/PostComponentProfile/post";
import { motion } from "framer-motion";
import { useAuthContext } from "../../Hook/UseAuthContext";

const BASE_URL = import.meta.env.VITE_FRONT_END_API_URL;

const Profile = () => {
  const { user } = useAuthContext();
  const [dataAssign, setDataAssign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    caption: "",
    linkRef: "",
  });
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const userid = user?.id;
  const token = user?.accessToken;

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/post/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setDataAssign(data);
      setError(null);
    } catch (error) {
      console.error("Get All Posts Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getAllPosts();
  }, [token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");
      getAllPosts(); // Changed from getAllQuestions to getAllPosts
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditForm({
      title: post.title || "",
      caption: post.caption || "",
      linkRef: post.linkRef || "",
    });
  };

  const handleSave = async (postId) => {
    try {
      const res = await fetch(`${BASE_URL}/post/update/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Update failed");

      setEditingPostId(null);
      setEditForm({ title: "", caption: "", linkRef: "" });
      getAllPosts(); // Changed from getAllQuestions to getAllPosts
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;

    setComments((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        {
          id: Date.now(),
          text: newComment,
          author: user?.username || "Anonymous",
          date: new Date().toISOString(),
        },
      ],
    }));
    setNewComment("");
  };

  const handleShare = (post) => {
    const shareText = `${post.title || "Check out this post"}: ${
      post.caption?.substring(0, 100) || ""
    }...`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: post.title || "Post",
          text: shareText,
          url: shareUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const renderPosts = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>Error loading posts: {error}</p>
          <button
            onClick={getAllPosts}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (dataAssign.length === 0) {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
          <p>No posts found. Be the first to share something!</p>
        </div>
      );
    }

    return dataAssign.map((post) => (
      <div
        key={post.id}
        className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-gray-200"
      >
        {/* User Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={
                post.userProfileImage ||
                "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg"
              }
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{post.username}</h3>
              <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
            </div>
          </div>
          {user?.id === post.userId && (
            <div className="flex gap-3 text-gray-500">
              <button
                onClick={() => handleEdit(post)}
                className="hover:text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* Editable Form or Content */}
        {editingPostId === post.id ? (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              placeholder="Edit title"
            />
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={editForm.caption}
              onChange={(e) =>
                setEditForm({ ...editForm, caption: e.target.value })
              }
              placeholder="Edit caption"
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editForm.linkRef}
              onChange={(e) =>
                setEditForm({ ...editForm, linkRef: e.target.value })
              }
              placeholder="Edit link"
            />
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => handleSave(post.id)}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditingPostId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {post.title && (
              <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
            )}
            {post.caption && (
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {post.caption}
              </p>
            )}

            {post.linkRef && (
              <div className="mt-3">
                <a
                  href={post.linkRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  <FaLink className="mr-2" /> {post.linkRef}
                </a>
              </div>
            )}
          </>
        )}

        {/* Post Image */}
        {post.imageURL && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={post.imageURL}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex justify-around border-t pt-3 text-gray-600">
          <button
            className={`flex items-center gap-1 ${
              likedPosts.includes(post.id)
                ? "text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={() => handleLike(post.id)}
          >
            <FaHeart /> Like
          </button>
          <button
            className="flex items-center gap-1 hover:text-blue-500"
            onClick={() =>
              document.getElementById(`comment-input-${post.id}`)?.focus()
            }
          >
            <FaComment /> Comment
          </button>
          <button
            className="flex items-center gap-1 hover:text-green-500"
            onClick={() => handleShare(post)}
          >
            <FaShareAlt /> Share
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-3 border-t pt-3">
          {/* Existing Comments */}
          {(comments[post.id] || []).map((comment) => (
            <div key={comment.id} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="flex justify-between">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <input
              id={`comment-input-${post.id}`}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 border rounded"
              onKeyPress={(e) => e.key === "Enter" && handleAddComment(post.id)}
            />
            <button
              onClick={() => handleAddComment(post.id)}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[58%] ml-[20%]"
      >
        <div className="w-full p-6">
          <button className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-white bg-gray-100 hover:bg-blue-500 rounded-lg shadow-md transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back
          </button>

          {/* Profile Header */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{user?.name || "John Doe"}</h2>
            <p className="text-gray-500">{dataAssign.length} Posts</p>
            <img
              src="https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Cover"
              className="w-full h-40 object-cover rounded-lg mt-4"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <img
                  src={
                    user?.profileImage ||
                    "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt="DP"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h5 className="font-semibold">{user?.name || "John Doe"}</h5>
                  <p className="text-gray-500">@{user?.username || "johndoe"}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link
                  to="/profile/edit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="w-full mt-6">
            <div className="bg-white p-5 shadow-md rounded-lg -mt-8">
              <p className="mt-2 text-gray-700">
                {user?.bio ||
                  "We power cross‑border payments for the world's fastest‑growing startups and enterprises. Send and receive instant payments globally seamlessly."}
              </p>
              <div className="mt-3 flex space-x-4 text-gray-500">
                {user?.location && (
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt />
                    <span>{user.location}</span>
                  </div>
                )}
                {user?.website && (
                  <div className="flex items-center space-x-1">
                    <FaLink />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                {user?.createdAt && (
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex space-x-6 font-semibold text-gray-700">
                <p>
                  <span className="text-black">{user?.followingCount || 334}</span> Following
                </p>
                <p>
                  <span className="text-black">{user?.followersCount || 600}</span> Followers
                </p>
              </div>
            </div>
          </div>
        </div>

        <Post userId={userid} token={token} onPostCreated={getAllPosts} />
        {renderPosts()}
      </motion.main>
    </div>
  );
};

export default Profile;