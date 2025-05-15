import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getJobBysearchterm } from "../../services/jobService";

const HeroSection = () => {
  const [HomepageSearch, setHomepageSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!token) {
      toast.error("Please login to search for jobs");
      return;
    }
  
    if (HomepageSearch.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
  
    try {
      const result = await getJobBysearchterm(HomepageSearch);
      console.log(result);
  
      if (result && result.length > 0) {
        // You can store result in localStorage/context if needed
        navigate("/jobs", { state: { HomepageSearch } });
      } else {
        toast.error("No matching job found");
      }
    } catch (error) {
      toast.error("Something went wrong while searching",error);
    }
  };
  

  return (
    <section className="flex flex-col items-center justify-center text-center m-1 rounded-2xl bg-[#3E3F5B] py-20 px-4 shadow-lg">
      <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
        Find Your Dream Job Today!
      </h2>
      <p className="text-lg text-white mb-6">
        Explore opportunities, build skills, and get certified to accelerate your career.
      </p>
      <div className="flex w-full gap-3 max-w-3xl border-none rounded-md p-2 bg-white">
        <Input
          type="text"
          placeholder="Search jobs..."
          className="flex-grow outline-none text-black"
          value={HomepageSearch}
          onChange={(e) => setHomepageSearch(e.target.value)}
        />
        <Button 
          className="bg-[#ACD3A8] text-white px-4 hover:bg-[#8AB2A6] transition duration-300"
          onClick={handleSearch} // Trigger search validation
        >
          <FaSearch />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
