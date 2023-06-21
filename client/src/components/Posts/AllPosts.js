import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadMovies } from "../../store/middleware/movies";
import { useEffect } from "react";
import PostCard from "../PostCard";
import { Typography } from "@mui/material";

const AllPosts = ({ searchParams }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);
  const posts = useSelector((state) => state.list);
  if (posts.length === 0) {
    return <h2>No posts are available.</h2>;
  }
  if (searchParams) {
    let searchResults = [];
    for (let i = 0; i < posts.length; i++) {
      if (
        posts[i].title.includes(searchParams) ||
        posts[i].categories.includes(searchParams) ||
        posts[i].author.includes(searchParams)
      )
        searchResults.push(posts[i]);
    }
    if (searchResults.length === 0) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ marginLeft: "20%", marginTop: "2rem" }}
          >
            No posts match {searchParams}
          </Typography>
        </div>
      );
    }
    return (
      <div>
        <Typography
          variant="h4"
          style={{ marginLeft: "20%", marginTop: "2rem" }}
        >
          All Posts matching: {searchParams}
        </Typography>
        {searchResults.map((post, index) => {
          return (
            <PostCard
              key={index}
              title={post.title}
              categories={post.categories}
              author={post.author}
              created={post.created}
              id={post._id}
              comments={post.comments}
              ownerId={post.ownerId}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h4" style={{ marginLeft: "20%", marginTop: "2rem" }}>
        All Posts
      </Typography>
      {posts.map((post, index) => {
        return (
          <PostCard
            key={index}
            title={post.title}
            categories={post.categories}
            author={post.author}
            created={post.created}
            id={post._id}
            comments={post.comments}
            ownerId={post.ownerId}
          />
        );
      })}
    </div>
  );
};

export default AllPosts;
