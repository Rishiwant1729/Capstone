import { useEffect, useState } from "react";
import { getPosts, likePost, deletePost, getCurrentUser } from "../api/appwrite";
import { AiOutlineLike, AiOutlineDelete, AiOutlineMore, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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

function PostImage({ src, alt, mediaType }) {
  const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
  const [imgError, setImgError] = useState(false);
  const isVideo = mediaType
    ? mediaType.startsWith("video/")
    : imgError; // fallback: if image fails, try video
  const aspectRatio = imgDims.height / imgDims.width;
  let containerHeight = 320;
  let containerWidth = 320;
  if (isVideo) {
    containerHeight = 500;
    containerWidth = 320;
  } else if (aspectRatio > 1.2) {
    containerHeight = 500; // portrait
    containerWidth = 260;
  } else if (aspectRatio < 0.8) {
    containerHeight = 220; // landscape
    containerWidth = 420;
  } else {
    containerHeight = 320; // square/normal
    containerWidth = 320;
  }
  return (
    <div className="w-full flex justify-center">
      <div
        className="flex justify-center items-center bg-black rounded-xl overflow-hidden border border-gray-800"
        style={{ width: containerWidth, height: containerHeight }}
      >
        {isVideo ? (
          <video controls autoPlay muted className="w-full h-full object-contain bg-black">
            <source src={src} type={mediaType || undefined} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onLoad={e => setImgDims({ width: e.target.naturalWidth, height: e.target.naturalHeight })}
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which posts are expanded
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState({}); // Track which post's menu is open
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      setPosts(res.documents);
    };
    fetchPosts();
    getCurrentUser().then(setCurrentUser);
  }, []);

  const handleLike = async (postId, currentLikes) => {
    await likePost(postId, currentLikes);
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.$id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((p) => p.$id !== postId));
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  const handleUpdate = (post) => {
    navigate("/create-post", { state: { post } });
  };

  const toggleExpand = (postId) => {
    setExpanded((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleMenu = (postId) => {
    setMenuOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const closeMenu = () => setMenuOpen({});

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
              <div key={post.$id} className="bg-[#16181c] text-white rounded-2xl shadow mb-8 p-0 overflow-hidden border border-[#222] relative">
                {/* Hamburger menu on every post */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(post.$id);
                    }}
                    className="text-gray-400 hover:text-white p-2 rounded-full focus:outline-none"
                    title="Post options"
                  >
                    <AiOutlineMore size={22} />
                  </button>
                  {menuOpen[post.$id] && (
                    <div className="absolute right-0 mt-2 w-32 bg-[#23272f] border border-[#333] rounded shadow-lg z-20">
                      {currentUser && post.userId === currentUser.$id ? (
                        <>
                          <button
                            onClick={() => { handleUpdate(post); closeMenu(); }}
                            className="flex items-center w-full px-4 py-2 text-blue-400 hover:bg-[#181a1f] hover:text-blue-500 text-left border-b border-[#333]"
                          >
                            <AiOutlineEdit className="mr-2" /> Update
                          </button>
                          <button
                            onClick={() => { handleDelete(post.$id); closeMenu(); }}
                            className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-[#181a1f] hover:text-red-600 text-left"
                          >
                            <AiOutlineDelete className="mr-2" /> Delete
                          </button>
                        </>
                      ) : (
                        <div className="px-4 py-2 text-gray-400 text-sm">No actions available</div>
                      )}
                    </div>
                  )}
                </div>
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
                  <PostImage src={post.imageUrl} alt={post.title} mediaType={post.mediaType} />
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
      <div className="hidden lg:block ml-8 w-96">
        <div className="bg-[#16181c] rounded-xl p-8 shadow border border-[#222] mt-2 sticky top-8 min-h-[400px]">
          <div className="text-2xl font-bold text-white mb-4">Suggested for you</div>
          <div className="space-y-4">
            {SUGGESTED_USERS.map((user) => (
              <div key={user.username} className="flex items-center bg-[#23272f] rounded-lg px-4 py-3 border border-[#222] text-gray-200">
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
