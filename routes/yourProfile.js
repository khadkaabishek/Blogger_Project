const express = require("express");
const router = express();

router.get("/", (req, res) => {
  console.log(req.user.profileImageUrl);
  return res.render("profile", {
    loggedInUser: req.user,
    user: req.user,
  });
});
module.exports = router;
