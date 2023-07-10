import mongoose, {model, Schema, models} from "mongoose";

const BoardSchema = new Schema({
  user:{type:String, required:true},
  anonymous: Boolean,
  title: String,
  category: String,
  detail: {type:String, required:true},
  images: [{type:String}],
  upvotedBy: [{type:String}],
  upvoteCount: Number,
  replyCount: Number,
  edited: Boolean,
  replies: [{ type: Object }],
}, {
    timestamps: true,
});

export const Board = models.Board || model('Board', BoardSchema);