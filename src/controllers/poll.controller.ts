import { Response } from "express";
import { PollService } from "../services/poll.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const pollService = new PollService();

export class PollController {
  public async getPoll(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const poll = await pollService.getPoll(id);
      return response.status(200).json(poll);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async createPoll(request: ExtendedRequest, response: Response) {
    const payload = request.body;
    try {
      const poll = await pollService.createPoll(payload);
      return response.status(201).json(poll);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updatePoll(request: ExtendedRequest, response: Response) {
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
      const poll = await pollService.updatePoll(id, payload);
      return response.status(200).json(poll);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async deletePoll(request: ExtendedRequest, response: Response) {
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
      await pollService.deletePoll(id);
      return response.status(204).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async voteOnPoll(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { userId, vote } = request.body;
    try {
      await pollService.voteOnPoll(id, userId, vote);
      return response.status(200).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateSeenByPoll(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { userId } = request.body;
    try {
      await pollService.updateSeenByPoll(id, userId);
      return response.status(200).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
