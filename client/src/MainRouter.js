import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AllPosts from "./components/Posts/AllPosts";
import Post from "./components/Posts/Post";
import AddPost from "./components/Posts/modals/AddPost";
import MyProfile from "./components/MyProfile";
import UpdateProfile from "./components/UpdateProfile";
import MyPosts from "./components/Posts/MyPosts";
import EditPost from "./components/Edit/EditPost";

const MainRouter = ({
  searchParams,
  setUser,
  getCookie,
  user,
  token,
  setToken,
  showNotification,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/login"
        element={
          <Login setUser={setUser} getCookie={getCookie} setToken={setToken} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/all_posts"
        element={<AllPosts searchParams={searchParams} />}
      />
      <Route
        path="/post/:id"
        element={<Post user={user} showNotification={showNotification} />}
      />
      <Route
        path="/edit_post/:id"
        element={<EditPost user={user} showNotification={showNotification} />}
      />
      <Route
        path="/add_post"
        element={<AddPost user={user} showNotification={showNotification} />}
      />
      <Route path="/my_profile" element={<MyProfile user={user} />} />
      <Route path="/my_posts" element={<MyPosts user={user} />} />
      <Route
        path="/update_profile"
        element={
          <UpdateProfile
            user={user}
            setUser={setUser}
            token={token}
            showNotification={showNotification}
          />
        }
      />
    </Routes>
  );
};

export default MainRouter;
