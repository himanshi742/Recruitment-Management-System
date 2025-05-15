import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Terms & Conditions
      </h2>
      <p className="text-gray-600 text-center mb-8">
        By using our{" "}
        <span className="text-blue-600 font-semibold">
          Recruitment Management System
        </span>
        , you agree to the following terms and conditions.
      </p>

      <div className="space-y-6">
        {/* User Responsibilities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            1. User Responsibilities
          </h3>
          <p className="text-gray-600">
            Users must provide accurate information while applying for jobs or
            posting job listings. Misuse of the platform may lead to account
            suspension.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            2. Privacy Policy
          </h3>
          <p className="text-gray-600">
            We respect your privacy. Your data is protected and will not be
            shared without your consent. Please refer to our{" "}
            <span className="text-blue-600 font-semibold">Privacy Policy</span>{" "}
            for more details.
          </p>
        </div>

        {/* Job Postings & Applications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            3. Job Postings & Applications
          </h3>
          <p className="text-gray-600">
            Employers are responsible for ensuring job postings are legal and
            non-discriminatory. Applicants must apply in good faith.
          </p>
        </div>

        {/* Liabilities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            4. Liabilities
          </h3>
          <p className="text-gray-600">
            We are not liable for any disputes arising between recruiters and
            job seekers. Use the platform responsibly.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Need Help?
        </h3>
        <p className="text-gray-600">
          If you have any questions regarding our Terms & Conditions, feel free
          to{" "}
          <Link to="/contact" className="text-blue-600 font-semibold">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
