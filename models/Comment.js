import mongoose, {model, Schema, models} from "mongoose";

const CommentSchema = new Schema({
  reviewer:{type:String, required:true},
  anonymous: Boolean,
  reviewed:{type:String, required:true},
  title: String,
  detail: {type:String, required:true},
  images: [{type:String}],
  point: Number,
  edited: Boolean
}, {
    timestamps: true,
});

export const Comment = models.Comment || model('Comment', CommentSchema);