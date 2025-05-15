import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "applicant",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
  
   
  
    try {
      const endpoint = isSignup
        ? "http://localhost:5000/api/users/register"
        : "http://localhost:5000/api/users/login";
      const { data } = await axios.post(endpoint, formData);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      const username = localStorage.getItem("username");

    
      if (data.role === "admin") {
        navigate("/admin/dashboard");
        toast.success("Welcome Admin!");
      } else if (data.role === "recruiter") {
        navigate("/recruiter/dashboard");
        toast.success("Welcome Recruiter!");
      } else {
        navigate("/");
        toast.success(`Welcome ${username}`);
      }
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-[#3E3F5B] mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <Input
                type="text"
                name="username"
                placeholder="Full Name"
                className="w-full border-[#8AB2A6] text-[#3E3F5B]"
                onChange={handleChange}
              />
            </>
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border-[#8AB2A6] text-[#3E3F5B]"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-[#8AB2A6] text-[#3E3F5B]"
            onChange={handleChange}
          />
          <Button type="submit" className="w-full bg-[#3E3F5B] text-white py-2">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <p className="text-center text-[#3E3F5B] mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-[#3E3F5B] cursor-pointer ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
