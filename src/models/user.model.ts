import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";

export interface IUser {
  email: string;
  address: string;
  country: string;
  profilePhoto?: {
    url: string;
    id: string;
  } | null;
  username: string;
  fcmToken?: string;
  communities: ICommunity[];
}

export interface ExtendedUser extends IUser {
  lenders: { voicePower: number; by: IUser }[];
  lends: { voicePower: number; by: IUser }[];
}

const UserSchema = new Schema<ExtendedUser>(
  {
    email: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    country: { type: String, required: true },
    profilePhoto: {
      url: { type: String },
      id: { type: String },
    },
    username: { type: String, unique: true, sparse: true, required: true },
    fcmToken: { type: String },
    communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
    lenders: [
      {
        by: { type: Schema.Types.ObjectId, ref: "User" },
        voicePower: { type: Number },
      },
    ],
    lends: [
      {
        by: { type: Schema.Types.ObjectId, ref: "User" },
        voicePower: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = model<ExtendedUser>("User", UserSchema);
