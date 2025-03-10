import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { ProposalController } from "../controllers/proposal.controller";
import {
  userVerification,
  verifyIfUserIsInCommunity,
} from "../middlewares/authorization.middleware";

const proposalController = new ProposalController();
const commentController = new CommentController();

const router = express.Router();

router.post(
  "/create",
  userVerification,
  verifyIfUserIsInCommunity,
  proposalController.createProposal
);

router
  .route("/:id")
  .get(proposalController.getProposal)
  .patch(userVerification, proposalController.updateProposal)
  .delete(userVerification, proposalController.deleteProposal);

router.post("/:id/vote", userVerification, proposalController.voteOnProposal);
router.post(
  "/:id/viewer/:userId",
  userVerification,
  proposalController.updateSeenByProposal
);

router
  .route("/:id/comments")
  .get(commentController.getComments)
  .post(userVerification, proposalController.commentOnProposal);

export default router;
