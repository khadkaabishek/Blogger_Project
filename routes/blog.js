const express = require("express");
const router = express();
const User = require("../models/user");
const multer = require("multer");
const Blog = require("./../models/blog");
const Comment = require("./../models/interaction");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/coverImages");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    loggedInUser: req.user,
    user: req.user,
  });
});
router.get("/our-blogs", async (req, res) => {
  const ourBlog = await Blog.find({}).populate(
    "createdBy",
    "full_Name profileImageUrl"
  );
  // console.log(ourBlog);
  const allUser = await User.find({});
  // console.log(allUser);
  return res.render("ourBlog", {
    loggedInUser: req.user,
    blogs: ourBlog,
    user: allUser,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const clickedBlog = await Blog.findById({ _id: req.params.id });
    // const interaction = await Comment.find({});
    const owner = await Blog.findById(req.params.id).populate(
      "createdBy",
      "full_Name profileImageUrl"
    );
    const comments = await Comment.find({ blog: req.params.id }).populate(
      "createdBy",
      "full_Name profileImageUrl"
    );

    // console.log(comments[0]);
    if (!clickedBlog || !owner) {
      return res.status(404).send("Blog or User not found");
    }

    return res.render("clickedBlog", {
      loggedInUser: req.user,
      blog: clickedBlog,
      user: owner,
      comments: comments,
    });
  } catch (error) {
    console.error("Error loading blog/user:", error);
    res.status(500).send("Server error");
  }
});

router.post("/:id/comment", async (req, res) => {
  await Comment.create({
    comment: req.body.comment,
    blog: req.params.id,
    createdBy: req.user,
  });
  // console.log(id);
  return res.redirect(`/blog/${req.params.id}`);
});

router.post("/add-new", upload.single("coverImage"), async (req, res) => {
  const body = req.body;
  // console.log(body);
  const blog = await Blog.create({
    title: body.title,
    body: body.body,
    coverImageUrl: `/coverimages/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect("/");
});

router.post("/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const userId = req.user._id;

    if (!blog) return res.status(404).send("Blog not found");

    const liked = blog.likes.includes(userId);

    if (liked) {
      blog.likes.pull(userId); // Unlike
    } else {
      blog.likes.push(userId); // Like
    }

    await blog.save();
    res.redirect("/blog/" + req.params.id); // Or wherever you show the blog
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
