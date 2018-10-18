const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "category", required: true },
  body: { type: String },
  image: { type: String },
  views: { type: Number, default: 0 },
  created_on: { type: Date, default: Date.now() }
});

let Post = mongoose.model("post", postSchema);

module.exports = Post;
