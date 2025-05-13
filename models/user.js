const { Schema, model } = require("mongoose");
const { error } = require("node:console");
const { createHmac, randomBytes } = require("node:crypto");
const { errorMonitor } = require("node:events");
const { generateToken } = require("../services/authentication");

const userSchema = new Schema(
  {
    full_Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

userSchema.static(
  "PasswordMatchCheckAndTokenGenerate",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");
    const salt = user.salt;
    // console.log(salt);
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedHash == hashedPassword) {
      const token = generateToken(user);
      return token;
    } else {
      throw new error("Password doesnt match ");
    }
  }
);
const User = model("user", userSchema);
module.exports = User;
