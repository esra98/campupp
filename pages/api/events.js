import {Campsite} from "@/models/Campsite";
import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.user) {
      res.json(await Event.find({user:req.query.user}));
    }
    else if (req.query?.userFavorite) {
      try {
        // Find the favorite object associated with the user
        const favorites = await Event.find({ favorites: { $in: [req.query.userFavorite] } })
        if (!favorites) {
          return res.json("no event favorites added for user")
        }
          res.json(favorites);
        } catch (error) {
          console.error(error);
          res.json("error retrieving favorites")
      }
    }
    else if(req.query?.id) {
        res.json(await Event.findOne({_id:req.query.id}));
      }
    else if(req.query?.campsite) {
        res.json(await Event.find({campsite:req.query.campsite}));
    }
  }  

  if (method === 'POST') {
    const participants = []
    const favorites = []
    const {title,description,campsite,price,startDate,endDate,category,images,requirement,user, contactName,contactPhone,contactEmail,contactInstagram,contactFacebook} = req.body;
    const productDoc = await Event.create({
        title,description,price,startDate,endDate,category,images,requirement,user,participants,favorites,campsite, contactName,contactPhone,contactEmail,contactInstagram,contactFacebook
    })
    res.json("ok");
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Event.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }

  if (method === 'PUT') {
    const {user, favoritedEvent,favoriteEvent,deletedId,editInfo} = req.body;
    
    if (favoriteEvent) {
      await Event.updateOne({ _id: favoritedEvent }, { $addToSet: { favorites: user }})
      res.json("ok")
    }
    if (editInfo) {
      const {eventId,title, description,price,startDate,endDate,category,images,requirement, contactName,contactPhone,contactEmail,contactInstagram,contactFacebook} = req.body;
      await Event.updateOne({ _id: eventId }, {title, description,price,startDate,endDate,category,images,requirement, contactName,contactPhone,contactEmail,contactInstagram,contactFacebook})
      res.json("ok")
    }
    if (deletedId && user) {
      await Event.updateOne({ _id: deletedId }, { $pull  : { favorites: user }})
      res.json("ok")
    }
  }
}