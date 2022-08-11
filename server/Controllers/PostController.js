import PostModel from '../Models/postModel.js';
import mongoose from 'mongoose';

// CRUD - Create Read Update Delete

// ------------------ Create a post  ------------------//

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json('Post created successfully');
  } catch (error) {
    res.status(500).json(error);
  }
};
