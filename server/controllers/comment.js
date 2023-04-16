import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Comment from '../models/Comment.js';



//Create comment
export const createComment = async (req, res) => {
  try {
    const {projectId, comment} = req.body;
    const user = await User.findById(req.userId);

    if(!comment){
      return res.json({message: 'comment can not be empty'})
    }

    const newComment = new Comment({comment, author: user.username,});
    await newComment.save();  

    try {
      await Project.findByIdAndUpdate(projectId, {   //находим по айди нужный нам проект и пушаем в массив комментов данного проекта новый коммент
        $push: {comments: newComment._id} 
      })
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);

  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

