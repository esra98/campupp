import mongoose, {model, Schema, models} from "mongoose";

const ReservationSchema = new Schema({
  user:{type:String, required:true},
  campsite: String,
  campsiteName: String,
  campsiteOwner:String,
  startDate:{
    type: Date,
    required: false
  },
  endDate:{
    type: Date,
    required: false
  },
  reservationName: String,
  isVanPresent: Boolean,
  reservationTelephone: String,
  personCount: String,
  bungalowRent: Boolean,
  userMessage: String,
  ownerMessage: String,
  price: Number,
  approved: Boolean,
  deleted: Boolean,
}, {
    timestamps: true,
});

export const Reservation = models.Reservation || model('Reservation', ReservationSchema);