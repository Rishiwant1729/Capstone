import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../api/appwrite";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user on mount
  const fetchUser = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">LinkedIn Clone</div>
      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/profile">Profile</Link>

        {!user ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <img
              src={user.profileImageUrl || "/avatar.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
