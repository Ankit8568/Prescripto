
import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("✅ MongoDB Database Connected Successfully");
    })
    .catch((err) => {
      console.log("❌ MongoDB Connection Failed:", err.message);
    });
};

export default connectDB;

