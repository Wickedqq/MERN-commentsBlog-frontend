import React from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '..//..//redux/actions.js';

import { AddPost, Post, AddPostBTN, Skeleton } from '../../exporter';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [addPostIsOpen, setAddPostIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.postsReducer);
  const { currentEditPost } = useSelector((state) => state.postsReducer);
  const { authData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (currentEditPost) {
      setAddPostIsOpen(true);
    }
  }, [currentEditPost]);

  const openAddPostEditor = (boolValue) => {
    setAddPostIsOpen(boolValue);
  };

  return (
    <div className="homePage-wrapper">
      {posts.map((obj, i) => {
        return isLoading ? (
          <Skeleton key={i} />
        ) : (
          <Post
            key={i}
            post={obj}
            title={obj.title}
            text={obj.text}
            author={obj.name}
            image={obj.image}
            userId={obj.user}
            postId={obj._id}
          />
        );
      })}
      <div className="homePage-inscription">
        {!posts.length
          ? 'To make a first comment here, you need to either login or register'
          : 'Login or Register to make a posting'}
      </div>
      {authData && authData._id && <AddPostBTN openAddPostEditor={openAddPostEditor} />}
      {addPostIsOpen && <AddPost openAddPostEditor={openAddPostEditor} />}
    </div>
  );
};
