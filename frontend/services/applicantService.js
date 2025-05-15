import axios from "axios";

const BASE_URL = "http://localhost:5000/api/applicants";

// Create new applicant
export const applyForJob = async (applicantData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, applicantData);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
};

// Get all applicants
export const getApplicants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recruiter/${localStorage.getItem("id")}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};

// Delete applicant by ID
export const deleteApplicant = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting applicant:", error);
    return false;
  }
};

export const updateApplicantStatus = async (id, status) => {
  const res = await axios.put(`${BASE_URL}/${id}/status`, { status });
  return res.data;
};