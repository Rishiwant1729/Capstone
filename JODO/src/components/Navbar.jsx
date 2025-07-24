import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../api/appwrite";
import { useEffect, useState } from "react";
import { AiFillHome, AiOutlineUser, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineAppstore } from "react-icons/ai";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
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

  // Responsive transform: only slide on mobile
  const sidebarStyle = {
    ...(window.innerWidth < 640
      ? { transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)' }
      : { transform: 'none' }),
  };

  return (
    <aside
      className={`bg-black text-white h-screen w-64 flex-col justify-between fixed left-0 top-0 p-6 z-50
        ${mobileOpen ? 'flex' : 'hidden'} sm:flex
        transition-transform duration-300
      `}
      style={sidebarStyle}
    >
      {/* Mobile close button */}
      <div className="sm:hidden flex justify-end mb-6">
        <button onClick={() => setMobileOpen(false)} className="text-white text-2xl focus:outline-none">
          &times;
        </button>
      </div>
      <div>
        <div className="flex items-center text-2xl font-bold mb-10">
          <span className="mr-3">
            {/* Old Twitter logo SVG in white */}
            <svg viewBox="0 0 24 24" width="32" height="32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.014-4.49 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.555 1.67 4.905a4.48 4.48 0 0 0-.61 2.262c0 1.56.793 2.936 2.003 3.744a4.48 4.48 0 0 1-2.034-.563v.057c0 2.18 1.55 4.002 3.604 4.418a4.48 4.48 0 0 1-2.027.077c.572 1.785 2.23 3.084 4.195 3.12A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583a9.14 9.14 0 0 0 2.24-2.337z"/>
              </g>
            </svg>
          </span>
          JODO
        </div>
        <nav className="flex flex-col space-y-6">
          <Link to="/" className="flex items-center space-x-3 text-lg hover:text-blue-400">
            <AiFillHome size={24} />
            <span>Home</span>
          </Link>
          <Link to="/jobs" className="flex items-center space-x-3 text-lg hover:text-blue-400">
            <AiOutlineAppstore size={24} />
            <span>Jobs</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 text-lg hover:text-blue-400">
            <AiOutlineUser size={24} />
            <span>Profile</span>
          </Link>
          {user ? (
            <button onClick={handleLogout} className="flex items-center space-x-3 text-lg hover:text-red-400 bg-transparent border-none outline-none">
              <AiOutlineLogout size={24} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/signin" className="flex items-center space-x-3 text-lg hover:text-blue-400">
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
      <div>
        <Link to="/create-post">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-lg font-semibold flex items-center justify-center space-x-2">
            <AiOutlinePlusCircle size={24} />
            <span>New Post</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
