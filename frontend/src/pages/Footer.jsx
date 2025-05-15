import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3E3F5B] text-white py-12 mt-8">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-bold text-[#F6F1DE] mb-4">Company</h3>
            <ul>
              <li><Link to="/about" className="hover:text-[#8AB2A6]">About Us</Link></li>
              <li><Link to="/terms" className="hover:text-[#8AB2A6]">Terms & Conditions</Link></li>
            
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-[#F6F1DE] mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/jobs" className="hover:text-[#8AB2A6]">Browse Jobs</Link></li>
              <li><Link to="/resume" className="hover:text-[#8AB2A6]">Resume Builder</Link></li>
              <li><Link to="/certifications" className="hover:text-[#8AB2A6]">Certifications</Link></li>
              <li><Link to="/contact" className="hover:text-[#8AB2A6]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="">
            <h3 className="text-2xl font-bold text-[#F6F1DE] mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <Link to="https://www.facebook.com" className="hover:text-[#8AB2A6]">
                <FaFacebook size={30} />
              </Link>
              <Link to="https://www.linkedin.com" className="hover:text-[#8AB2A6]">
                <FaLinkedin size={30} />
              </Link>
              <Link to="https://www.instagram.com" className="hover:text-[#8AB2A6]">
                <FaInstagram size={30} />
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-2xl font-bold text-[#F6F1DE] mb-4">Contact Us</h3>
            <p className="mb-4">Delhi, India</p>
            <p className="mb-4">Email: contact@JobSphere.com</p>
            <p className="mb-4">Phone: +91 9899xxxxxx</p>
          </div>
        </div>
      </div>

      <div className="bg-[#3E3F5B] text-center py-4 mt-8">
        <p className="text-sm text-[#F6F1DE]">
          &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
