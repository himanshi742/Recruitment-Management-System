const TestimonialSection = () => {
  return (
    <section className="bg-gray-200 text-black py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="flex justify-center space-x-8">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg w-80">
          <p className="text-lg italic mb-4">
            "This platform helped me land my dream job! The opportunities are endless!"
          </p>
          <div className="text-right font-semibold">- John Doe</div>
        </div>
        <div className="bg-white text-[#3E3F5B] p-8 rounded-lg shadow-lg w-80">
          <p className="text-lg italic mb-4">
            "I was able to build a professional resume and get certified within weeks."
          </p>
          <div className="text-right font-semibold">- Jane Smith</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
