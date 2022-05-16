// Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let TodoSchema = new Schema({
  todo: String,
  author: String,
});
//Export
module.exports = mongoose.model("todos", TodoSchema);

// name: {
//     type:String,
//     required: true,
//     min:6,
//     max: 255
// }
// ,
// date: {
//     type:Date,
//     default : Date.now
// }
