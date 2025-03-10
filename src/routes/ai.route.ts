import { Router } from "express";
import AIContentController from "../controllers/ai.controller";
import { userVerification } from "../middlewares/authorization.middleware";

const router = Router();

// router.get("/", AIContentController.generateContent);

// Route for generating post content
router.get("/post", userVerification, AIContentController.generatePost);

// Route for generating a proposal
router.get("/proposal", userVerification, AIContentController.generateProposal);

// Route for generating poll content
router.get("/poll", userVerification, AIContentController.generatePoll);

export default router;
