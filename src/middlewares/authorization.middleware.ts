import { NextFunction, Request, Response } from "express";
import { Community } from "../models/community.model";
import { User } from "../models/user.model";

async function addressAuthentication(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  const address = request.header("Authorization")?.replace("Bearer ", "");
  //add address validation function
  if (!address) {
    return response.status(401).json("Unauthorized. Please a valid address");
  }
  try {
    request.address = address;
    return next();
  } catch (error: any) {
    return response.status(401).json("Invalid address");
  }
}

async function verifyIfUserIsInCommunity(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { community, author } = request.body;
  if (!community || !author)
    return response.status(400).json("Invalid request");
  const _community = await Community.findById(community);
  const members = _community?.members;
  if (!members?.includes(author))
    return response.status(400).json("User does not belong to this community");
  next();
}

async function userVerification(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  const address = request.header("Authorization")?.replace("Bearer ", "");
  //add address validation function
  if (!address) {
    return response.status(401).json("Unauthorized. Please a valid id");
  }
  try {
    const user = await User.findOne({ address });
    if (!user)
      return response.status(403).json("Missing Profile: User not found");
    request.user = user;
    return next();
  } catch (error: any) {
    return response.status(401).json("Invalid request");
  }
}

export { addressAuthentication, userVerification, verifyIfUserIsInCommunity };
