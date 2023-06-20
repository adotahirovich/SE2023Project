import React from "react";

const Comment = ({ comment }) => {
  return (
    <div style={{ display: "flex" }}>
      <h2
        style={{
          borderRadius: "50%",
          backgroundColor: "#bdbdbd",
          padding: "0.5rem",
          marginRight: "1rem",
          color: "white",
        }}
      >
        {comment.postedBy.name[0]}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {comment.postedBy.name + " " + comment.postedBy.lastName}
        <br />
        {comment.comment}
      </div>
    </div>
  );
};

export default Comment;
