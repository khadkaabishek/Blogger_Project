const { Schema, model, default: mongoose } = require("mongoose");
const likeSchema = new mongoose.Schema({
  likes: {
    type: Int16Array,
    enum: [0, 1],
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
});
const Likes = mongoose.model("Like", likeSchema);

module.exports = Likes;
