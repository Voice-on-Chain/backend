import { Request, Response } from "express";
import AIContentService from "../services/ai.service";

const aiContentService = new AIContentService();

class AIContentController {
  // Controller to handle post content generation
  static async generatePost(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const content = await aiContentService.generatePostContent();
      response.status(200).json({ content });
    } catch (error) {
      console.error("Error generating post content:", error);
      response.status(500).json({ error: "Failed to generate post content" });
    }
  }

  // Controller to handle proposal generation
  static async generateProposal(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const proposal = await aiContentService.generateProposal();
      response.status(200).json(proposal);
    } catch (error) {
      console.error("Error generating proposal:", error);
      response.status(500).json({ error: "Failed to generate proposal" });
    }
  }

  // Controller to handle poll content generation
  static async generatePoll(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const poll = await aiContentService.generatePollContent();
      response.status(200).json(poll);
    } catch (error) {
      console.error("Error generating poll content:", error);
      response.status(500).json({ error: "Failed to generate poll content" });
    }
  }
}

export default AIContentController;
