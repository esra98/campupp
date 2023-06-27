import {Campsite} from "@/models/Campsite";
import {Comment} from "@/models/Comment";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.campsite) {
      res.json(await Comment.find({reviewed:req.query.campsite}).sort({ createdAt: -1 }).exec());
    }
    else{
      res.json("error getting campsite")
    }
  }
  
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Comment.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }

  if (method === 'POST') {
    const {reviewer, anonymous,reviewed,title,detail,images, point,edited} = req.body;
    const productDoc = await Comment.create({
        reviewer, anonymous,reviewed,title,detail,images, point,edited
    })
    res.json("ok");
  }

  if (method === 'PUT') {
    const {title,detail,point,images,_id} = req.body;
    await Comment.updateOne({_id}, {title,detail,point,images,edited:true});
    res.json("ok");
  }
}