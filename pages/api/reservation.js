import {Reservation} from "@/models/Reservation";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.user) {
      try {
        // Find the favorite object associated with the user
        const reservations = await Reservation.find({ user: req.query.user }).sort({ createdAt: -1 }).exec();
        res.json(reservations);
      } catch (error) {
        console.error(error);
        res.json("error retrieving reservations")
      }
    } 
    else if(req.query?.campsite){
      try {
        // Find the favorite object associated with the user
        const reservations = await Reservation.find({ campsiteOwner: req.query.campsite }).sort({ createdAt: -1 }).exec();
        res.json(reservations);
      } catch (error) {
        console.error(error);
        res.json("error retrieving reservations")
      }
    }
    else {
      res.json("user unidentified");
    }
  }  


  if (method === 'POST') {
    const {user,campsite,startDate,endDate,reservationName,isVanPresent,personCount,reservationTelephone,bungalowRent,userMessage,campsiteName,campsiteOwner} = req.body;
    const productDoc = await Reservation.create({
        user,campsiteOwner,campsite,startDate,endDate,reservationName,isVanPresent,personCount,reservationTelephone,bungalowRent,userMessage,campsiteName, ownerMessage:"", price:"",approved:false
    })
    res.json("ok");
  }

  if (method === 'PUT') {
    const {ownerNote,_id,isApproval} = req.body;
    if (isApproval){
      await Reservation.updateOne({_id}, {approved:true});
      res.json("ok");
    }
    if (!isApproval){
      await Reservation.updateOne({_id}, {ownerMessage:ownerNote});
      res.json("ok");
    }
    
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Reservation.deleteOne({_id:req.query?.id});
      res.json("ok");
    }
  }
}