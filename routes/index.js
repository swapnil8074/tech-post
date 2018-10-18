const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const Category = require("../model/category");
const { getIdBYcategoryName } = require("../utils/urlHelpers");
const upload = require("../config/fileUpload");

// GET - home page
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
      .limit(5)
      .populate("category")
      .exec();
  } catch (err) {
    return res.redirect("/");
  }

  if (posts.length == 0) return res.redirect("/");

  res.render("posts", {
    posts: posts,
    PageTitle: posts[0].category.title,
    catUrlName: posts[0].category.title.replace(" ", "-").toLowerCase(),
    id: req.params.id
  });
});

// partial view routes ...

// Get most viewed posts
router.get("/ajax/most-viewed", async (req, res) => {
  let mostViewdPosts = [];
  try {
    mostViewdPosts = await Post.find({})
      .sort("-views")
      .limit(4)
      .populate("category")
      .exec();
  } catch (err) {
    return res.status(400).send({ error: true });
  }
  res.render("_partials/most_viewed", { posts: mostViewdPosts });
});

// Get tags

router.get("/ajax/tags", async (req, res) => {
  let tags = [];
  try {
    tags = await Category.find({})
      .limit(10)
      .exec();
  } catch (err) {
    return res.status(400).send({ error: true });
  }
  res.render("_partials/tags", { tags: tags });
});

// GET :  Post counts

router.get("/ajax/post-count-categorywise", async (req, res) => {
  let categories = [];
  try {
    categories = await Post.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $project: { "category._id": 0 }
      }
      //, { $unwind: "$category" }
    ]).exec();

  } catch (err) {
    return res.status(400).send({ error: true });
  }

  res.render("_partials/categories-collection", { categories: categories });
});

module.exports = router;
