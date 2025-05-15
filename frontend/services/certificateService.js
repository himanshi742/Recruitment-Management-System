import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/certificate"; 

export const getCertificates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Certificates:", error);
    return [];
  }
};

export const getRecruiterCertificate = async () => {
  try {
    const recruiterId = localStorage.getItem("id"); // Retrieve recruiterId from localStorage
    const response = await axios.get(`${API_URL}/recruitercertificate`, {
      headers: {
        recruiterId: recruiterId, // Send recruiterId as a header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return [];
  }
};

export const addCertificate = async (CertificateData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, CertificateData);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.error || "Failed to add certificate";
    toast.error(message);
    return null;
  }
};

export const updateCertificate = async (id, CertificateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, CertificateData);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.error || "Failed to update certificate";
    toast.error(message);
    return null;
  }
};

export const deleteCertificate = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting Certificate:", error);
    return false;
  }
};
