const AboutUs = () => {
    return (
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Welcome to our <span className="text-blue-600 font-semibold">Recruitment Management System</span>. 
          We help companies streamline their hiring process and connect job seekers with the right opportunities.
        </p>
  
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide a seamless recruitment experience for both employers and job seekers.
            </p>
          </div>
  
          {/* Vision */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To revolutionize hiring by making it faster, fairer, and more efficient.
            </p>
          </div>
  
          {/* Our Team */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Team</h3>
            <p className="text-gray-600">
              A passionate team of developers and recruiters working together to simplify hiring.
            </p>
          </div>
        </div>
  
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our system is designed to make hiring effortless to ensure you hire the best talent efficiently.
          </p>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  