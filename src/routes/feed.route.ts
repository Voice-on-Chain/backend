import express from "express";
import { FeedController } from "../controllers/feed.controller";

const feedController = new FeedController();
const router = express.Router();

router.get("", feedController.getFeed);

// router.get("/summary", feedController.getFeedSummary);

export default router;
