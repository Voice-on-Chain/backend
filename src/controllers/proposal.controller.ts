import { Response } from "express";
import { ProposalService } from "../services/proposal.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const proposalService = new ProposalService();

export class ProposalController {
  public async getProposal(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const proposal = await proposalService.getProposal(id);
      return response.status(200).json(proposal);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async createProposal(request: ExtendedRequest, response: Response) {
    const payload = request.body;
    try {
      const proposal = await proposalService.createProposal(payload);
      return response.status(201).json(proposal);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateProposal(request: ExtendedRequest, response: Response) {
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
      const proposal = await proposalService.updateProposal(id, payload);
      return response.status(200).json(proposal);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async deleteProposal(request: ExtendedRequest, response: Response) {
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
      const message = await proposalService.deleteProposal(id);
      return response.status(204).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async voteOnProposal(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { userId, vote } = request.body;
    try {
      const message = await proposalService.voteOnProposal(id, userId, vote);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateSeenByProposal(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id, userId } = request.params;
    try {
      const message = await proposalService.updateSeenByProposal(id, userId);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async commentOnProposal(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const payload = request.body;
      const message = await proposalService.commentOnProposal(id, payload);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
