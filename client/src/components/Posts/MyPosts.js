import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";
import { useEffect } from "react";
import { loadMovies } from "../../store/middleware/movies";
import { Typography } from "@mui/material";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const MyPosts = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);
  const posts = useSelector((state) => state.list);

  let myPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].ownerId === user._id) myPosts.push(posts[i]);
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h4" style={{ marginLeft: "20%" }}>
          My Posts
        </Typography>
        <Button
          color="primary" // Change color prop to "primary" for the primary color (purple)
          variant="contained"
          onClick={() => navigate("/add_post")}
        >
          create post
        </Button>
      </div>
      <hr />
      {myPosts.map((post, index) => {
        return (
          <PostCard
            key={index}
            title={post.title}
            categories={post.categories}
            author={post.author}
            created={post.created}
            id={post._id}
            ownerId={post.ownerId}
          />
        );
      })}
    </div>
  );
};

export default MyPosts;
