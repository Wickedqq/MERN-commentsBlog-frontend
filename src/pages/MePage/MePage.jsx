import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddPost, AddPostBTN, Post, Skeleton } from '../../exporter';
import { fetchPosts } from '../../redux/actions';
import './style.scss';

export const MePage = () => {
  const [addPostIsOpen, setAddPostIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.authReducer);
  const { posts, currentEditPost, isLoading } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    if (!authData) {
      navigate('/');
    }
    dispatch(fetchPosts());
  }, [authData]);

  useEffect(() => {
    if (currentEditPost) {
      setAddPostIsOpen(true);
    }
  }, [currentEditPost]);

  const openAddPostEditor = (boolValue) => {
    setAddPostIsOpen(boolValue);
  };

  return (
    <div className="MePage-wrapper">
      <div className="MePage-infoContainer">
        {authData && authData.avatar && (
          <div className="MePage-image">
            <img
              width="100%"
              height="100%"
              src={`http://localhost:3030${authData.avatar}`}
              alt="unable to load your avatar"
            />
          </div>
        )}
        <br />
        <span className="MePage-name">User name: {authData && authData.name}</span>
        <br />
        <span className="MePage-email">User email: {authData && authData.email}</span>
      </div>
      <div className="MePage-posts">
        {posts.map((obj, i) => {
          if (authData && obj.user === authData._id) {
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
          }
          return null;
        })}
      </div>
      <AddPostBTN openAddPostEditor={openAddPostEditor} />
      {addPostIsOpen && <AddPost openAddPostEditor={openAddPostEditor} />}
    </div>
  );
};
