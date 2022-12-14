import PostModel from '../Models/postModel.js';
import UserModel from '../Models/userModel.js';
import mongoose from 'mongoose';

// CRUD - Create Read Update Delete

// ------------------ Create a post  ------------------//

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ Gey a post  ------------------//

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ Update a post  ------------------//

export const updatePost = async (req, res) => {
  const postId = req.params.id;

  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post?.updateOne({
        $set: req.body,
      });
      res.status(200).json('Post updated successfully');
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ Delete a post  ------------------//

export const deletePost = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (post.userId === userId) {
      await post?.deleteOne();
      res.status(200).json('Post deleted successfully');
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ Like // dislike posts  ------------------//

export const likePost = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post.likes.includes(userId)) {
      await post?.updateOne({
        $push: {
          likes: userId,
        },
      });
      res.status(200).json('Post liked successfully');
    } else {
      await post?.updateOne({
        $pull: {
          likes: userId,
        },
      });
      res.status(200).json('Post unliked successfully');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ Get TimeLine posts  ------------------//

// Get Timeline POsts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        // As far as I understand, this is the way to concat the post of the following users
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingPosts',
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)

        // latest post will appear first in the timeline
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
