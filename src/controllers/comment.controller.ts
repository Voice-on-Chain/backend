import { Response } from "express";
import { CommentService } from "../services/comment.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const commentService = new CommentService();

export class CommentController {
  public async getComments(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { type } = request.query;
      const comments = await commentService.getComments(id, type as string);
      return response.status(200).json(comments);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async replyComment(request: ExtendedRequest, response: Response) {
    try {
      const payload = request.body;
      const message = await commentService.replyComment(payload);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async applaudComment(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      const message = await commentService.applaudComment(id, userId);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async lendVoiceOnComment(
    request: ExtendedRequest,
    response: Response
  ) {
    try {
      const { id } = request.params;
      const { userId, amount } = request.body;
      const message = await commentService.lendVoiceOnComment(
        id,
        userId,
        amount
      );
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async applaudReply(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      const message = await commentService.applaudReply(id, userId);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async lendVoiceOnReply(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { userId, amount } = request.body;
      const message = await commentService.lendVoiceOnReply(id, userId, amount);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
