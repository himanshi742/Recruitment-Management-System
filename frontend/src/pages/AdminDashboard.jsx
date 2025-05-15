import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/admin";

export default function AdminDashboard() {
  const [recruiters, setRecruiters] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [open, setOpen] = useState(false);

  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    fetchRecruiters();
    fetchApplicants();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${API_URL}/recruiters`);
      setRecruiters(response.data);
    } catch (error) {
      console.error("Error fetching recruiters", error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${API_URL}/applicants`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants", error);
    }
  };

  const deleteUser = async (id, role) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      role === "recruiter" ? fetchRecruiters() : fetchApplicants();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleAddRecruiter = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          email,
          password,
          role: "recruiter",
        }
      );
      console.log("response ", response.status);

      if (response.status === 201) {
        fetchRecruiters();
        setOpen(false); // Close modal
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success("Recruiter added successfully!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/payment/transactions"
      );
      setTransactions(res.data);
      setTransactionModalOpen(true);
    } catch (err) {
      console.error("Error fetching transactions", err);
      toast.error("Failed to fetch transactions.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Recruiter Button and Modal */}
      <div className="mb-4 flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white">Add Recruiter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Add Recruiter</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddRecruiter}
                className="bg-green-600 text-white"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          className="bg-blue-600 text-white ml-2"
          onClick={fetchTransactions}
        >
          View Transactions
        </Button>
      </div>

      {/* Recruiters Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Recruiters</h2>
        <table className="w-full border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.length > 0 ? (
              recruiters.map((recruiter) => (
                <tr key={recruiter._id} className="border-b">
                  <td className="p-2">{recruiter.username}</td>
                  <td className="p-2">{recruiter.email}</td>
                  <td className="p-2">
                    <Button
                      onClick={() => deleteUser(recruiter._id, "recruiter")}
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center text-gray-500">
                  No recruiters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Applicants Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Applicants</h2>
        <table className="w-full border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <tr key={applicant._id} className="border-b">
                  <td className="p-2">{applicant.username}</td>
                  <td className="p-2">{applicant.email}</td>
                  <td className="p-2">
                    <Button
                      onClick={() => deleteUser(applicant._id, "applicant")}
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center text-gray-500">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Dialog
        open={transactionModalOpen}
        onOpenChange={setTransactionModalOpen}
      >
        <DialogContent className="max-w-2xl bg-white max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <div
                  key={txn._id}
                  className="border p-4 rounded bg-gray-50 shadow"
                >
                  
                  <p>
                    <strong>User Name:</strong> {txn.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {txn.userEmail}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{txn.amount/100}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(txn.date).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <p className="font-semibold">Cart Items:</p>
                    <ul className="list-disc pl-5">
                      {txn.cartItems.map((item) => (
                        <li key={item._id}>
                          <span className="font-medium">{item.title}</span> - ₹
                          {item.price} by {item.instructor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
