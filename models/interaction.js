const { Schema, model, default: mongoose } = require("mongoose");
const interactionSchema = new Schema(
  {
    // isLiked: { type: Boolean, default: false },
    comment: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Interaction = model("userInteraction", interactionSchema);
module.exports = Interaction;
