// @ts-nocheck
// import mongoose from 'mongoose';

// const postSchema = new mongoose.Model(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     desc: String,
//     likes: [],
//     image: String,
//   },
//   { timestamps: true }
// );

// const PostModel = mongoose.model('Posts', postSchema);
// export default PostModel;

import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model('Posts', postSchema);
export default PostModel;
