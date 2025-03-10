import { Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const userService = new UserService();
export class UserController {
  public async getProfile(request: ExtendedRequest, response: Response) {
    const { _id } = request.user;
    try {
      const user = await userService.getProfile(_id);
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async createProfile(request: ExtendedRequest, response: Response) {
    const { email, address, country, username } = request.body;
    try {
      const user = await userService.createProfile({
        email,
        address,
        country,
        username,
      });
      return response.status(201).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async updateProfile(request: ExtendedRequest, response: Response) {
    const { email, address, country, username } = request.body;
    try {
      const user = await userService.updateProfile({
        email,
        address,
        country,
        username,
      });
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async updateProfilePhoto(
    request: ExtendedRequest,
    response: Response
  ) {
    const { _id } = request.user;

    const fileUploaded = request.fileUploaded;

    if (!fileUploaded) {
      response.status(500).json({ error: "File not uploaded" });
    }

    try {
      const user = await userService.updateProfilePhoto(fileUploaded!, _id);
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async deleteProfilePhoto(
    request: ExtendedRequest,
    response: Response
  ) {
    const { _id } = request.user;

    try {
      const user = await userService.deleteProfilePhoto(_id);
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async getUserCommunities(
    request: ExtendedRequest,
    response: Response
  ) {
    const { _id } = request.user;
    try {
      const message = await userService.getUserCommunities(_id);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async joinCommunity(request: ExtendedRequest, response: Response) {
    try {
      const { _id } = request.user;
      const { communityId } = request.params;

      const message = await userService.joinCommunity(_id, communityId);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async leaveCommunity(request: ExtendedRequest, response: Response) {
    try {
      const { _id } = request.user;
      const { communityId } = request.params;

      const message = await userService.leaveCommunity(_id, communityId);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async lendVoice(request: ExtendedRequest, response: Response) {
    try {
      const { _id } = request.user;
      const payload = request.body;

      const message = await userService.lendVoice(_id, payload);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async retractVoice(request: ExtendedRequest, response: Response) {
    try {
      const { _id } = request.user;
      const payload = request.body;

      const message = await userService.retractVoice(_id, payload);
      return response.status(200).json(message);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }
}
