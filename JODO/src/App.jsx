import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-px h-screen bg-white opacity-50 sticky top-0" style={{ minWidth: '0.5px' }} />
      <div className="flex-1 bg-gray-100 min-h-screen ml-64">
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
