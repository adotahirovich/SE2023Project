import { TextField, Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import apiServices from "../../../api/api-post";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  button: {
    marginTop: "1rem",
    backgroundColor: "#F2C417",
    color: "white",
  },
  textField: {
    width: '100%',
  }
});

const AddComment = ({
  postInfo,
  user,
  showCommentAddedMessage,
  setPostInfo1,
  postInfo1,
}) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [values, setValues] = useState({
    error: "",
  });

  const addComment = () => {
    apiServices
      .update(
        { postId: postInfo.id },
        {
          t: "",
        },
        { comment: comment, postId: postInfo.id, postedBy: user }
      )
      .then((data) => {
        if (data && data.error) setValues({ ...values, error: data.error });
        else {
          setValues({ ...values, error: "" });
          showCommentAddedMessage();
          let newCommentsArray;
          if (Array.isArray(postInfo1)) {
            newCommentsArray = [
              ...postInfo1,
              {
                comment: comment,
                postId: postInfo.id,
                postedBy: user,
              },
            ];
          } else {
            newCommentsArray = [
              {
                comment: comment,
                postId: postInfo.id,
                postedBy: user,
              },
            ];
          }
          setPostInfo1(newCommentsArray);
          setComment("");
        }
      });
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <Grid container className={classes.root}>
      <TextField
        error={!!values.error}
        helperText={values.error ? values.error : null}
        placeholder="Add a comment"
        variant="outlined"
        className={classes.textField}
        value={comment}
        onChange={handleChange}
      />
      <Button variant="contained" className={classes.button} onClick={addComment}>
        Add Comment
      </Button>
    </Grid>
  );
};

export default AddComment;
