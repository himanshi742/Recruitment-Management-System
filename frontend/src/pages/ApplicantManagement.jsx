import { useState, useEffect } from "react";
import {
  getApplicants,
  deleteApplicant,
  updateApplicantStatus,
} from "../../services/applicantService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const ApplicantManagement = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const applicantsData = await getApplicants();
      setApplicants(Array.isArray(applicantsData) ? applicantsData : []);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
    }
  };

  const handleDeleteApplicant = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this applicant?"
    );
    if (!confirmDelete) return;

    try {
      const deleted = await deleteApplicant(id);
      if (deleted) {
        setApplicants((prevApplicants) =>
          prevApplicants.filter((applicant) => applicant._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updated = await updateApplicantStatus(id, newStatus);
      if (updated) {
        setApplicants((prev) =>
          prev.map((applicant) =>
            applicant._id === id
              ? { ...applicant, status: newStatus }
              : applicant
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Manage Applicants</h2>

        {applicants.length === 0 ? (
          <p className="text-gray-500 text-center">No applicants found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Applied Job</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant._id}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.phone}</TableCell>
                  <TableCell>
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell>{applicant.jobTitle}</TableCell>
                  <TableCell>{applicant.status}</TableCell>
                  <TableCell className="flex gap-2 flex-wrap">
                    <Button
                      className={"cursor-pointer"}
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(applicant._id, "Accepted")
                      }
                    >
                      Accept
                    </Button>

                    {applicant.status === "Accepted" ? null : (
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusUpdate(applicant._id, "Rejected")
                        }
                      >
                        Reject
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteApplicant(applicant._id)}
                      className={
                        "bg-transparent border-1 border-black cursor-pointer"
                      }
                    >
                      <Trash className="w-4 h-4 text-black" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicantManagement;
