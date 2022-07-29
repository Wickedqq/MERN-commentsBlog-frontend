import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Posts

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
  return data;
});

export const makePosting = createAsyncThunk('makePost', async ({ token, sendData }) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, sendData, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (Array.isArray(res.data)) {
    const responceArray = res.data;
    const result = {
      titleMessage: '',
      textMessage: '',
      isError: true,
    };

    responceArray.forEach((element) => {
      if (element.param === 'title') {
        result.titleMessage = element.msg;
      } else {
        result.textMessage = element.msg;
      }
    });
    return result;
  }

  return res.data.data._doc;
});

export const editPost = createAsyncThunk('editPost', async ({ token, editedPostid, sendData }) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/posts/${editedPostid}`,
    sendData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (Array.isArray(res.data)) {
    const responceArray = res.data;
    const result = {
      titleMessage: '',
      textMessage: '',
      isError: true,
    };

    responceArray.forEach((element) => {
      if (element.param === 'title') {
        result.titleMessage = element.msg;
      } else {
        result.textMessage = element.msg;
      }
    });
    return result;
  }

  return res.data;
});

export const deletePost = createAsyncThunk('deletePost', async ({ postId, token }) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return data.postId;
});

// Auth

export const fetchUserData = createAsyncThunk('fetchUserData', async (userLoginData) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/authicate/login`, userLoginData);

  if (Array.isArray(res.data)) {
    const responceArray = res.data;
    const result = {
      emailMessege: '',
      passwordMessege: '',
    };

    responceArray.forEach((element) => {
      if (element.param === 'email') {
        result.emailMessege = element.msg;
      } else {
        result.passwordMessege = element.msg;
      }
    });
    return result;
  }

  return res.data;
});

export const PostUserData = createAsyncThunk('PostUserData', async (userRegisterData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/authicate/register`,
    userRegisterData,
  );

  if (Array.isArray(res.data)) {
    const responceArray = res.data;
    const result = {
      nameMessage: '',
      emailMessege: '',
      passwordMessege: '',
    };

    responceArray.forEach((element) => {
      if (element.param === 'email') {
        result.emailMessege = element.msg;
      } else if (element.param === 'password') {
        result.passwordMessege = element.msg;
      } else {
        result.nameMessage = element.msg;
      }
    });
    return result;
  }

  return res.data;
});

export const getIsAuth = createAsyncThunk('getMe', async (token) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (data.status !== 200) {
    return null;
  }
  return {
    ...data,
    isLoggedin: data._id ? true : false,
  };
});
