import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PostForm from "./components/NewPost";
import { useAuth0 } from "@auth0/auth0-react";
import UpdatePost from "./components/UpdatePost";
import React, { useState, useEffect } from "react";
import * as endPoints from "./apiService";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  console.log(user);

  const setAccessToken = async () => {
    if (isAuthenticated) {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem("token", accessToken);
    }
  };
  setAccessToken();

  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(1);

  const getPosts = async () => {
    const response = await endPoints.getPosts();
    setPosts(response.data);
  };

  useEffect(getPosts, [reload]);

  const triggerReload = () => {
    setReload(reload + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
  };
  const handleLogin = () => {
    loginWithRedirect();
    setAccessToken();
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <nav
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/">
                {">"} Home
              </Link>
              <div style={{ display: "flex" }}>
                {isAuthenticated ? (
                  <>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      src={user.picture}
                      alt="profile"
                    />
                    <button
                      style={{
                        background: "none",
                        border: "oldlace",
                        color: "white",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button style={{ cursor: "pointer" }} onClick={handleLogin}>
                    Log In
                  </button>
                )}
              </div>
            </nav>
            <Routes>
              <Route
                path="/new"
                element={
                  <PostForm
                    user={user}
                    triggerReload={triggerReload}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/:postId/edit"
                element={
                  <UpdatePost
                    posts={posts}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    triggerReload={triggerReload}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Home
                    posts={posts}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    triggerReload={triggerReload}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
