import mongoose from "mongoose";

const eventsModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "Please enter event name"],
      maxLenth: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [false, "Please enter event description"],
    },
    location: {
        type: String,
        required: [false, "Please enter location of event"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Events", eventsModel);
