import React from "react";

const Template4 = ({ formData }) => {
  return (
    <div className="bg-white min-h-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-8 md:w-1/3">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{formData.name || "Your Name"}</h1>
          {formData.email && <div className="text-sm mb-1">{formData.email}</div>}
          {formData.phone && <div className="text-sm">{formData.phone}</div>}
        </div>
        
        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-1">SKILLS</h2>
          {Object.entries(formData.skills).map(([key, value]) => (
            value && (
              <div key={key} className="mb-2">
                <div className="font-semibold text-gray-300">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div className="text-sm">{value}</div>
              </div>
            )
          ))}
        </div>
        
        {/* Certifications */}
        {formData.certifications.some(c => c) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-1">CERTIFICATIONS</h2>
            <ul className="list-disc pl-5 text-sm">
              {formData.certifications.map((cert, index) => (
                cert && <li key={index} className="mb-1">{cert}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Achievements */}
        {formData.achievements.some(a => a) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-600 pb-1">ACHIEVEMENTS</h2>
            <ul className="list-disc pl-5 text-sm">
              {formData.achievements.map((achievement, index) => (
                achievement && <li key={index} className="mb-1">{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="p-8 md:w-2/3">
        {/* Education */}
        {formData.education.some(e => e.institution || e.degree || e.year) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-2">EDUCATION</h2>
            {formData.education.map((edu, index) => (
              (edu.institution || edu.degree || edu.year) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <span>{edu.year}</span>
                  </div>
                  <div>{edu.degree}</div>
                </div>
              )
            ))}
          </div>
        )}
        
        {/* Projects */}
        {formData.projects.some(p => p.title || p.techStack || p.description) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-2">PROJECTS</h2>
            {formData.projects.map((project, index) => (
              (project.title || project.techStack || project.description) && (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.techStack && <div className="italic text-sm mb-1">Tech: {project.techStack}</div>}
                  <p className="text-sm">{project.description}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template4;
