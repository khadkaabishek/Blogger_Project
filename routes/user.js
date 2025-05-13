const express = require("express");
const User = require("../models/user");
const { generateToken } = require("../services/authentication");
const router = express();

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name) return res.render("signup");
  const user = await User.create({
    full_Name: full_name,
    email: email,
    password: password,
  });
  // req.user = user;
  console.log(user);
  const token = generateToken(user);
  // const token = "";

  return res.cookie("token", token).redirect("/blog/our-blogs");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.PasswordMatchCheckAndTokenGenerate(
      email,
      password
    );
    // console.log("token", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or password",
    });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});
module.exports = router;
