import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: String,
  image: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Collection", CollectionSchema);
