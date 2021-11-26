import React from "react";
import * as endPoints from "../apiService";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated, user, posts, triggerReload }) => {
  const handleDelete = async (postId) => {
    await endPoints.deletePost(postId);
    triggerReload();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Serverless Blog</h1>
      {posts?.map((post) => (
        <div
          style={{
            padding: "0.5em",
            display: "flex",
            border: "0.5px solid",
            margin: "0.5em 0",
            position: "relative",
            width: "70%",
          }}
          key={post.postId}
        >
          <div style={{ width: "20%" }}>
            <img style={{ width: "100%" }} src={post.attachmentUrl} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginLeft: "0.4em",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <h3 style={{ margin: "0.2em 0" }}>{post.title}</h3>
            <p
              style={{ margin: "0em", fontSize: "16px", textAlign: "justify" }}
            >
              {post.body}
            </p>
          </div>
          {isAuthenticated && post.userId === user.sub && (
            <div style={{ position: "absolute", right: "0", top: "-8px" }}>
              <Link
                style={{
                  fontSize: "16px",
                  marginRight: "4px",
                  textDecoration: "none",
                }}
                to={`/${post.postId}/edit`}
              >
                Edit
              </Link>
              <button
                style={{
                  background: "red",
                  border: 0,
                  outline: 0,
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(post.postId)}
              >
                X
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        style={{
          padding: "1em",
          borderRadius: "5px",
          border: 0,
          cursor: "pointer",
        }}
      >
        {isAuthenticated && <Link to="/new">New Post</Link>}
      </button>
    </div>
  );
};

export default Home;
