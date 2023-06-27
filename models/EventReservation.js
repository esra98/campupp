import mongoose, {model, Schema, models} from "mongoose";

const EventReservationSchema = new Schema({
  user:{type:String, required:true},
  event: String,
  eventOwner: String,
  peopleCount: Number,
  eventTitle: String,
  reservationName: String,
  reservationTelephone: String,
  reservationMail: String,
}, {
    timestamps: true,
});

export const EventReservation = models.EventReservation || model('EventReservation', EventReservationSchema);