import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB Connection Error: ${err.message}`);
      process.exit(1);
    });

    mongoose.connection.on("connected", () => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Error: ${String(error)}`);
    }
    process.exit(1);
  }
};

export default connectDB;
