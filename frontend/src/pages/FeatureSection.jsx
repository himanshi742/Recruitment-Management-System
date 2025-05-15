import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBriefcase, FaRegFileAlt, FaCertificate } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to handle navigation
  const handleNavigation = (path) => {
    if (token) {
      navigate(path);
    } else {
      toast.error("Please login to access this feature");
    }
  };

  return (
    <section className="bg-gray-200 text-black py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

      <div className="flex items-center justify-center space-x-8">
        <div onClick={() => handleNavigation("/jobs")} className="cursor-pointer">
          <FeatureCard
            icon={<FaBriefcase size={40} color="#8AB2A6" />}
            title="Top Job Listings"
            description="Browse through top job opportunities globally."
          />
        </div>

        <div onClick={() => handleNavigation("/resume")} className="cursor-pointer">
          <FeatureCard
            icon={<FaRegFileAlt size={40} color="#ACD3A8" />}
            title="Resume Builder"
            description="Create professional resumes easily."
          />
        </div>

        <div onClick={() => handleNavigation("/certifications")} className="cursor-pointer">
          <FeatureCard
            icon={<FaCertificate size={40} color="#8AB2A6" />}
            title="Certifications"
            description="Get certified in AWS, Azure, and more."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
