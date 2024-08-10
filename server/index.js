import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import problemRoutes from './routes/routes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5500;

// Database connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
});

app.use('/api', problemRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})