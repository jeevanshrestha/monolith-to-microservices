import express from "express";
import cors from "cors"
import userRoutes from "./routes/userRoutes";

// Import error handling middleware
import { errorHandler } from './middleware/errorMiddleware';
import { AppError } from './utils/appError';

import { connectDB } from './config/db';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "User Service is running!"
  });
});



app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
}); 