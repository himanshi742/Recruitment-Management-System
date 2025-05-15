import React, { useState, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Template4 from "../../templates/Template4";
import Template3 from "../../templates/Template3";
import Template2 from "../../templates/Template2";
import Template1 from "../../templates/Template1";
import PDFResume from "./PDFResume";
import { chatSession } from "../../services/AiMode";

const ResumeBuilder = () => {
  // Define state variables
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: {
      programming: "",
      frameworks: "",
      databases: "",
      tools: "",
    },
    education: [{ institution: "", degree: "", year: "" }],
    projects: [{ title: "", techStack: "", description: "" }],
    certifications: [""],
    achievements: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiResumeData] = useState(null);

  const resumeRef = useRef();

  // Handle general form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skills changes
  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: value,
      },
    }));
  };

  // Handle array changes for education and projects
  const handleArrayChange = (index, field, value, arrayName) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  // Handle single field array changes (certifications, achievements)
  const handleArrayFieldChange = (index, value, arrayName) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  // Add new item to arrays
  const addItem = (arrayName, template) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template],
    }));
  };

  // Remove item from arrays
  const removeItem = (arrayName, index) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  // Render template based on selection
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 formData={formData} />;
      case "template2":
        return <Template2 formData={formData} />;
      case "template3":
        return <Template3 formData={formData} />;
      case "template4":
        return <Template4 formData={formData} />;
      default:
        return <Template1 formData={formData} />;
    }
  };

  

  const handleGptSearchClick = async () => {
    setIsLoading(true);
  
    try {
      // Construct a strict JSON prompt
      const apiQuery = `
  Generate a professional resume in strict JSON format. Do not include any explanation or markdown, just return a valid JSON object with the following structure:
  
  {
    "summary": "string",
    "education": [{ "institution": "string", "degree": "string", "year": "string" }],
    "skills": {
      "programming": ["string"],
      "frameworks": ["string"],
      "databases": ["string"],
      "tools": ["string"]
    },
    "projects": [{ "title": "string", "techStack": "string", "description": "string" }],
    "certifications": ["string"],
    "achievements": ["string"]
  }
  
  User Input:
  
  Name: ${formData.name}
  Email: ${formData.email}
  Phone: ${formData.phone}
  
  Technical Skills:
  Programming Languages: ${formData.skills.programming}
  Frameworks & Libraries: ${formData.skills.frameworks}
  Databases: ${formData.skills.databases}
  Tools & Technologies: ${formData.skills.tools}
  
  Education:
  ${formData.education
    .map(
      (edu) =>
        `Institution: ${edu.institution}, Degree: ${edu.degree}, Year: ${edu.year}`
    )
    .join("\n")}
  
  Projects:
  ${formData.projects
    .map(
      (proj) =>
        `Project Title: ${proj.title}, Tech Stack: ${proj.techStack}, Description: ${proj.description}`
    )
    .join("\n")}
  
  Certifications:
  ${formData.certifications.join(", ")}
  
  Achievements:
  ${formData.achievements.join(", ")}
  `;
  
      const result = await chatSession.sendMessage(apiQuery);
      const text = await result.response.text();
      console.log("Raw response:\n", text);
  
      // Try to extract JSON from the response
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
  
      if (!jsonMatch) {
        throw new Error("Could not find valid JSON in the response");
      }
  
      const cleanJson = jsonMatch[1] || jsonMatch[2];
  
      try {
        const apiResponse = JSON.parse(cleanJson);
        setApiResumeData(apiResponse);
      } catch (e) {
        console.error("Error parsing JSON response:", e);
        throw new Error("Invalid JSON format returned from API");
      }
    } catch (error) {
      console.error("Error fetching or parsing GPT response:", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
    <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto gap-6">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Resume Builder</h1>

        <label className="block mb-2 font-semibold">Select Template:</label>
        <select
          className="border p-2 mb-4 w-full"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
          <option value="template4">Template 4</option>
        </select>

        <h2 className="text-lg font-semibold mt-4">Personal Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <h2 className="text-lg font-semibold mt-4">Technical Skills</h2>
        {Object.keys(formData.skills).map((skill) => (
          <div key={skill} className="mb-2">
            <label className="block text-sm text-gray-600">
              {skill
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + skill.replace(/([A-Z])/g, " $1").slice(1)}
              :
            </label>
            <input
              type="text"
              name={skill}
              placeholder={`Enter ${skill
                .replace(/([A-Z])/g, " $1")
                .toLowerCase()}`}
              value={formData.skills[skill]}
              onChange={handleSkillsChange}
              className="border p-2 w-full"
            />
          </div>
        ))}

        <h2 className="text-lg font-semibold mt-4">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-3 p-3 border rounded bg-white">
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleArrayChange(
                  index,
                  "institution",
                  e.target.value,
                  "education"
                )
              }
              className="border p-2 w-full mb-1"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange(index, "degree", e.target.value, "education")
              }
              className="border p-2 w-full mb-1"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) =>
                handleArrayChange(index, "year", e.target.value, "education")
              }
              className="border p-2 w-full mb-1"
            />
            <button
              type="button"
              onClick={() => removeItem("education", index)}
              className="text-red-500 text-sm mt-1"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addItem("education", { institution: "", degree: "", year: "" })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-4"
        >
          Add Education
        </button>

        <h2 className="text-lg font-semibold mb-2">Projects</h2>
{formData.projects.map((project, index) => (
  <div key={index} className="mb-4 border p-4 rounded-md">
    <input
      type="text"
      placeholder="Project Title"
      value={project.title}
      onChange={(e) =>
        handleArrayChange(index, "title", e.target.value, "projects")
      }
      className="border p-2 w-full mb-1"
    />
    <input
      type="text"
      placeholder="Tech Stack"
      value={project.techStack}
      onChange={(e) =>
        handleArrayChange(index, "techStack", e.target.value, "projects")
      }
      className="border p-2 w-full mb-1"
    />
    <input
      type="text"
      placeholder="Description"
      value={project.description}
      onChange={(e) =>
        handleArrayChange(index, "description", e.target.value, "projects")
      }
      className="border p-2 w-full mb-1"
    />
    <button
      type="button"
      onClick={() => removeItem("projects", index)}
      className="text-red-500 text-sm mt-1"
    >
      Remove
    </button>
  </div>
))}
<button
  type="button"
  onClick={() =>
    addItem("projects", {
      title: "",
      techStack: "",
      description: "",
    })
  }
  className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-4"
