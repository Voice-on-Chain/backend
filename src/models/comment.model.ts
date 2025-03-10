import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

export interface IProps {
  content: string;
  author: IUser;
  community: ICommunity;
  applauds: IUser[];
  lentVoices: { by: IUser; amount: number }[];
}

export interface IComment extends IProps {
  parentId: string;
  type: "post" | "proposal";
  replies: IProps[];
}

export interface IReply extends IProps {
  comment: IComment;
}

const sharedSchemaFields = {
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  applauds: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserIUser",
    },
  ],
  lentVoices: [
    {
      by: {
        type: Schema.Types.ObjectId,
        ref: "UserIUser",
      },
      amount: { type: Number },
    },
  ],
};

const ReplySchema = new Schema<IReply>(
  {
    ...sharedSchemaFields,
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const Reply = model<IReply>("Reply", ReplySchema);

const CommentSchema = new Schema<IComment>(
  {
    ...sharedSchemaFields,
    parentId: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["post", "proposal"], // Discriminator key
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", CommentSchema);

// Discriminator for Post Comments
export const PostComment = Comment.discriminator(
  "PostComment",
  new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "Post" } })
);

// Discriminator for Proposal Comments
export const ProposalComment = Comment.discriminator(
  "ProposalComment",
  new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "Proposal" } })
);

// // Discriminator for Poll Comments
// export const PollComment = Comment.discriminator(
//   "PollComment",
//   new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "Poll" } })
// );
