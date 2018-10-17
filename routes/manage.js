const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const Category = require("../model/category");
const upload = require("../config/fileUpload");

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

router.post(
  "/post/add",
  upload("uploads/pictures").single("image"),
  async (req, res, next) => {
    if (!req.body.title || !req.body.category)
      return res.send({ error: "Fields are required" });

    let fileName = req.file ? req.file.filename : "";
    let post = new Post({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      image: fileName
    });

    post = await post.save();
    res.redirect("/posts/" + req.body.category);
  }
);

// helper functions
const getIdBYcategoryName = async name => {
  name = name.replace("-", " ");
  category = await Category.findOne({ title: name });
  if (category) return category.id;
  return false;
};

module.exports = router;