>
  Add Project
</button>


        <h2 className="text-lg font-semibold mt-4">Certifications</h2>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Certification"
                value={cert}
                onChange={(e) =>
                  handleArrayFieldChange(
                    index,
                    e.target.value,
                    "certifications"
                  )
                }
                className="border p-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeItem("certifications", index)}
                className="ml-2 text-red-500 px-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("certifications", "")}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-4"
        >
          Add Certification
        </button>

        <h2 className="text-lg font-semibold mt-4">Achievements</h2>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Achievement"
                value={achievement}
                onChange={(e) =>
                  handleArrayFieldChange(index, e.target.value, "achievements")
                }
                className="border p-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeItem("achievements", index)}
                className="ml-2 text-red-500 px-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("achievements", "")}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-4"
        >
          Add Achievement
        </button>
      </div>
      
          

      {/* Preview Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow overflow-y-auto max-h-screen">
        <div className="mt-6 text-center">

          <PDFDownloadLink
            document={<PDFResume formData={formData} />}
          
            fileName="resume.pdf"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {({ loading }) =>
              loading ? "Preparing document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
        
        <div
          id="resume-preview-content"
          className="p-4 letter-paper"
          ref={resumeRef}
        >
          {renderSelectedTemplate()}
        </div>
      </div>
      </div>

      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm ml-20 cursor-pointer"onClick={handleGptSearchClick}> {isLoading ? "generating" : "GENERATE using AI"}   </button>
      
      {/* AI RESUME SECTION */}
      <div>
      
{apiData && (
  <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
    <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>

    {/* Summary */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold underline">Summary</h3>
      <p>{apiData.summary}</p>
    </div>

    {/* Education */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold underline">Education</h3>
      {apiData.education.map((edu, index) => (
        <div key={index}>
          <p className="font-medium">{edu.institution}</p>
          <p>{edu.degree}</p>
          <p className="text-sm text-gray-600">{edu.year}</p>
        </div>
      ))}
    </div>

    {/* Skills */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold underline">Skills</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Programming:</p>
          <ul className="list-disc list-inside">
            {apiData.skills.programming.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Frameworks:</p>
          <ul className="list-disc list-inside">
            {apiData.skills.frameworks.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Databases:</p>
          <ul className="list-disc list-inside">
            {apiData.skills.databases.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Tools:</p>
          <ul className="list-disc list-inside">
            {apiData.skills.tools.map((tool, idx) => (
              <li key={idx}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Projects */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold underline">Projects</h3>
      {apiData.projects.map((project, index) => (
        <div key={index} className="mb-2">
          <p className="font-medium">{project.title}</p>
          <p className="text-sm italic text-gray-600">
            Technologies: {project.techStack}
          </p>
          <p className="mt-1">{project.description}</p>
        </div>
      ))}
    </div>

    {/* Certifications */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold underline">Certifications</h3>
      <ul className="list-disc list-inside">
        {apiData.certifications.map((cert, idx) => (
          <li key={idx}>{cert}</li>
        ))}
      </ul>
    </div>

    {/* Achievements */}
    <div>
      <h3 className="text-lg font-semibold underline">Achievements</h3>
      <ul className="list-disc list-inside">
        {apiData.achievements.map((ach, idx) => (
          <li key={idx}>{ach}</li>
        ))}
      </ul>
    </div>
  </div>
)}

      </div>
        
    

    </>
  );
};

export default ResumeBuilder;
