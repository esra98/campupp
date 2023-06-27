import {EventReservation} from "@/models/EventReservation";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.user) {
      try {
        // Find the favorite object associated with the user
        const reserved = await EventReservation.find({ user: req.query.user });
        if (!reserved) {
          return res.json("no event reservation added for user")
        }

          res.json(reserved);
        } catch (error) {
          console.error(error);
          res.json("error retrieving favorites")
      }
    } 
    else if(req.query?.eventId){
      try {
        // Find the favorite object associated with the user
        const reservations = await EventReservation.find({ event: req.query.eventId });
        if (!reservations) {
          return res.json("no reservation added for this event")
        }
          res.json(reservations);
        } catch (error) {
          console.error(error);
          res.json("error retrieving event reservations")
      }
    }
    else {
      res.json("user unidentified");
    }
  } 
  
  if (method === 'POST') {
    const {user,event,eventOwner,peopleCount,eventTitle,reservationName,reservationTelephone, reservationMail} = req.body;
    const productDoc = await EventReservation.create({
      user,event,eventOwner,peopleCount,eventTitle,reservationName,reservationTelephone, reservationMail
    })
    res.json("ok");
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await EventReservation.deleteOne({_id:req.query?.id});
      res.json("ok");
    }
  }

}