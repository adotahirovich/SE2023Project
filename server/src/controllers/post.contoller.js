import Post from "../models/post.model.js";
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = (req, res, next) => {
  const post = new Post(req.body);
  post.save((err, result) => {
console.log("prosoo")
console.log(req.body);

    if (err) {
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(err), message: "Greska" });
    }
    res.status(200).json({ message: "Successfully created a new post." });
  });
};
const list = (req, res) => {
  Post.find((err, post) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json(post);
  }).select("title categories author description created comments ownerId");
};
const postById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: "post not found!" });
    }
    req.profile = post;
    next();
  });
};
const read = (req, res) => {
  res.status(200).json(req.profile);
};
const addComment = (req, res, next) => {
  if (req.body.comment.length === 0)
    return res.status(400).json({ error: "Comment cant be empty!" });
  Post.findById(req.body.postId).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: "post not found!" });
    }
    req.profile = post;
    post.comments.push(req.body);
    post.save((err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: errorHandler.getErrorMessage(err) });
      }
      // res.status(200).json(post);
    });
    next();
  });
};

const updatePost = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      title: req.body.values.title,
      categories: req.body.values.categories,
    },
    function (err, docs) {
      if (err) {
        return res
          .status(400)
          .json({ error: errorHandler.getErrorMessage(err) });
      } else {
        res.status(200).json(docs);
      }
    }
  );
};
const remove = (req, res, next) => {
  Post.findByIdAndDelete(req.body.postId, function (err, docs) {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.status(200).json(docs);
    }
  });
};

export default { create, list, postById, read, addComment, remove, updatePost };
