import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    institution: { type: String, required: true },
    year:        { type: Number, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Qualification", qualificationSchema);
