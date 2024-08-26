import mongoose from "mongoose";

const { Schema } = mongoose;

const todoItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Missed"],
      default: "Ongoing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TodoItem", todoItemSchema);
