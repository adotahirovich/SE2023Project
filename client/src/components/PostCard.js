import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "1rem",
  },
  title: {
    padding: `"2rem" "2rem" "2rem"`,
    color: "black",
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

const PostCard = ({
  title,
  categories,
  author,
  description,
  created,
  id,
  comments,
  ownerId,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const categoriesArray = categories.split(",");
  const navigateToPost = () => {
    navigate(`/post/${id}`, {
      state: {
        title,
        categories,
        author,
        description,
        created,
        id,
        categoriesArray,
        comments,
        ownerId,
      },
    });
  };
  let time = new Date(created);
  return (
    <div style={{ cursor: "pointer" }}>
      <Card className={classes.card} onClick={navigateToPost}>
        <Typography variant="h4" className={classes.title}>
          <strong>{title}</strong>
        </Typography>
        <Typography
          variant="body1"
          className={classes.title}
          style={{ color: "blue" }}
        >
          by: {author}
        </Typography>
        <Typography variant="body1" component="p">
          {time.toUTCString()}
        </Typography>
        <div style={{ display: "flex" }}>
          {categoriesArray.map((category, index) => {
            /* eslint-disable-next-line */
            if (category.length === 0) return;
            return (
              <div
                style={{
                  border: "2px solid blue",
                  color: "blue",
                  borderRadius: "40%",
                  padding: "0.5rem",
                  margin: "0.5rem",
                }}
                key={index}
              >
                {category}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
