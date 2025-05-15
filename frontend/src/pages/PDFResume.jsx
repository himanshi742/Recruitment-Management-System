// components/PDFResume.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles using @react-pdf/renderer
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#f9fafb', // light gray background
  },
  header: {
    backgroundColor: '#1d4ed8', // blue-700
    color: '#ffffff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contact: {
    fontSize: 12,
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px solid #d1d5db', // light gray border
  },
  heading: {
    fontSize: 16,
    color: '#1f2937', // gray-800
    marginBottom: 6,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    color: '#374151', // gray-700
  },
  bullet: {
    marginRight: 4,
    fontSize: 12,
  },
  projectItem: {
    marginBottom: 6,
  }
});

const PDFResume = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.contact}>
          {formData.email} | {formData.phone}
        </Text>
      </View>

      {/* Technical Skills */}
      <View style={styles.section}>
        <Text style={styles.heading}>Technical Skills</Text>
        <Text style={styles.text}>Programming: {formData.skills.programming}</Text>
        <Text style={styles.text}>Frameworks: {formData.skills.frameworks}</Text>
        <Text style={styles.text}>Databases: {formData.skills.databases}</Text>
        <Text style={styles.text}>Tools: {formData.skills.tools}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {formData.education.map((edu, index) => (
          <Text key={index} style={styles.text}>
            • {edu.institution} - {edu.degree} ({edu.year})
          </Text>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        {formData.projects.map((proj, index) => (
          <View key={index} style={styles.projectItem}>
            <Text style={styles.text}>• {proj.title}</Text>
            <Text style={styles.text}>Tech Stack: {proj.techStack}</Text>
            <Text style={styles.text}>Description: {proj.description}</Text>
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.heading}>Certifications</Text>
        {formData.certifications.map((cert, index) => (
          <Text key={index} style={styles.text}>• {cert}</Text>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.heading}>Achievements</Text>
        {formData.achievements.map((ach, index) => (
          <Text key={index} style={styles.text}>• {ach}</Text>
        ))}
      </View>

    </Page>
  </Document>
);

export default PDFResume;
