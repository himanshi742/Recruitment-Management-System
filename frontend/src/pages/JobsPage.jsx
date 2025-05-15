import { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const API_URL = "http://localhost:5000/api/jobs";
const FILTERED_API_URL = "http://localhost:5000/api/jobs/filteredJobs";
const APPLY_API_URL = "http://localhost:5000/api/applicants";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedWorkType, setSelectedWorkType] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [applicantData, setApplicantData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [jobalertEmail, setJobAlertEmail] = useState("");

  const location = useLocation();
  const homepagesearch = location.state?.HomepageSearch || "";

  useEffect(() => {
    if (homepagesearch) {
      setSearch(homepagesearch);
    }
  }, [homepagesearch]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await axios.get(FILTERED_API_URL, {
          headers: {
            Salary: selectedSalary.join(","),
            Location: selectedLocation.join(","),
            WorkType: selectedWorkType.join(","),
          },
        });
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
      }
    };
    fetchFilteredJobs();
  }, [selectedSalary, selectedLocation, selectedWorkType]);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  const handleCheckboxToggle = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    const applicantId = localStorage.getItem("id");

    if (!applicantId) {
      toast.error("You must be logged in to apply.");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLY_API_URL}/apply/${selectedJob._id}`,
        {
          ...applicantData,
          applicantId,
        }
      );

      toast.success(res.data.message);
      setShowForm(false);
      setApplicantData({ name: "", email: "", phone: "", resumeUrl: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
    }
  };

  const notify = () => {
    if (!emailRegex.test(jobalertEmail)) {
      toast.error("Please enter a valid email address.");
    } else {
      toast.success(`${jobalertEmail} registered successfully`);
    }
  };

  return (
    <div className="min-h-screen flex m-1 rounded-2xl">
      {/* Sidebar */}
      <aside className="w-1/6 p-6 rounded-l-2xl">
        <h2 className="text-lg font-bold mb-4">Salary Range</h2>
        {["650000", "1000000", "1500000"].map((range, index) => (
          <div key={index} className="flex items-center mb-2">
            <Checkbox
              checked={selectedSalary.includes(range)}
              onCheckedChange={() =>
                handleCheckboxToggle(range, setSelectedSalary)
              }
            />
            <span className="ml-1.5">{range}</span>
          </div>
        ))}

        <h2 className="text-lg font-bold mt-6 mb-4">Location</h2>
        {[...new Set(jobs.map((job) => job.location))].map((city, index) => (
          <div key={index} className="flex items-center mb-2">
            <Checkbox
              checked={selectedLocation.includes(city)}
              onCheckedChange={() =>
                handleCheckboxToggle(city, setSelectedLocation)
              }
            />
            <span className="ml-1.5">{city}</span>
          </div>
        ))}

        <h2 className="text-lg font-bold mt-6 mb-4">Work Type</h2>
        {["Contract", "Full-time", "Part-time", "Internship"].map(
          (type, index) => (
            <div key={index} className="flex items-center mb-2">
              <Checkbox
                checked={selectedWorkType.includes(type)}
                onCheckedChange={() =>
                  handleCheckboxToggle(type, setSelectedWorkType)
                }
              />
              <span className="ml-1.5">{type}</span>
            </div>
          )
        )}
      </aside>

      {/* Jobs */}
      <main className="w-[59%] p-6">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Search job title"
            className="flex-grow p-3 rounded-md border-1 border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="bg-[#8AB2A6] hover:bg-[#66847b] text-black px-4">
            Find offers
          </Button>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="p-6 shadow-md rounded-lg flex flex-col bg-white gap-2"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{job.company}</h3>
                  <p className="text-gray-500">{job.posted}</p>
                </div>
                <h4 className="text-xl font-bold">{job.title}</h4>
                <div className="flex gap-10">
                  <p className="text-gray-600 flex items-center">
                    <FaMoneyBillWave className="mr-2" />₹{job.salary}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaBriefcase className="mr-2" /> {job.type}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> {job.location}
                  </p>
                </div>
                <p className="mt-2 text-gray-700">
                  {job.description}{" "}
                  <span className="text-black cursor-pointer">
                    Read more...
                  </span>
                </p>
                <Button
                  className="bg-[#8AB2A6] hover:bg-[#6e998a] text-black w-[20%]"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowForm(true);
                  }}
                >
                  Apply Now
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg font-semibold mt-6">
              No jobs found. Try adjusting your search or filters.
            </p>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 p-6 rounded-r-2xl space-y-6">
        <div className="p-4 bg-[#3E3F5B] text-white rounded-md">
          <h3 className="font-bold mb-2">Create a Job Alert</h3>
          <p>Enter your email to receive job updates.</p>
          <input
            onChange={(e) => setJobAlertEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            className="w-full mt-2 p-2 border border-black text-white rounded-md"
          />
          <Button
            onClick={notify}
            className="mt-3 bg-[#8AB2A6] hover:bg-[#66847b] text-black px-4 w-full"
          >
            Subscribe
          </Button>
        </div>
      </aside>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700/50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              Apply for {selectedJob?.title}
            </h2>
            <form onSubmit={handleApplySubmit}>
              <Input
                type="text"
                placeholder="Your Name"
                value={applicantData.name}
                onChange={(e) =>
                  setApplicantData({ ...applicantData, name: e.target.value })
                }
                className="mb-3"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={applicantData.email}
                onChange={(e) =>
                  setApplicantData({ ...applicantData, email: e.target.value })
                }
                className="mb-3"
                required
              />
              <Input
                type="number"
                placeholder="Phone Number"
                value={applicantData.phone}
                onChange={(e) =>
                  setApplicantData({ ...applicantData, phone: e.target.value })
                }
                className="mb-3"
                required
              />
              <Input
                type="url"
                placeholder="Resume URL (e.g. Google Drive, Dropbox)"
                value={applicantData.resumeUrl}
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    resumeUrl: e.target.value,
                  })
                }
                className="mb-3"
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setApplicantData({
                      name: "",
                      email: "",
                      phone: "",
                      resumeUrl: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#8AB2A6] text-black">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
