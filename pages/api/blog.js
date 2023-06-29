import {Campsite} from "@/models/Campsite";
import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event";
import {Blog} from "@/models/Blog";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if(req.query?.id) {
        res.json(await Blog.findOne({_id:req.query.id}));
    }
    else if(req.query?.recent)
    {
      if(req.query?.langEng){
        res.json(await Blog.find({language:"eng"}, 'title shortDesc category image').sort({ createdAt: -1 }).limit(5));
      }else{
        res.json(await Blog.find({language:"tr"}, 'title shortDesc category image').sort({ createdAt: -1 }).limit(5));
      }
    }
    else{
      if(req.query?.langEng){
        const { page = 1, limit = 6 } = req.query;

        try {
          const total = await Blog.countDocuments();
          const blogs = await Blog.find({language:"eng"})
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

          res.status(200).json({ blogs, totalPages: Math.ceil(total / limit) });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      else{
        const { page = 1, limit = 6 } = req.query;

        try {
          const total = await Blog.countDocuments();
          const blogs = await Blog.find({language:"tr"})
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

          res.status(200).json({ blogs, totalPages: Math.ceil(total / limit) });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      
    }
  }  

  if (method === 'POST') {
    const {title,shortDesc,content,image,category,language} = req.body;
    const productDoc = await Blog.create({
        title,shortDesc,content,image,category,language
    })
    res.json("ok");
  } 

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Blog.deleteOne({_id:req.query?.id});
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