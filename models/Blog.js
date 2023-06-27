import mongoose, {model, Schema, models} from "mongoose";

const BlogSchema = new Schema({
  title: String,
  shortDesc: String,
  content: String,
  image: [{type:String}],
  category: String,
  language: String,
}, {
    timestamps: true,
});

export const Blog = models.Blog || model('Blog', BlogSchema);
