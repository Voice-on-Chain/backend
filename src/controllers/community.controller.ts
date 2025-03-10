import { Response } from "express";
import { CommunityService } from "../services/community.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const communityService = new CommunityService();

export class CommunityController {
  public async getCommunities(request: ExtendedRequest, response: Response) {
    try {
      const { page, limit } = request.query;
      const communities = await communityService.getCommunities(
        Number(page || 1),
        Number(limit || 30)
      );
      return response.status(200).json(communities);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async getNewCommunities(request: ExtendedRequest, response: Response) {
    try {
      const { page, limit } = request.query;
      const communities = await communityService.getNewCommunities(
        Number(page || 1),
        Number(limit || 30)
      );
      return response.status(200).json(communities);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async getPopularCommunities(
    request: ExtendedRequest,
    response: Response
  ) {
    try {
      const { page, limit } = request.query;
      const communities = await communityService.getPopularCommunities(
        Number(page || 1),
        Number(limit || 30)
      );
      return response.status(200).json(communities);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async getCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const community = await communityService.getCommunity(id);
      return response.status(200).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async createCommunity(request: ExtendedRequest, response: Response) {
    const payload = request.body;
    try {
      const community = await communityService.createCommunity(payload);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const payload = request.body;
    const user = request?.user;

    if (user?.address !== payload?.creator)
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to update this resource"
        );

    try {
      const community = await communityService.updateCommunity(id, payload);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async deleteCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const user = request?.user;

    if (!user?.communities?.includes(id))
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to delete this resource"
        );
    try {
      const community = await communityService.deleteCommunity(id);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityMembers(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id } = request.params;
    try {
      const members = await communityService.getCommunityMembers(id);
      return response.status(200).json(members);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityStats(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const stats = await communityService.getCommunityStats(id);
      return response.status(200).json({ ...stats });
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityProposals(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id } = request.params;
    const { page, limit, status } = request.query;
    try {
      const proposals = await communityService.getCommunityProposals(
        id,
        Number(page || 1),
        Number(limit || 30),
        status as string
      );
      return response.status(200).json(proposals);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityPosts(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { page, limit } = request.query;
      const posts = await communityService.getCommunityPosts(
        id,
        Number(page || 1),
        Number(limit || 30)
      );
      return response.status(200).json(posts);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityPolls(request: ExtendedRequest, response: Response) {
    try {
      const { id } = request.params;
      const { page, limit, status } = request.query;
      const polls = await communityService.getCommunityPolls(
        id,
        Number(page || 1),
        Number(limit || 30),
        status as string
      );
      return response.status(200).json(polls);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getUserEngagements(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id } = request.params;
    const { userId } = request.query;
    try {
      const result = await communityService.getUserEngagements(
        id,
        userId as string
      );
      return response.status(200).json({ ...result });
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
