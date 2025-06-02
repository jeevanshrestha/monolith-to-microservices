import express  from "express";
import { connectDB } from "./config/db"; 
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(express.json());

connectDB();


const PORT = process.env.PORT || 3002;



// API Routes
app.use('/api/books', bookRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Books Service is running!"
  });
});


app.listen(PORT, () => {
  console.log(`Books Service is running on port ${PORT}`);
}); 

