import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://adewoleadeigbe:${process.env.MONGODB_PASSWORD}@cluster0.q08nv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectDB() {
  try {
    console.log('Starting server initialization...');
    console.log('MongoDB Password present:', !!process.env.MONGODB_PASSWORD);

    // Add mongoose connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Connect to MongoDB before setting up routes
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout to 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
      retryWrites: true,
      w: 'majority'
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  timeSpent: { type: Number, default: 0 },
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
  timeSpent: { type: Number, default: 0 },
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