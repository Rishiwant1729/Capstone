import { useState } from "react";
import { login } from "../api/appwrite";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to Home after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-2">
      <div className="max-w-md w-full p-6 sm:p-10 bg-[#16181c] text-white rounded-2xl shadow-lg border border-[#222]">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#23272f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#23272f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-gray-400">Don't have an account?</span>
          <button
            onClick={() => navigate('/signup')}
            className="ml-2 text-blue-400 hover:underline font-semibold"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}
