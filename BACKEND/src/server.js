import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { ConnectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from 'cors';
import rateLimit from "./middleware/RateLimiter.js";

const app = express();
dotenv.config();


// Add these middleware before routes
app.use(cors());
app.use(express.json());
app.use(rateLimit)
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notesRoutes);

const PORT =  9000;
ConnectDB().then(()=>{
  const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

})


