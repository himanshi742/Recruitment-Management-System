import { useState, useEffect } from "react";
import { addJob, updateJob, deleteJob, getRecruiterJobs } from "../../services/jobService"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ApplicantManagement from "./ApplicantManagement";
import CertificateManagement from "./CertificateManagement";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null); //Tracking the job being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recruiterId = localStorage.getItem("id");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const jobsData = await getRecruiterJobs();
    setJobs(jobsData);
  };

  //Handle opening modal for adding/editing job
  const openModal = (job = null) => {
    setCurrentJob(job || { title: "", company: "", location: "", salary: "", type: "", description: "" , recruiterId: recruiterId });
    setIsModalOpen(true);
  };

  //Handle form submission (add or update)
  const handleJobSubmit = async (e) => {
    e.preventDefault();
  
    let result = null;
  
    if (currentJob._id) {
      result = await updateJob(currentJob._id, currentJob);
      if (result) {
        setJobs(jobs.map((job) => (job._id === result._id ? result : job)));
        fetchJobs();
      }
    } else {
      result = await addJob(currentJob);
      if (result) {
        setJobs([...jobs, result.job]);
      }
    }
  
    // Only close modal if operation succeeded
    if (result) {
      setIsModalOpen(false);
      setCurrentJob(null);
    }
  };
  

  // Handle deleting a job
  const handleDeleteJob = async (id) => {
    const deleted = await deleteJob(id);
    if (deleted) setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <Card className="mb-6">
        <CardContent>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Manage Jobs</h2>
            <Button onClick={() => openModal()} className="flex items-center cursor-pointer justify-center">
              <Plus className="w-4 h-4 mr-2" /> Add Job
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Button  variant="outline" size="sm" className="mr-2 cursor-pointer" onClick={() => openModal(job)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm" cl onClick={() => handleDeleteJob(job._id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Job Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{currentJob._id ? "Edit Job" : "Add New Job"}</h2>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={currentJob.title}
                onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={currentJob.company}
                onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={currentJob.location}
                onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Salary"
                value={currentJob.salary}
                onChange={(e) => setCurrentJob({ ...currentJob, salary: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <select
                value={currentJob.type}
                onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                className="border p-2 w-full"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <textarea
                placeholder="Job Description"
                value={currentJob.description}
                onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                className="border p-2 w-full"
                required
              ></textarea>

              <div className="flex justify-end space-x-2">
                <Button className="cursor-pointer" type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="cursor-pointer" type="submit">{currentJob._id ? "Update Job" : "Add Job"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ApplicantManagement />
      <CertificateManagement />
    </div>
  );
};

export default RecruiterDashboard;
