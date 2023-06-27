import mongoose, {model, Schema, models} from "mongoose";

const MapItemSchema = new Schema({
  campsite: String,
  title: {type:String, required:true},
  latitute:String,
  longtitute:String
}, {
    timestamps: true,
});

export const MapItem = models.MapItem || model('MapItem', MapItemSchema);