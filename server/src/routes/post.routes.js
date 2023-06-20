import express from "express";
import postCtrl from "../controllers/post.contoller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/posts").get(postCtrl.list).post(postCtrl.create);
router
  .route("/api/posts/:userId")
  .put(postCtrl.addComment)

  .delete(postCtrl.remove);
router.route("/api/postsUpdate/:userId").put(postCtrl.updatePost);

export default router;
