import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://blakish:${process.env.MONGODB_PASSWORD}@cluster0.zuhbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB Password present:', !!process.env.MONGODB_PASSWORD);
    console.log('Connection string format valid:', MONGODB_URI.includes('mongodb+srv://'));

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    console.log('Successfully connected to MongoDB!');
    await mongoose.disconnect();
    console.log('Test complete - connection works!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    process.exit(1);
  }
}

testConnection();