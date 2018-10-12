const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: { type: String, required: true },
  category: { type : Schema.Types.ObjectId, ref: 'category', required:true},
  body: { type: String }
});

let Post = mongoose.model("post", postSchema);

module.exports = Post;
