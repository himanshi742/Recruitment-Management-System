import { useState, useEffect } from "react";
import {
  getRecruiterCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../services/certificateService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "react-toastify";

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recruiterId = localStorage.getItem("id");
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const certificateData = await getRecruiterCertificate();
      setCertificates(certificateData);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const openModal = (certificate = null) => {
    setCurrentCertificate(
      certificate || {
        title: "",
        description: "",
        price: "",
        duration: "",
        instructor: "",
        recruiterId: recruiterId,
      }
    );
    setIsModalOpen(true);
  };

  const handleCertificateSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (currentCertificate._id) {
        const updated = await updateCertificate(currentCertificate._id, currentCertificate);
        if (updated) {
          setCertificates(certificates.map((c) => (c._id === updated._id ? updated : c)));
        }
      } else {
        const added = await addCertificate(currentCertificate);
        if (added) {
          setCertificates([...certificates, added]);
        }
      }
  
    } catch (error) {
      toast.error(error?.response?.data?.error || "An unexpected error occurred");
    }
  };

  const handleDeleteCertificate = async (id) => {
    try {
      if (await deleteCertificate(id)) {
        setCertificates(certificates.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div className="mt-6">
      <Card>
        <CardContent>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Manage Certificates</h2>
            <Button onClick={() => openModal()} className="flex items-center">
              <Plus className="w-4 h-4 mr-2" /> Add Certificate
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((certificate) => ( // ✅ Fixed Mapping Issue
                <TableRow key={certificate._id}>
                  <TableCell>{certificate.title}</TableCell>
                  <TableCell>{certificate.description}</TableCell>
                  <TableCell>{certificate.price}</TableCell>
                  <TableCell>{certificate.duration}</TableCell>
                  <TableCell>{certificate.instructor}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => openModal(certificate)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCertificate(certificate._id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ✅ Modal for Add/Edit Certificate */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400/55 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {currentCertificate._id ? "Edit Certificate" : "Add New Certificate"}
            </h2>
            <form onSubmit={handleCertificateSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={currentCertificate.title}
                onChange={(e) => setCurrentCertificate({ ...currentCertificate, title: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={currentCertificate.description}
                onChange={(e) => setCurrentCertificate({ ...currentCertificate, description: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={currentCertificate.price}
                onChange={(e) => setCurrentCertificate({ ...currentCertificate, price: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Duration"
                value={currentCertificate.duration}
                onChange={(e) => setCurrentCertificate({ ...currentCertificate, duration: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Instructor"
                value={currentCertificate.instructor}
                onChange={(e) => setCurrentCertificate({ ...currentCertificate, instructor: e.target.value })}
                className="border p-2 w-full"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentCertificate._id ? "Update Certificate" : "Add Certificate"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateManagement;
