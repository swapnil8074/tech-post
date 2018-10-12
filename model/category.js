const mongoose = require("mongoose");

const schema = mongoose.Schema;

let categorySchema = new schema({
  title: { type: String, required: true }
});

let Category = mongoose.model("category", categorySchema);

module.exports = Category;
