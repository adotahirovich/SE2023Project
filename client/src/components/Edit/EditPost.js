import { Button } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContentState, EditorState } from "draft-js";
import apiServices from "../../api/api-post";

const EditPost = ({ showNotification }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const postInfo = location.state;

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(postInfo?.postInfo?.description || "")
    )
  );
  
  const [values, setValues] = useState({
    title: postInfo?.postInfo?.title || "",
    categories: postInfo?.postInfo?.categories || "",
    description: postInfo?.postInfo?.description || "",
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleUpdate = () => {
    const newValues = {
      title: values.title,
      categories: values.categories,
      description: editorState.getCurrentContent().getPlainText("\u0001"),
    };
    apiServices
      .updatePost(
        { postId: postInfo.postInfo.id },
        {
          t: "",
        },
        { values: newValues, postId: postInfo.postInfo.id }
      )
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
          showNotification("Post edited");
          navigate("/my_posts");
        }
      });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "10%",
          minWidth: "5rem",
          width: "80%",
        }}
      >
        <h1>Edit Post</h1>
        <input
          type="text"
          placeholder="Title"
          style={{ width: "80%", padding: "0.5rem 1rem", margin: "1rem" }}
          value={values.title}
          onChange={handleChange("title")}
        />
        <input
          type="text"
          placeholder="enter categories with , seperated"
          style={{ width: "80%", padding: "0.5rem 1rem", margin: "1rem" }}
          value={values.categories}
          onChange={handleChange("categories")}
        />
        {/* <input
          type="text"
          placeholder="Tell a description"
          style={{
            width: "80%",
            padding: "0.5rem 1rem",
            margin: "1rem",
            height: "5rem",
          }}
          value={values.description}
          onChange={handleChange("description")}
        /> */}
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "1rem" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/my_posts")}
          >
            my posts
          </Button>
        </div>
        {values.error && <h4 style={{ color: "red" }}>{values.error}</h4>}
      </div>
    </div>
  );
};

export default EditPost;
