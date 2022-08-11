import mongoos from 'mongoose';

const postSchema = new mongoos.Model(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);
