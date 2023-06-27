import {Favorite} from "@/models/Favorite";
import {Campsite} from "@/models/Campsite";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.user) {
      try {
        // Find the favorite object associated with the user
        const favorite = await Favorite.findOne({ user: req.query.user });
    
        if (!favorite) {
          return res.json("no favorites added for user")
        }
    
        // Extract the campsite IDs from the favorites field
        const campsiteIds = favorite.favorites;
    
        // Retrieve the campsite objects using the campsite IDs
        const campsiteObjects = await Campsite.find({ _id: { $in: campsiteIds } });
    
        res.json(campsiteObjects);
      } catch (error) {
        console.error(error);
        res.json("error retrieving favorites")
      }
    } 
    else {
      res.json("user unidentified");
    }
  }  

  if (method === 'POST') {
    const {user, campsite} = req.body;
    const old = await Favorite.findOne({user: user})
    if(!old){
      await Favorite.create({user: user})
    }
    try{
      await Favorite.updateOne({ user: user }, { $addToSet: { favorites: campsite }})
      res.json("success")
    }
    catch{
      res.json("error")
    }  
  }

  if (method === 'DELETE') {
    try {
      if (req.query?.user&&req.query?.campsite) {
        const favorite = await Favorite.findOne({ user: req.query?.user });
        if (!favorite) {
          return res.status(404).json({ message: 'Favorite not found for the user' });
        }
        favorite.favorites.pull(req.query?.campsite);
        await favorite.save();
        res.json({ message: 'Campsite ID removed from favorites' });
      } 
    }
    catch{
      res.status(500).json({ message: 'Error removing campsite ID from favorites' });
    }
  }
}