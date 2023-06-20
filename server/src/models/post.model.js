import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
    maxLength: [100, "Title can not have more than 100 characters"],
  },
  categories: {
    type: String,
    trim: true,
    required: "At least one category is required",
    maxLength: [100, "Categories can not have more than 100 characters"],
  },
  author: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
  },
  comments: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: String,
  },
});

export default mongoose.model("Post", PostSchema);
