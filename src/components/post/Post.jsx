import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/actions';
import { selectEditPost } from '../../redux/slices/postSlice';
import './style.scss';

export const Post = ({ post, title, text, author, image, userId, postId }) => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.authReducer);
  const [imageExist, setImageExist] = useState(false);

  useEffect(() => {
    if (image) {
      setImageExist(true);
    }
  }, [image]);

  return (
    <div className={imageExist ? 'post-wrapper' : 'post-wrapper post-wrapper-wide'}>
      {imageExist ? (
        <div className="post-image">
          <img
            src={`http://localhost:3030${image}`}
            alt="unable to load"
            width="100%"
            height="100%"
          />
        </div>
      ) : null}
      {authData && userId === authData._id && (
        <div className="post-actionBTN">
          <i
            onClick={() => {
              dispatch(selectEditPost(post));
            }}
            className="ri-edit-line ri-lg"></i>
          <i
            onClick={() => {
              const token = window.localStorage.getItem('token');
              if (window.confirm('Are you sure that you want to delete this post'))
                dispatch(deletePost({ postId, token }));
            }}
            className="ri-delete-bin-line ri-lg"></i>
        </div>
      )}
      <div className="post-header post-wrapper-item">{title}</div>
      <div className="post-body post-wrapper-item">{text}</div>
      <div className="post-author post-wrapper-item">Written by: {author}</div>
    </div>
  );
};
