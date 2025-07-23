import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // should be hashed
  role: { type: String, default: "user" }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
