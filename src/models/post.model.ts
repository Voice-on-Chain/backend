import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

interface IPost {
  author: IUser;
  seenBy: IUser[];
  content: string;
  images: {
    url: string;
    id: string;
  }[];
  applauds: IUser[];
  lentVoices: { by: IUser; amount: number }[];
  community: ICommunity;
  comments: number;
}

const PostSchema = new Schema<IPost>(
  {
    applauds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lentVoices: [
      {
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        amount: { type: Number },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: { type: String, required: true },
    images: [
      {
        url: { type: String },
        id: { type: String },
      },
    ],
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ content: "text" });

export const Post = model<IPost>("Post", PostSchema);
