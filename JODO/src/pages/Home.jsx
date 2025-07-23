import { useEffect, useState } from "react";
import { getPosts, likePost } from "../api/appwrite";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      console.log("Fetched posts:", res.documents); // Debugging
      setPosts(res.documents);
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId, currentLikes) => {
    console.log(`Liking post ${postId}, current likes: ${currentLikes}`); // Debugging
    await likePost(postId, currentLikes);
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.$id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts Feed</h1>
      {posts.length === 0 ? (
        <p className="text-center">No posts yet.</p>
      ) : (
        posts.map((post) => {
          console.log("Rendering post:", post); // Debugging each post
          console.log("Image URL:", post.imageUrl); // Debugging image URL

          return (
            <div key={post.$id} className="bg-white p-4 mb-4 shadow rounded">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded border border-red-500"
                />
              ) : (
                <p className="text-gray-400">No image for this post.</p>
              )}

              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700 mb-2">{post.description}</p>
              <p className="text-sm text-gray-500">By {post.userName}</p>
              <button
                onClick={() => handleLike(post.$id, post.likes)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                👍 {post.likes} Likes
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
