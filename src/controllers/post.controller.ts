import { Response } from "express";
import { PostService } from "../services/post.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const postService = new PostService();

export class PostController {
  public async getPost(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const post = await postService.getPost(id);
      return response.status(200).json(post);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async createPost(request: ExtendedRequest, response: Response) {
    const payload = request.body;
    try {
      const post = await postService.createPost(payload);
      return response.status(201).json(post);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updatePost(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const payload = request.body;
    const user = request?.user;
    if (user?._id !== payload?.author)
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to update this resource"
        );

    try {
      const post = await postService.updatePost(id, payload);
      return response.status(200).json(post);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async deletePost(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { author } = request.body;
    const user = request?.user;
    if (user?._id !== author)
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to delete this resource"
        );

    try {
      await postService.deletePost(id);
      return response.status(204).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async applaudPost(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { userId } = request.body;
    try {
      await postService.applaudPost(id, userId);
      return response.status(200).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async lendVoiceOnPost(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { userId, amount } = request.body;
    try {
      await postService.lendVoiceOnPost(id, userId, amount);
      return response.status(200).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateSeenByPost(request: ExtendedRequest, response: Response) {
    const { id, userId } = request.params;
    try {
      await postService.updateSeenByPost(id, userId);
      return response.status(200).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async commentOnPost(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const payload = request.body;
      const message = await postService.commentOnPost(id, payload);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
