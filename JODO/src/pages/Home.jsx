import { useEffect, useState } from "react";
import { getPosts, likePost } from "../api/appwrite";
import { AiOutlineLike } from "react-icons/ai";

const SUGGESTED_USERS = [
  {
    username: "john_doe",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    username: "jane_smith",
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    username: "alex_king",
    name: "Alex King",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    username: "emma_wilson",
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    username: "mike_ross",
    name: "Mike Ross",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which posts are expanded

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      setPosts(res.documents);
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId, currentLikes) => {
    await likePost(postId, currentLikes);
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.$id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const toggleExpand = (postId) => {
    setExpanded((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="flex justify-center bg-black min-h-screen py-8">
      {/* Feed area */}
      <div className="w-full max-w-2xl">
        {posts.length === 0 ? (
          <p className="text-center text-white">No posts yet.</p>
        ) : (
          posts.map((post) => {
            const desc = post.description || "";
            const isLong = desc.length > 70;
            const showFull = expanded[post.$id];
            return (
              <div key={post.$id} className="bg-[#16181c] text-white rounded-2xl shadow mb-8 p-0 overflow-hidden border border-[#222]">
                {/* User info */}
                <div className="flex items-center px-5 pt-5 pb-2">
                  <img
                    src={post.profileImageUrl || "/avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-700 mr-3"
                  />
                  <div>
                    <div className="font-semibold">{post.userName || "Unknown"}</div>
                    <div className="text-xs text-gray-400">@{post.userName?.toLowerCase().replace(/\s+/g, "") || "user"} • {post.$createdAt ? new Date(post.$createdAt).toLocaleDateString() : ""}</div>
                  </div>
                </div>
                {/* Post text */}
                <div className="px-5 pb-2 pt-1">
                  <div className="mb-2 text-base">{post.title}</div>
                  <div className="mb-2 text-gray-300 text-sm break-words whitespace-pre-line">
                    {isLong && !showFull ? (
                      <>
                        {desc.slice(0, 70)}... <button className="text-blue-400 hover:underline" onClick={() => toggleExpand(post.$id)}>more</button>
                      </>
                    ) : (
                      <>
                        {desc} {isLong && showFull && <button className="text-blue-400 hover:underline" onClick={() => toggleExpand(post.$id)}>less</button>}
                      </>
                    )}
                  </div>
                </div>
                {/* Post image */}
                {post.imageUrl && (
                  <div className="w-full flex justify-center">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full max-h-[600px] object-cover rounded-xl border border-gray-800"
                    />
                  </div>
                )}
                {/* Action icons */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-[#222] mt-2 text-gray-400 text-lg">
                  <div className="flex items-center">
                    <button onClick={() => handleLike(post.$id, post.likes)} className="flex items-center cursor-pointer focus:outline-none">
                      <AiOutlineLike className="mr-1" size={22} />{post.likes}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Right sidebar: Suggested for you */}
      <div className="hidden lg:block ml-8 w-80">
        <div className="bg-[#16181c] rounded-xl p-6 shadow border border-[#222] mt-2 sticky top-8">
          <div className="text-base font-bold text-white mb-4">Suggested for you</div>
          <div className="space-y-4">
            {SUGGESTED_USERS.map((user) => (
              <div key={user.username} className="flex items-center">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover border-2 border-white mr-3" />
                <div>
                  <div className="font-semibold text-sm text-white">{user.username}</div>
                  <div className="text-xs text-gray-400">recommended</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
