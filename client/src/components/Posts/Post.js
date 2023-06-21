import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddComment from "../Comments/modals/AddComment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "../Comments/Comment";
import {
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/base";
import apiServices from "../../api/api-post";


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "1rem",
  },

  button: {
    marginTop: "1rem",
    backgroundColor: "#F2C417",
    color: "white",
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

const Post = ({ user, showNotification }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const postInfo = location.state;
  const [postInfo1, setPostInfo1] = useState(postInfo.comments);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const showCommentAddedMessage = () => {
    toast.dark(`Comment added`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const deleteItemHandler = () => {
    apiServices.remove({ postId: postInfo.id }, { t: "" }).then(() => {
      showNotification("Post deleted");
      navigate("/all_posts");
    });
  };
  const navigateToEditPost = () => {
    navigate(`/edit_post/${postInfo.id}`, {
      state: {
        postInfo,
        user,
      },
    });
  };
  return (
    <div>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          <strong>{postInfo.title}</strong>
        </Typography>
        <div style={{ display: "flex" }}>
          {postInfo.categoriesArray.map((category, index) => {
            // eslint-disable-next-line
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
        <Typography
          variant="body1"
          className={classes.title}
          style={{ color: "blue" }}
        >
          Author: {postInfo.author}
        </Typography>
        {postInfo.ownerId === user._id && (
          <CardActions
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.button}

              onClick={navigateToEditPost}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              variant="contained"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "10%",
                backgroundColor: "#F50057",
                color: "white",
              }}
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete
            </Button>
          </CardActions>
        )}

        <hr />
        <Typography variant="body1" component="p">
          {postInfo.description}
        </Typography>
      </Card>
      {Object.keys(user).length !== 0 && (
        <>
          <Card className={classes.card}>
            <AddComment
              postInfo={postInfo}
              user={user}
              showCommentAddedMessage={showCommentAddedMessage}
              setPostInfo1={setPostInfo1}
              postInfo1={postInfo1}
            />
          </Card>
          <Card className={classes.card}>
            <h3>All Comments</h3>
            {postInfo1 ? (
              postInfo1.map((comment, index) => {
                return (
                  <div key={index}>
                    <Comment comment={comment} />
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>No comments are available</p>
            )}
          </Card>
        </>
      )}
      <ToastContainer></ToastContainer>
      {openDeleteModal && (
        <Dialog open={openDeleteModal}>
          <DialogTitle>This is a permanent action!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this blog post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/all_posts">
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={deleteItemHandler}
              >
                Delete
              </Button>
            </Link>

            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Post;
