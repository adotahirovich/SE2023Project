import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  Button,
  Card,
  TextField,
  Typography
} from "@mui/material";
import apiServices from "../../../api/api-post";
import { Link, useNavigate } from "react-router-dom";

const AddPost = ({ user, showNotification }) => {
  const navigate = useNavigate();
  const [openLeavPageDialog, setOpenLeavePageDialog] = useState(false);
  const [values, setValues] = useState({
    title: "",
    categories: "",
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  if (Object.keys(user).length === 0) return navigate("/login");
  const handleCreate = () => {
    const post = {
      title: values.title || undefined,
      categories: values.categories || undefined,
      author: user.name + " " + user.lastName,
      created: Date.now(),
      ownerId: user._id,
    };
    apiServices.create(post).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
        showNotification("Post added");
        navigate("/all_posts");
      }
    });
  };
  const checkIfFormStarted = () => {
    if (values.title || values.categories) {
      setOpenLeavePageDialog(true);
    } else {
      navigate("/my_posts");
    }
  };


  const goBack = () => {
    navigate("/my_posts");
  }


  return (
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    p: 3,
  }}
>
  <Card variant="outlined" sx={{ p: 3, mt: 3, width: "80%" }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Post
      </Typography>
      <Button
        onClick={goBack}
        variant="outlined"
        sx={{
          top: 2,
          right: 2,
        }}
      >
        <ArrowBackIcon />
      </Button>
    </Box>

    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        placeholder="Title"
        margin="normal"
        value={values.title}
        onChange={handleChange("title")}
        variant="outlined"
        fullWidth
      />
      <TextField
        placeholder="enter categories with , seperated"
        margin="normal"
        value={values.categories}
        onChange={handleChange("categories")}
        variant="outlined"
        fullWidth
      />

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={checkIfFormStarted}
        >
          My Posts
        </Button>
      </Box>
      {values.error && (
        <Typography component="p" color="error">
          <strong>{values.error}</strong>
        </Typography>
      )}
    </Box>
  </Card>
  {/* The Dialog component stays the same */}
</Box>

  );
};


export default AddPost;
