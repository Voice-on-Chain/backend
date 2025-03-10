import { model, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IProps {
  minimum_voice_power: number;
  minimum_voice_age: number;
}

const PropSchema = new Schema<IProps>(
  {
    minimum_voice_power: { type: Number, require: true },
    minimum_voice_age: { type: Number, require: true },
  },
  { _id: false }
);

export interface ICommunity {
  name: string;
  description: string;
  contract_address: string;
  creator: IUser;
  twitter: string;
  website: string;
  criterias: string[];
  logo: {
    url: string;
    id: string;
  };
  banner: {
    url: string;
    id: string;
  };
  voice_power_rate: number;
  minimum_voice_power_required_to_join: number;
  post: IProps;
  comment: IProps;
  proposal: IProps;
  poll: IProps;
  token_to_distribute: number;
  distribution_date: Date;
  members: IUser[];
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: true,
    },
    banner: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    logo: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    contract_address: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    criterias: {
      type: [String],
      required: true,
    },
    post: {
      type: PropSchema,
      required: true,
    },
    comment: {
      type: PropSchema,
      required: true,
    },
    proposal: {
      type: PropSchema,
      required: true,
    },
    poll: {
      type: PropSchema,
      required: true,
    },
    distribution_date: {
      type: Date,
      required: true,
    },
    minimum_voice_power_required_to_join: {
      type: Number,
      required: true,
    },
    token_to_distribute: {
      type: Number,
      required: true,
    },
    voice_power_rate: {
      type: Number,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

CommunitySchema.index({ name: "text", description: "text" });

export const Community = model<ICommunity>("Community", CommunitySchema);
