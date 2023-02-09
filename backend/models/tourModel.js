import mongoose from "mongoose";
const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    name: String,
    creator: String,
    tags: [String],
    image: {},
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
