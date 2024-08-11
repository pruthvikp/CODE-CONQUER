import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import { Server as SocketIOServer } from 'socket.io'; // Correct named import
import { createServer } from "http"; // Correct named import
import { v4 as uuidv4 } from 'uuid';
import problemRoutes from './routes/routes.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app URL
    methods: ["GET", "POST"]
  }
});

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

// Define schemas and models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  uuid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const leaderboardSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  language: { type: String, required: true },
  compilationTime: { type: Number, required: true },
  success: { type: Boolean, required: true }
});

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);

// Define routes
app.use('/api', problemRoutes);

app.post('/execute', async (req, res) => {
  const { code, language, uuid } = req.body;

  // Mock code execution
  try {
    const mockOutput = `Output for ${language} code: ${code}`;
    res.json({ output: mockOutput, error: null });
  } catch (error) {
    res.status(500).json({ error: 'Code execution failed' });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  const { uuid, language, compilationTime, success } = req.body;

  try {
    const entry = new LeaderboardEntry({
      uuid,
      language,
      compilationTime,
      success
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error saving leaderboard entry", error });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ compilationTime: 1 }).exec();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

app.post('/api/register', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      uuid: uuidv4()
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", uuid: newUser.uuid });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
