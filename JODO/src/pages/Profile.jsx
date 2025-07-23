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
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Left Section: User Info */}
      <div className="bg-white p-4 shadow rounded col-span-2">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg mt-4">
          <strong>Jobs Applied:</strong> {appliedJobs.length}
        </p>
      </div>

      {/* Right Section: Applied Jobs Sidebar */}
      <div className="bg-gray-100 p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-3">Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          <ul className="space-y-2">
            {appliedJobs.map((job) => (
              <li key={job.$id} className="bg-white p-2 shadow rounded">
                <p className="font-semibold">{job.jobTitle}</p>
                <p className="text-sm text-gray-600">{job.company}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
