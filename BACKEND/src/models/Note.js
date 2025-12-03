import mongoose from "mongoose";

// 1. we wil create a schema for our data
// and will make model according to that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requred: true,
    },
    content: {
      type: String,
      requred: true,
    },
  },

  {
    timestamps: true, // this will add the createdAt and updartedAt fields automatically though mongodb
  }
);

const Note =  mongoose.model("note" , noteSchema);

export default Note
