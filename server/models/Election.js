const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String,
  constituency: String,
  status: { type: String, default: "CREATED" }
});
module.exports = mongoose.model("Election", schema);
