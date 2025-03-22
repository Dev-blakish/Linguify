import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://linguify:${process.env.MONGODB_PASSWORD}@cluster0.ctnhj.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout to 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
      retryWrites: true,
      w: 'majority'
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    console.error('MONGODB_URI environment variable present:', !!process.env.MONGODB_URI);
    console.error('Check your MongoDB connection string and credentials');
    throw error;
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  progress: { type: Number, default: 0 },
  lastLoginAt: { type: Date },
});

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  content: { type: String, required: true },
});

// Progress Schema
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  completed: { type: Boolean, default: false },
});

// Chat History Schema
const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
export const Lesson = mongoose.model('Lesson', lessonSchema);
export const Progress = mongoose.model('Progress', progressSchema);
export const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);