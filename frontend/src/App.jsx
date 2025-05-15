import React, { useState } from "react";
import Header from "./pages/Header";
import HeroSection from "./pages/HeroSection";
import FeatureSection from "./pages/FeatureSection";
import Footer from "./pages/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import JobsPage from "./pages/JobsPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import CertificationPage from "./pages/CertificationPage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import MyJobs from "./pages/MyJobs";
import ChatBotWidget from "./pages/ChatBotWidget";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <ChatBotWidget />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/certifications" element={<CertificationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
