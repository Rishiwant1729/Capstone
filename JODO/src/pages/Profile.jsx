import { useEffect, useState } from "react";
import { getCurrentUser, getAppliedJobs } from "../api/appwrite";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        // Fetch jobs for this user
        const jobsRes = await getAppliedJobs(currentUser.$id);
        setAppliedJobs(jobsRes.documents);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p className="text-center mt-10 text-white">Loading profile...</p>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-black py-20 px-2">
      {/* Profile Card */}
      <div className="bg-[#16181c] rounded-2xl shadow-lg p-12 flex flex-col items-center w-full max-w-lg mx-auto mt-8">
        <img
          src={user.profileImageUrl || "/avatar.png"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-white mb-6 shadow"
        />
        <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
        <p className="text-gray-300 mb-2 text-lg">{user.email}</p>
        {/* Dummy description */}
        <p className="text-gray-400 text-center mb-4 text-base">Passionate developer. Love building cool things and learning new tech. Coffee enthusiast ☕️ | Open to opportunities!</p>
        <div className="w-full border-t border-[#222] my-6"></div>
        <div className="flex items-center justify-center space-x-12 w-full mt-2">
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold">{appliedJobs.length}</span>
            <span className="text-gray-400 text-base font-semibold mt-1">Jobs Applied</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold">1,234</span>
            <span className="text-gray-400 text-base font-semibold mt-1">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold">567</span>
            <span className="text-gray-400 text-base font-semibold mt-1">Following</span>
          </div>
        </div>
      </div>
      {/* Applied Jobs List (right side on large screens) */}
      <div className="hidden lg:block ml-12 w-96 mr-16 flex-shrink-0 mt-8">
        <div className="bg-[#16181c] rounded-2xl p-6 shadow border border-[#222] sticky top-8 pt-0 min-h-[420px]">
          <div className="text-base font-bold text-white mb-4">Applied Jobs</div>
          {appliedJobs.length === 0 ? (
            <p className="text-gray-400">No jobs applied yet.</p>
          ) : (
            <ul className="space-y-3">
              {appliedJobs.map((job) => (
                <li key={job.$id} className="bg-[#23272f] rounded-lg px-4 py-3 border border-[#222] text-gray-200">
                  <div className="font-semibold text-base">{job.jobTitle}</div>
                  <div className="text-xs text-gray-400">{job.company}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

