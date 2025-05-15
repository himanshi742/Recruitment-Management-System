import React from "react";

const Template1 = ({ formData }) => {
  return (
    <div className="bg-white p-8 shadow-lg  min-h-full">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{formData.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          {formData.email && <div>{formData.email}</div>}
          {formData.phone && <div>{formData.phone}</div>}
        </div>
      </div>
      
      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800 border-b">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(formData.skills).map(([key, value]) => (
            value && (
              <div key={key} className="mb-2">
                <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                <span>{value}</span>
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Education */}
      {formData.education.some(e => e.institution || e.degree || e.year) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800 border-b">Education</h2>
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
          <h2 className="text-xl font-bold mb-3 text-gray-800 border-b">Projects</h2>
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
      
      {/* Certifications */}
      {formData.certifications.some(c => c) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800 border-b">Certifications</h2>
          <ul className="list-disc pl-5">
            {formData.certifications.map((cert, index) => (
              cert && <li key={index} className="mb-1">{cert}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Achievements */}
      {formData.achievements.some(a => a) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800 border-b">Achievements</h2>
          <ul className="list-disc pl-5">
            {formData.achievements.map((achievement, index) => (
              achievement && <li key={index} className="mb-1">{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Template1;