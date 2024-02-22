import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise;
  } else {
    const URI = process.env.MONGODB_URI!;
    mongoose.connect(URI);
  }
}