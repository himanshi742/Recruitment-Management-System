import express, { json } from "express";
import errorHandler from "./Controller/middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import applicantRoutes  from"./routes/applicantRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import certicateRoute from "./routes/certificateRoutes.js"
import paymentRoutes from "./routes/payment.js"


dotenv.config();

connectDb();
const app =  express();

app.use(
    cors({
      origin:"http://localhost:5173", 
      credentials: true, // This will Allow cookies if needed
  })
  );
  
  app.use(json());
  app.use("/api/users", userRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/applicants", applicantRoutes);
  app.use("/admin",adminRoutes);
  app.use("/api/certificate",certicateRoute);
  app.use('/api/payment', paymentRoutes);
  app.use(errorHandler);

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
