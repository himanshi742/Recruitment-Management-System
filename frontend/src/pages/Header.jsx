import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import {
  FaUserCircle,
  FaBriefcase,
  FaCertificate,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="p-4 bg-[#3E3F5B] text-white m-1 rounded-2xl flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center space-x-2">
      <img src="/logo.png" className="ml-3.5 h-16 w-20" alt="JobSphere" />
      </Link>

      <nav>
        <ul className="flex space-x-6 items-center justify-center">
          {/* Role-based navigation */}
          {role === "applicant" && (
            <>
              <li>
                <Link
                  to="/jobs"
                  onClick={() => setSelected("jobs")}
                  className={`flex items-center space-x-1 transition ${
                    selected === "jobs"
                      ? "text-[#ACD3A8]"
                      : "hover:text-[#ACD3A8]"
                  }`}
                >
                  <FaBriefcase />
                  <span>Jobs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  onClick={() => setSelected("resume")}
                  className={`flex items-center space-x-1 transition ${
                    selected === "resume"
                      ? "text-[#ACD3A8]"
                      : "hover:text-[#ACD3A8]"
                  }`}
                >
                  <FaUserCircle />
                  <span>Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/certifications"
                  onClick={() => setSelected("certifications")}
                  className={`flex items-center space-x-1 transition ${
                    selected === "certifications"
                      ? "text-[#ACD3A8]"
                      : "hover:text-[#ACD3A8]"
                  }`}
                >
                  <FaCertificate />
                  <span>Certifications</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/myjobs"
                  onClick={() => setSelected("myjobs")}
                  className={`flex items-center space-x-1 transition ${
                    selected === "myjobs"
                      ? "text-[#ACD3A8]"
                      : "hover:text-[#ACD3A8]"
                  }`}
                >
                  <FaUserCircle />
                  <span>My Jobs</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  onClick={() => setSelected("cart")}
                  className={`flex items-center space-x-1 transition ${
                    selected === "cart"
                      ? "text-[#ACD3A8]"
                      : "hover:text-[#ACD3A8]"
                  }`}
                >
                  <ShoppingCart />
                  <span>cart</span>
                </Link>
              </li>
            </>
          )}

          {/* Common Login/Logout */}
          <li>
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 transition hover:text-[#ACD3A8]"
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setSelected("login")}
                className={`flex items-center justify-center space-x-1 gap-1.5 transition ${
                  selected === "login"
                    ? "text-[#ACD3A8]"
                    : "hover:text-[#ACD3A8]"
                }`}
              >
                <FaSignInAlt /> Sign in
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
