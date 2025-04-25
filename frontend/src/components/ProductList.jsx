import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";


const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [menuIndex, setMenuIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        All Posts
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No posts yet.</p>
      ) : (
        products.map((p, index) => {
          const [liked, setLiked] = useState(false);
          const [commentsVisible, setCommentsVisible] = useState(false);
          const [comments, setComments] = useState([]);
          const [commentInput, setCommentInput] = useState("");
          const [shared, setShared] = useState(false);
          const [shareVisible, setShareVisible] = useState(false);

          const toggleShare = () => {
            setShareVisible(!shareVisible);
          };

          const handleLike = () => setLiked(!liked);
          const handleShare = () => {
            setShared(true);
            setTimeout(() => setShared(false), 2000); // Reset after 2 seconds
          };
          const handleCommentSubmit = () => {
            if (commentInput.trim() !== "") {
              setComments([...comments, commentInput]);
              setCommentInput("");
            }
          };

          const handleDelete = (index) => {
            products.splice(index, 1);
            setMenuIndex(null);
          };

          const handleEdit = (index) => {
            alert(`Edit post at index ${index}`);
            setMenuIndex(null);
          };

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 p-6"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() =>
                      setMenuIndex(menuIndex === index ? null : index)
                    }
                    className="text-gray-700 bg-white rounded-full shadow p-1 hover:text-gray-900"
                  >
                    ⋮
                  </button>
                  {menuIndex === index && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-20">
                      <button
                        onClick={() => handleEdit(index)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {p.file ? (
                  <img
                    src={URL.createObjectURL(p.file)}
                    alt="Uploaded"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="bg-gray-50 p-4 rounded-md shadow-sm w-full">
                <p className="text-sm text-gray-500 mb-1">
                  Category: {p.category}
                </p>
                <p className="text-gray-700 mb-2">{p.content}</p>
                <p className="text-xs text-gray-400">File: {p.file?.name}</p>
              </div>

              {/* Like, Comment, Share buttons */}
              <div className="flex justify-around mt-4 text-gray-500">
              <button
  onClick={handleLike}
  className="flex items-center gap-1 text-gray-600"
>
  {liked ? (
    <FaThumbsUp className="text-blue-600" />
  ) : (
    <FaRegThumbsUp className="text-gray-500" />
  )}
  <span>Like</span>
</button>


                <button
                  onClick={() => setCommentsVisible(!commentsVisible)}
                  className={`flex items-center gap-1 ${
                    commentsVisible ? "text-blue-600" : ""
                  }`}
                >
                  💬 Comment
                </button>
                <button
                  onClick={toggleShare}
                  className={`flex items-center gap-1 ${
                    shareVisible ? "text-blue-600" : ""
                  }`}
                >
                  🔁 Share
                </button>
              </div>
              {shareVisible && (
                <div className="flex gap-4 justify-center mt-3">
                  <a
                    href={`https://wa.me/?text=Check%20this%20out!%20${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    📱 WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    📘 Facebook
                  </a>
                </div>
              )}

              {/* Comments Section */}
              {commentsVisible && (
                <div className="mt-4 border-t pt-4">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border rounded px-3 py-2 text-sm mb-2"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Post
                  </button>

                  {/* List of comments */}
                  <div className="mt-3 space-y-2">
                    {comments.map((comment, i) => (
                      <div key={i} className="bg-gray-100 rounded p-2 text-sm">
                        {comment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductList;
