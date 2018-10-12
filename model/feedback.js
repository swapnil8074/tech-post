const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let feedbackSchema = new Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

let Feedback = mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;
