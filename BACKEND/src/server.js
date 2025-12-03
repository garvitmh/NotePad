import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { ConnectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from 'cors';
import rateLimit from "./middleware/RateLimiter.js";
import path from "path"


const app = express();
dotenv.config();

const __dirname = path.resolve();

// Add these middleware before routes
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}


app.use(express.json());
app.use(rateLimit)
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../FRONTEND/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FRONTEND", "dist", "index.html"))
  })
}

const PORT = process.env.PORT ||9000;
ConnectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

})


