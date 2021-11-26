import React, { useState } from "react";
import * as endPoints from "../apiService";
import { Navigate, useNavigate } from "react-router-dom";

const PostForm = ({ isAuthenticated, user, triggerReload }) => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const newPost = await endPoints.createPost(post);
    if (postImage) {
      await endPoints.uplaodImageToS3(newPost.uploadUrl, postImage);
    }
    setLoading(false);
    triggerReload();
    navigate("/");
  };

  return (
    <div>
      <h1>Create a new post</h1>
      <form style={{ display: "flex", flexDirection: "column" }} action="">
        <input
          style={{ height: "40px" }}
          type="text"
          value={post.title}
          name="title"
          onChange={handleChange}
          placeholder="Post Title"
        />
        <textarea
          style={{ margin: "10px 0" }}
          value={post.body}
          name="body"
          onChange={handleChange}
          id=""
          cols="30"
          rows="10"
          placeholder="Post Body"
        ></textarea>

        <input
          type="file"
          name="postImage"
          id="postImage"
          onChange={handleFileChange}
        />
        <br />

        <button
          style={{ height: "30px", cursor: "pointer" }}
          onClick={handleSubmit}
        >
          {loading ? "Loading ..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
