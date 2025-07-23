import { useEffect, useState } from "react";
import { applyForJob, getAppliedJobs } from "../api/appwrite";
import { getCurrentUser } from "../api/appwrite";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // store job titles user applied
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      // Fetch external jobs
      const res = await fetch("https://jsonfakery.com/jobs");
      const data = await res.json();
      setJobs(data);
    };

    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        // Fetch applied jobs from Appwrite
        const applied = await getAppliedJobs(currentUser.$id);
        setAppliedJobs(applied.documents.map((job) => job.jobTitle));
      }
    };

    fetchJobs();
    fetchUser();
  }, []);

  const handleApply = async (job) => {
    if (!user) {
      alert("You must be logged in to apply.");
      return;
    }

    // Disable apply button for this job
    setAppliedJobs((prev) => [...prev, job.title]);

    const res = await applyForJob(job.title, job.company, user.$id);

    if (res.alreadyApplied) {
      alert(`You already applied for ${job.title} at ${job.company}`);
    } else {
      alert(`You applied for ${job.title} at ${job.company}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-center">No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 mb-4 shadow rounded">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-700 mb-2">{job.description}</p>
            <p className="text-sm text-gray-500">Company: {job.company}</p>
            <p className="text-sm text-gray-500">Location: {job.location}</p>

            <button
              onClick={() => handleApply(job)}
              disabled={appliedJobs.includes(job.title)}
              className={`mt-2 px-3 py-1 rounded ${
                appliedJobs.includes(job.title)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              {appliedJobs.includes(job.title) ? "Applied" : "Apply"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
