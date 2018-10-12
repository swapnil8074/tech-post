const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { getIdBYcategoryName } = require("../utils/urlHelpers");

router.get("/", (req, res) => {
  let data = {};
  res.render("index", data);
});

router.get("/contact", (req, res) => {
  let data = {};
  res.render("contact", data);
});

// categorywise posts page
router.get("/posts/:id", async (req, res) => {
  let categoryId = await getIdBYcategoryName(req.params.id);
  let posts = [];
  try {
    posts = await Post.find({
      category: categoryId ? categoryId : req.params.id
    })
      .populate("category")
      .exec();
  } catch (err) {
    return res.redirect("/");
  }

  if (posts.length == 0) return res.redirect("/");
  
  res.render("posts", {
    posts: posts,
    PageTitle: posts[0].category.title,
    catUrlName : posts[0].category.title.toLowerCase(),
    id: req.params.id
  });
});

module.exports = router;
