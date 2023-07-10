import mongoose, {model, Schema, models} from "mongoose";

const BoardSchema = new Schema({
  user:{type:String, required:true},
  board:  { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  anonymous: Boolean,
  replyText: String,
  upvotedBy: [{type:String}],
  upvoteCount: Number,
}, {
    timestamps: true,
});

export const Board = models.Board || model('Board', BoardSchema);