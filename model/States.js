const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  funfacts: {
    type: [String],
    required: false,
    unique: false,
  },
}, 
);
module.exports = mongoose.model("state", StateSchema);
