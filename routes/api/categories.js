const express = require("express");
const Category = require("../../model/category");
const router = express.Router();

router.post("/add", async (req, res) => {
  if (!req.body.title) return false;

  let category = new Category({
    title: req.body.title
  });

  category = await category.save();
  res.send(category);
});


module.exports = router;