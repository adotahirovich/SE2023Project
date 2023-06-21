import User from "../models/user.model.js";
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = (req, res, next) => {
  const user = new User(req.body);
  if (req.body.password !== req.body.confirmedPassword)
    return res
      .status(400)
      .json({ error: "Passwords must match", message: "Greska" });
  user.save((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(err), message: "Greska" });
    }
    res.status(200).json({ message: "Successfully created a new user." });
  });
};
const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json(users);
  }).select("name lastName email update created");
};
const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};
const update = (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ error: "Name is required" });
  if (!req.body.lastName)
    return res.status(400).json({ error: "Last name is required" });
  if (!/.+\@.+\..+/.test(req.body.email))
    return res.status(400).json({ error: "Email is required" });

  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json(user);
  });
};
const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.status(200).json(deletedUser);
  });
};

export default { create, list, userById, read, update, remove };
