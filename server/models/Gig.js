const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "App Development",
        "UI/UX Design",
        "Graphic Design",
        "Content Writing",
        "Digital Marketing",
        "Data Science",
        "AI & Machine Learning",
        "Cyber Security",
        "Other",
      ],
    },

    budget: {
      type: Number,
      required: true,
      min: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Closed"],
      default: "Open",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gig", gigSchema);