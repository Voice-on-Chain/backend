import express from "express";
import { CommentController } from "./../controllers/comment.controller";

const commentController = new CommentController();

const router = express.Router();

router.get("/:id", commentController.getComments);

router.post("/reply", commentController.replyComment);
router.post("/:id/applaud", commentController.applaudComment);
router.post("/:id/lend-voice", commentController.lendVoiceOnComment);

router.post("/reply/:id/applaud", commentController.applaudReply);
router.post("/reply/:id/lend-voice", commentController.lendVoiceOnReply);

export default router;
