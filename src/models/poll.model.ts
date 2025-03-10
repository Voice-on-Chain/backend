import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

interface IPoll {
  question: string;
  options: string[];
  multiple: boolean;
  votes: { by: IUser; vote: string }[];
  seenBy: IUser[];
  author: IUser;
  community: ICommunity;
  status: "active" | "closed";
}

const PollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    multiple: { type: Boolean, required: true },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    votes: [
      {
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        vote: { type: String, required: true },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

PollSchema.index({ question: "text" });
PollSchema.index({ options: 1 });

export const Poll = model<IPoll>("Poll", PollSchema);
