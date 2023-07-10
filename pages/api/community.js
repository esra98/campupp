import {mongooseConnect} from "@/lib/mongoose";
import {Board} from "@/models/Board";
import {Blog} from "@/models/Blog";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if(req.query?.id) {
        res.json(await Board.findOne({_id:req.query.id}));
    }
    else{
      try {
        const { page, limit, categories} = req.query;
    
        const query = Board.find();
    
        // Apply city filter if cities are provided
        if (categories) {
          const categoriesArray = categories.split(',');
          query.where('category').in(categoriesArray);
        }
    
    
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const totalCount = await Board.countDocuments(query);
    
        query.skip(startIndex).limit(limit);
    
        const boards = await query.exec();
    
        // Prepare response
        const response = {
          boards,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
        };
    
        res.json(response);
      } catch (error) {
        console.error('Error fetching campsites:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  }  

  if (method === 'POST') {
    const {isNewBoard, isNewReply} = req.body;
    if(isNewBoard){
        const {user, anonymous, title, detail, category, images} = req.body;
        const upvotedBy = []
        const upvoteCount = 0
        const replyCount = 0
        const productDoc = await Board.create({
            user, anonymous, title, detail,category, upvotedBy, upvoteCount, replyCount, edited:false, images
        })
        res.json("ok");
    }
    if(isNewReply){
      const {anonymous, replyText, id, user} = req.body;
      const upvoteCount = 0
      const modelInstance = await Board.findOne({_id:id})
      // Add the reply to the "replies" field with a timestamp
      modelInstance.replies = modelInstance.replies || []; // If "replies" field doesn't exist, initialize it as an empty array
      modelInstance.replies.push({ user, replyText, anonymous, upvoteCount, created: new Date() }); // Add the new reply with a timestamp

      const savedModelInstance = await modelInstance.save();
      res.json("ok");
    }
  } 

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Board.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}