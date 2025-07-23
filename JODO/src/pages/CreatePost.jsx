import { useState } from "react";
import { createPost, uploadImage, getCurrentUser } from "../api/appwrite";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("Please log in first.");
        return;
      }
  
      let imageUrl = "";
      if (image) { // image should be your selected file state
        imageUrl = await uploadImage(image);
        console.log("Uploaded Image URL:", imageUrl);
      } else {
        console.log("No image selected, skipping upload.");
      }
  
      const slug = title.toLowerCase().replace(/\s+/g, "-");
  
      await createPost(title, description, imageUrl, user.$id, user.name, slug);
  
      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Create Post Error:", error.message);
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
          accept="image/*"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
