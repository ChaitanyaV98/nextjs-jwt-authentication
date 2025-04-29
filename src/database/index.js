import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to database");
  } catch (e) {
    console.log("Error while connecting to db", e);
  }
}
