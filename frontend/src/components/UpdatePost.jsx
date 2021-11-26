import React, { useEffect, useState } from "react";
import * as endPoints from "../apiService";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdatePost = ({ isAuthenticated, user, posts, triggerReload }) => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const postId = params.postId;

  const getSinglePost = async () => {
    const post = posts.find((post) => post.postId === postId);
    setPost(post);
  };

  useEffect(getSinglePost, [postId]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await endPoints.updatePost({ title: post.title, body: post.body }, postId);
    setLoading(false);
    triggerReload();
    navigate("/");
  };

  return (
    <div>
      <h1>Update your post</h1>
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

        <button
          style={{ height: "30px", cursor: "pointer" }}
          onClick={handleSubmit}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
