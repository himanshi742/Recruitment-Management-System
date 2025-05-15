import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TestimonialSection from "./TestimonialSection";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
    </div>
  );
};

export default Homepage;
