import mongoose, {model, Schema, models} from "mongoose";

const FavoriteSchema = new Schema({
  user:{type:String, required:true},
  favorites: [{type:String}]
}, {
  timestamps: true,
});

export const Favorite = models.Favorite || model('Favorite', FavoriteSchema);