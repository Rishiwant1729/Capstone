import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex">
       {/* Mobile Hamburger */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-40 bg-black flex items-center h-14 px-4 border-b border-[#222]">
        <button onClick={() => setSidebarOpen((v) => !v)} className="text-white text-2xl focus:outline-none">
          <AiOutlineMenu />
        </button>
        <span className="ml-4 text-xl font-bold">JODO</span>
      </div>
       { /* Sidebar: always on desktop, toggled on mobile */}
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
      <div className="w-px h-screen bg-white opacity-50 sticky top-0 hidden sm:block z-40" style={{ minWidth: '0.5px' }} />
      <div className="flex-1 bg-gray-100 min-h-screen ml-0 sm:ml-64 pt-14 sm:pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  );
}
