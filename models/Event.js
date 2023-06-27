import mongoose, {model, Schema, models} from "mongoose";

const EventSchema = new Schema({
  user:{type:String, required:true},
  campsite: String,
  title: {type:String, required:true},
  images: [{type:String}],
  startDate:{
    type: Date,
    required: false
  },
  endDate:{
    type: Date,
    required: false
  },
  contactName: String,
  contactPhone: String, 
  contactEmail: String, 
  contactInstagram: String, 
  contactFacebook: String, 
  description: String,
  requirement: String,
  category: String,
  price: Number,
  participants: [{type:String}],
  favorites: [{type:String}],
}, {
    timestamps: true,
});

export const Event = models.Event || model('Event', EventSchema);