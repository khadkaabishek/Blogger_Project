const express = require("express");
const app = express();
const PORT = 4500;
const path = require("path");
const userRouter = require("./routes/user");
const { HandleMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middleware/auth");
const blogRoute = require("./routes/blog");
const profileRoute = require("./routes/yourProfile");
const Blog = require("./models/blog");
const UserData = require("./models/user");

HandleMongoDB("mongodb://127.0.0.1:27017/Blogger")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use("/blog", blogRoute);
app.use("/profile", profileRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const ourBlog = await Blog.find({}).populate(
    "createdBy",
    "full_Name profileImageUrl"
  );
  // console.log(ourBlog);
  const userdata = await UserData.find({});
  return res.render("ourBlog", {
    loggedInUser: req.user,
    user: userdata,
    blogs: ourBlog,
  });
});

app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
