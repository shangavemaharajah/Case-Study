import React, { useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../Hook/UseAuthContext"; // Adjust path as needed

const Post = ({ userId, token }) => {
  const { user } = useAuthContext(); // Get current user info
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image: null,
    link: "",
    previewImage: null,
  });

  const BASE_URL = import.meta.env.VITE_FRONT_END_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set submitting state
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", user.message); // From your auth context
      formDataToSend.append("date", new Date().toISOString());
      formDataToSend.append("caption", formData.caption);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("linkRef", formData.link);
      formDataToSend.append("userId", userId);
      formDataToSend.append("image", formData.image);

      const response = await fetch(`${BASE_URL}/post/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Post creation failed");
      }

      const result = await response.json();
      console.log("Post created:", result);

      setIsModalOpen(false);
      setFormData({
        title: "",
        caption: "",
        image: null,
        link: "",
        previewImage: null,
      });
    } catch (error) {
      console.error("Post submission error:", error);
      // Add user-facing error message here
    } finally {
      setIsSubmitting(false); // Ensure button is re-enabled
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      previewImage: null,
    }));
  };
  return (
    <div className="p-4">
      {/* Main container */}
      <div className="flex items-start space-x-3">
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Input and Buttons */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Share your information with the world
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-colors"
            >
              Post zone
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Create Post</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                {/* Title Field */}
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter a title"
                    required
                  />
                </div>

                {/* Caption Field */}
                <div>
                  <label className="block text-gray-700 mb-1">Caption</label>
                  <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    rows="3"
                    placeholder="Write your caption here..."
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 mb-1">Image</label>
                  {formData.previewImage ? (
                    <div className="relative">
                      <img
                        src={formData.previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaImage className="text-gray-400 text-3xl mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload an image
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>

                {/* Link Field */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 w-full py-2 rounded ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-500"
                } text-white hover:bg-blue-600 transition-colors`}
              >
                {isSubmitting ? "Submitting..." : "Create Post"}
              </button>
            </form>
            
                      </div>
        </div>
      )}
    </div>
  );
};

export default Post;
