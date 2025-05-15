import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#3E3F5B] mb-2">{title}</h3>
      <p className="text-[#3E3F5B]">{description}</p>
    </div>
  );
};

export default FeatureCard;
