const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CoursesSchema = new Schema(
  {
    courseFor: { type: String },
    name: { type: String },
    shortDescription: { type: String },
    categoryId: {type: Schema.Types.ObjectId, ref: "categorys" },
    schoolName: { type: String },
    schoolId: { type: String },
    schoolCountry: { type: String },
    experienceLevel: { type: String },
    whyTakeThisCourse: { type: String },
    ableToDo: { type: String },
    preRequisites: { type: String },
    courseLength: { type: String },
    syllabus: { type: String },
    videos: [{ type: String }],
    coverImage: { type: String },
  },
  {
    timestamps: true,
  }
);




const Courses = mongoose.model("courses", CoursesSchema);
module.exports = Courses;
