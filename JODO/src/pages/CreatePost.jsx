import { useState, useEffect } from "react";
import { createPost, uploadImage, getCurrentUser, updatePost } from "../api/appwrite";
import { useNavigate, useLocation } from "react-router-dom";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function CreatePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.post;

  const [title, setTitle] = useState(editingPost ? editingPost.title : "");
  const [description, setDescription] = useState(editingPost ? editingPost.description : "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setDescription(editingPost.description || "");
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("Please log in first.");
        setLoading(false);
        return;
      }
  
      let imageUrl = editingPost ? editingPost.imageUrl : "";
      let mediaType = editingPost ? editingPost.mediaType : "";
      if (image) { // image should be your selected file state
        imageUrl = await uploadImage(image);
        mediaType = image.type;
        console.log("Uploaded Image URL:", imageUrl);
      } else if (!editingPost) {
        console.log("No image selected, skipping upload.");
      }
  
      const slug = title.toLowerCase().replace(/\s+/g, "-");
  
      if (editingPost) {
        await updatePost(editingPost.$id, { title, description, imageUrl, mediaType });
        alert("Post updated successfully!");
        navigate("/");
      } else {
        await createPost(title, description, imageUrl, user.$id, user.name, slug, mediaType);
        alert("Post created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Create/Update Post Error:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {loading && <Loader />}
      <div className="max-w-xl w-full p-12 bg-[#16181c] text-white rounded-2xl shadow-lg border border-[#222]">
        <h1 className="text-3xl font-bold mb-8 text-center">{editingPost ? "Update Post" : "Create New Post"}</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#23272f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-[#23272f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
          {/* Drag and Drop File Upload */}
          <div
            className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer ${dragActive ? "border-blue-400 bg-[#23272f]" : "border-[#333] bg-[#23272f]"}`}
            style={{ minHeight: "120px" }}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
          >
            {image ? (
              image.type.startsWith("video/") ? (
                <video controls className="max-h-32 rounded mb-2 mt-2">
                  <source src={URL.createObjectURL(image)} type={image.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-32 rounded mb-2 mt-2"
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <span className="text-gray-400">Drag & drop an image or video here, or <span className="text-blue-400 underline">click to select</span></span>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (editingPost ? "Updating..." : "Posting...") : (editingPost ? "Update" : "Post")}
          </button>
        </form>
      </div>
    </div>
  );
}
