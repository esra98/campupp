import {Campsite} from "@/models/Campsite";
import {Question} from "@/models/Question";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.campsite) {
      res.json(await Question.find({askedTo:req.query.campsite}).sort({ createdAt: -1 }).exec());
    }
    else{
      res.json("error getting campsite")
    }
  }
  
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Question.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }

  if (method === 'POST') {
    const {askedBy,anonymous,askedTo,questionText,replyText} = req.body;
    const productDoc = await Question.create({
        askedBy,anonymous,askedTo,questionText,replyText
    })
    res.json("ok");
  }

  if (method === 'PUT') {
    console.log("dddddddddddd")
    const {replyText,_id} = req.body;
    console.log(replyText,_id)
    await Question.updateOne({_id}, {replyText});
    res.json("ok");
  }
}