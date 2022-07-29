import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, makePosting } from '../../redux/actions';
import { clearErr, removeEditSelection } from '../../redux/slices/postSlice';

import './style.scss';

export const AddPost = ({ openAddPostEditor }) => {
  const dispatch = useDispatch();
  const { makePostErr } = useSelector((state) => state.postsReducer);
  const { currentEditPost } = useSelector((state) => state.postsReducer);
  const [postData, setPostData] = useState({
    title: '',
    text: '',
  });

  const [imageURL, setImageURL] = useState('');
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (currentEditPost) {
      setPostData({
        title: currentEditPost.title,
        text: currentEditPost.text,
      });
      currentEditPost.image && setImageURL(currentEditPost.image);
      openAddPostEditor(true);
    }
  }, [currentEditPost]);

  useEffect(() => {
    const listener = async (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const sendData = {
          ...postData,
          image: imageURL,
        };
        if (currentEditPost) {
          const editedPostid = currentEditPost._id;
          const updatedPostData = await dispatch(editPost({ token, editedPostid, sendData }));
          !updatedPostData.payload.isError && openAddPostEditor(false);
        } else {
          const PostedData = await dispatch(makePosting({ token, sendData }));
          !PostedData.payload.isError && openAddPostEditor(false);
        }
      }
    };

    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [postData, imageURL, currentEditPost, makePostErr]);

  const onChangeInput = (target) => {
    setPostData((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  const onFileInputChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/uploads`, formData);
      setImageURL(data.url);
    } catch (err) {
      console.warn(err);
      alert('error on uploading an image');
    }
  };

  return (
    <div className="addPost-wrapper">
      <input
        className="addPost-titleField"
        type="text"
        name="title"
        placeholder="Title"
        value={postData.title}
        onChange={(e) => onChangeInput(e.target)}
      />
      <h2 className="addPost-inscription">Send your comment to the world</h2>
      <button onClick={() => inputFileRef.current.click()} className="addPost-uploadBTN">
        Upload image to your comment
      </button>
      {imageURL && <span className="imageUploadment-inscription">image is uploaded</span>}
      <input ref={inputFileRef} onChange={onFileInputChange} type="file" hidden />
      <textarea
        className="addPost-textField"
        name="text"
        placeholder="Your comment should be here"
        value={postData.text}
        onChange={(e) => onChangeInput(e.target)}
      />

      {makePostErr ? (
        <div className="addPost-error-wrapper">
          {makePostErr.titleMessage && (
            <span className="addPost-errorMessage">{makePostErr.titleMessage}</span>
          )}
          {makePostErr.textMessage && (
            <span className="addPost-errorMessage">{makePostErr.textMessage}</span>
          )}
        </div>
      ) : (
        <p className="addPost-postInstractions">
          Click "Enter" to {currentEditPost ? 'save updated comment' : 'commit the comment'}
        </p>
      )}
      <i
        onClick={() => {
          setPostData({
            title: '',
            text: '',
          });
          setImageURL('');
          dispatch(clearErr());
          dispatch(removeEditSelection());
          openAddPostEditor(false);
        }}
        className="ri-close-circle-line ri-xl addPost-closeBTN"></i>
    </div>
  );
};
