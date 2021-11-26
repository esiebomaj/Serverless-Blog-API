import axios from "axios";

const BASE_URL = "https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/";

export const getPosts = async () => {
  try {
    const posts = await axios.get(BASE_URL + "posts");
    return posts;
  } catch (err) {
    console.log(err);
    alert("Error fetching posts");
    return [];
  }
};

export const getSinglePost = async (postId) => {
  try {
    const post = await axios.get(BASE_URL + `posts/${postId}}`);
    return post;
  } catch (err) {
    console.log(err);
    alert("Error fetching posts");
    return {};
  }
};

export const createPost = async (post) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(BASE_URL + `posts`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Error creating post");
  }
};

export const uplaodImageToS3 = async (s3Url, image) => {
  try {
    await axios.put(s3Url, image);
  } catch (err) {
    console.log(err, err.response);
    alert("Error uploading Image");
  }
};

export const updatePost = async (post, postId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(BASE_URL + `posts/${postId}`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
    alert("Error updating post");
  }
};

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(BASE_URL + `posts/${postId}`);
    await axios.delete(BASE_URL + `posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
    alert("Error deleting post");
  }
};
