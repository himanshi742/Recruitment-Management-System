import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/jobs";

// ✅ Fetch all jobs
export const getJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const getRecruiterJobs = async () => {
  try {
    const recruiterId = localStorage.getItem("id"); // Retrieve recruiterId from localStorage
    const response = await axios.get(`${API_URL}/recruiterjobs`, {
      headers: {
        recruiterId: recruiterId, // Send recruiterId as a header
      },
    });
    return response.data;
  } catch (error) {
    
    console.error("Error fetching jobs:", error);
    return [];
  }
};


//Fetch job by search term
export const getJobBysearchterm = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/searchTerm`, {
      headers: {
        search_term: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};


// ✅ Add a new job
export const addJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, jobData);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to add job";
    toast.error(message);
    return null;  
  }
};

//update a job
export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to update job";
    toast.error(message);
    return null;  
  }
};


// ✅ Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    return null;
  }
};
