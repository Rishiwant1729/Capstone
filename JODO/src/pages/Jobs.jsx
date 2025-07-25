import { useEffect, useState } from "react";
import { applyForJob, getAppliedJobs } from "../api/appwrite";
import { getCurrentUser } from "../api/appwrite";
import { AiOutlineRocket } from "react-icons/ai";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // store job titles user applied
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

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

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const SUGGESTED_TECH_JOBS = [
    "Frontend Developer at Google",
    "Backend Engineer at Amazon",
    "Full Stack Dev at Microsoft",
    "DevOps Engineer at Netflix",
    "Data Scientist at Facebook",
    "AI Engineer at OpenAI",
    "Cloud Architect at IBM",
  ];

  return (
    <div className="flex justify-center bg-black min-h-screen py-8 px-2">
      <div className="w-full max-w-2xl px-0 sm:px-4">
        {jobs.length === 0 ? (
          <p className="text-center text-white">No jobs available.</p>
        ) : (
          <>
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-[#16181c] text-white rounded-2xl border border-[#222] shadow p-3 sm:p-4 mb-4 min-h-[160px] w-full">
                <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                <p className="mb-2 text-gray-300 text-base">{job.description}</p>
                <p className="text-xs text-gray-400 mb-0.5">Company: {job.company}</p>
                <p className="text-xs text-gray-400 mb-2">Location: {job.location}</p>

                <button
                  onClick={() => handleApply(job)}
                  disabled={appliedJobs.includes(job.title)}
                  className={`mt-2 px-4 py-2 rounded font-semibold transition-colors duration-200 w-full
                    ${appliedJobs.includes(job.title)
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"}
                  `}
                >
                  {appliedJobs.includes(job.title) ? "Applied" : "Apply"}
                </button>
              </div>
            ))}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    {/* Right sidebar: Suggested for you */}
      <div className="hidden lg:block ml-16 w-96">
        <div className="bg-[#16181c] rounded-xl p-8 shadow border border-[#222] mt-2 sticky top-8">
          <div className="text-base font-bold text-white mb-4">Suggested for you</div>
          <div className="space-y-4">
            {SUGGESTED_TECH_JOBS.map((job, idx) => (
              <div key={idx} className="flex items-center bg-[#23272f] rounded-lg px-4 py-3 border border-[#222] text-gray-200">
                <AiOutlineRocket className="mr-3 text-blue-400" size={22} />
                <span className="text-base font-medium">{job}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
