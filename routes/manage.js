const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const Category = require("../model/category");

router.get("/", async (req, res) => {
  let categories = await Category.find({}).exec();
  res.render("manage/index", { categories: categories });
});

router.get("/category/:id", async (req, res) => {
  res.send("Category posts");
});

router.get("/post/add", async (req, res) => {
  let categories = await Category.find({}).exec();
  res.render("manage/addPost", { categories: categories });
});

router.post("/post/add", async (req, res) => {
  if (!req.body.title || !req.body.category)
    return res.send({ error: "Fields are required" });

  let post = new Post({
    title: req.body.title,
    category: req.body.category,
    body: req.body.body
  });

  post = await post.save();
  res.redirect("/posts/" + req.body.category);
});

// categorywise posts page
// router.get("/posts/:id", async (req, res) => {
//   let categoryId = await getIdBYcategoryName(req.params.id);

//   let posts = await Post.find({
//     category: categoryId ? categoryId : req.params.id
//   }).exec();

//   if (!posts) return res.redirect("/");

//   res.send(posts);

//   res.render("manage/addPost", { posts: posts, PageTitle: "" });
// });

// helper functions
const getIdBYcategoryName = async name => {
  name = name.replace("-", " ");
  category = await Category.findOne({ title: name });
  if (category) return category.id;
  return false;
};

module.exports = router;
