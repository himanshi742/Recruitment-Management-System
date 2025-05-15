const ApiResumeView = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="mt-8 p-6 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-bold mb-4 text-center">API-Generated Resume</h2>
        
        {/* Contact Information */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1">Contact Information</h3>
          <div className="mt-2">
            <p><strong>Name:</strong> {data[0]?.content[0]?.name || "Not specified"}</p>
            <p><strong>Email:</strong> {data[0]?.content[1]?.email || "Not specified"}</p>
            <p><strong>Phone:</strong> {data[0]?.content[2]?.phone || "Not specified"}</p>
          </div>
        </section>
  
        {/* Summary */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1">Summary</h3>
          <p className="mt-2">{data[1]?.content || "No summary provided."}</p>
        </section>
  
        {/* Education */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1">Education</h3>
          {data[2]?.content?.map((edu, index) => (
            <div key={index} className="mt-2">
              <p><strong>University:</strong> {edu.university || "Not specified"}</p>
              <p><strong>Degree:</strong> {edu.degree || "Not specified"}</p>
              <p><strong>Year:</strong> {edu.graduation_year || "Not specified"}</p>
            </div>
          ))}
        </section>
  
        {/* Skills */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1">Skills</h3>
          {data[3]?.content?.map((skillGroup, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-medium">{skillGroup.category}:</h4>
              <ul className="list-disc pl-5">
                {skillGroup.items?.map((item, i) => (
                  <li key={i}>{item || "Not specified"}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
  
        {/* Projects */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1">Projects</h3>
          {data[4]?.content?.map((project, index) => (
            <div key={index} className="mt-3">
              <h4 className="font-medium">{project.title || "Untitled Project"}</h4>
              <p><strong>Tech Stack:</strong> {project.stack || "Not specified"}</p>
              <p>{project.description || "No description provided."}</p>
            </div>
          ))}
        </section>
  
        {/* Certifications & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-1">Certifications</h3>
            <ul className="list-disc pl-5 mt-2">
              {data[5]?.content?.map((cert, index) => (
                <li key={index}>{cert || "Not specified"}</li>
              ))}
            </ul>
          </section>
  
          <section className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-1">Achievements</h3>
            <ul className="list-disc pl-5 mt-2">
              {data[6]?.content?.map((achievement, index) => (
                <li key={index}>{achievement || "Not specified"}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  };

  export default ApiResumeView;