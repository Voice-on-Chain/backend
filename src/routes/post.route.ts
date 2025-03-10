import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { PostController } from "../controllers/post.controller";
import {
  userVerification,
  verifyIfUserIsInCommunity,
} from "../middlewares/authorization.middleware";

const postController = new PostController();
const commentController = new CommentController();

const router = express.Router();

router.post(
  "/create",
  userVerification,
  verifyIfUserIsInCommunity,
  postController.createPost
);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(userVerification, postController.updatePost)
  .delete(userVerification, postController.deletePost);

router.post("/:id/viewer/:userId", postController.updateSeenByPost);

router
  .route("/:id/comments")
  .get(commentController.getComments)
  .post(userVerification, postController.commentOnPost);

router.post("/:id/applaud", userVerification, postController.applaudPost);
router.post(
  "/:id/lend-voice",
  userVerification,
  postController.lendVoiceOnPost
);

export default router;
