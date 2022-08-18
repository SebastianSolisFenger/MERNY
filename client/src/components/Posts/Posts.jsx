import React, { useEffect } from 'react';
import './Posts.css';
// import { PostsData } from '../../Data/PostsData';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  // TO FETCH THE POSTS AT THE START OF THE APPLICATION USE => useEffect(() => {}, [])
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  return (
    <div className="Posts">
      {loading
        ? 'Fetching Posts...'
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
