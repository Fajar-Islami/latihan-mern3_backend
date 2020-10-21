const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model/database untuk blogspot
const Blogpost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    // meyimpan scr default created_at dan updated_at
    timestamps: true,
  },
);

// Param 1 = Nama Modelnya
// Param 2 = Format modelnya
module.exports = mongoose.model("BlogPosst", Blogpost);
