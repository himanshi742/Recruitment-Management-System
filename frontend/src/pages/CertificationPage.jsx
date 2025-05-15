import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";

export default function CertificationPage() {
  const [certificate, setCertificate] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Fetch certificate data from backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/certificate");
        setCertificate(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  const addToCart = (course) => {
    const exists = cartItems.some((item) => item._id === course._id);
    if (!exists) {
      // Sanitize price before adding
      const sanitizedCourse = {
        ...course,
        price: course.price.replace(/[₹,]/g, ""), // Store as clean number string
      };

      const updatedCart = [...cartItems, sanitizedCourse];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Certification Courses</h1>

      {/* ✅ Courses List */}
      <div className="grid md:grid-cols-3 gap-6">
        {certificate.length > 0 ? (
          certificate.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => setSelectedCertificate(course)}
            >
              <Card className="p-4 rounded-2xl shadow-lg">
                <CardTitle className="text-xl font-semibold">
                  {course.title}
                </CardTitle>
                <CardContent>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="text-gray-500 mt-2">Instructor: {course.instructor}</p>
                  <p className="text-gray-500">Duration: {course.duration}</p>
                  <p className="text-lg font-bold mt-3">₹ {course.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 p-6">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedCertificate.title}</h2>
            <p className="text-gray-700">{selectedCertificate.description}</p>
            <p className="text-gray-600 mt-2">Instructor: {selectedCertificate.instructor}</p>
            <p className="text-gray-600">Duration: {selectedCertificate.duration}</p>
            <p className="text-xl font-bold mt-3">₹{selectedCertificate.price}</p>
            <div className="mt-4 flex justify-end gap-4">
              <Button onClick={() => setSelectedCertificate(null)} variant="outline">
                Close
              </Button>
              <Button
                className="bg-green-600 text-white"
                onClick={() => {
                  addToCart(selectedCertificate);
                  setSelectedCertificate(null);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
