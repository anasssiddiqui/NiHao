const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CategorySchema = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);




const Categorys = mongoose.model("categorys", CategorySchema);
module.exports = Categorys;
