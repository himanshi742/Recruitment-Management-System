import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const MyJobs = () => {
  const [applications, setApplications] = useState([]);
  const applicantId = localStorage.getItem("id");
  const BASE_URL = "http://localhost:5000/api/applicants";

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${applicantId}`);
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (applicantId) {
      fetchMyApplications();
    }
  }, [applicantId]);

  return (
    <Card className="mt-6 m-3">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">My Applied Jobs</h2>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">No job applications found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>{app.jobTitle}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        app.status === "Accepted"
                          ? "bg-green-200 text-green-800"
                          : app.status === "Rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default MyJobs;
