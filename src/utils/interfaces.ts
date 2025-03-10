import { Request } from "express";
import { IUser } from "../models/user.model";

export interface ExtendedRequest extends Request {
  address?: string;
  fileUploaded?: { url: string; id: string };
  user?: any;
}
