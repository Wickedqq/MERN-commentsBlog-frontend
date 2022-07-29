import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';
import { removeEditSelection } from '../../redux/slices/postSlice';
import './style.scss';

export const AddPostBTN = ({ openAddPostEditor }) => {
  const dispatch = useDispatch();
  const { currentEditPost } = useSelector((state) => state.postsReducer);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="addPostBTN-wrapper">
      <i
        onClick={() => {
          setIsClicked(!isClicked);
          openAddPostEditor(!isClicked);
          currentEditPost && dispatch(removeEditSelection());
        }}
        className="ri-add-circle-fill ri-2x"></i>
      <span>Add Post</span>
    </div>
  );
};
