import express from "express";
import { CommunityController } from "../controllers/community.controller";
import { userVerification } from "../middlewares/authorization.middleware";

const communityController = new CommunityController();

const router = express.Router();

router.get("", communityController.getCommunities);
router.get("/new", communityController.getNewCommunities);
router.get("/popular", communityController.getPopularCommunities);

router.post("/create", userVerification, communityController.createCommunity);

router
  .route("/:id")
  .get(communityController.getCommunity)
  .put(userVerification, communityController.updateCommunity)
  .delete(userVerification, communityController.deleteCommunity);

router.get("/:id/statistics", communityController.getCommunityStats);

router.get("/:id/members", communityController.getCommunityMembers);

router.get("/:id/proposals", communityController.getCommunityProposals);

router.get("/:id/posts", communityController.getCommunityPosts);

router.get("/:id/polls", communityController.getCommunityPolls);

router.get(
  "/:id/engagements",
  userVerification,
  communityController.getUserEngagements
);

export default router;
