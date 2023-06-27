import mongoose, {model, Schema, models} from "mongoose";

const   QuestionSchema = new Schema({
  askedBy:{type:String, required:true},
  anonymous: Boolean,
  askedTo:{type:String, required:true},
  questionText:{type:String, required:true},
  replyText:String
}, {
    timestamps: true,
});

export const Question = models.Question || model('Question', QuestionSchema);