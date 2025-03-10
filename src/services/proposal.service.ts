import { ProposalComment } from "../models/comment.model";
import AppError from "../utils/helpers/AppError";
import { Proposal } from "./../models/proposal.model";

//get Proposal by id
//delete proposal
//update proposal
//update votes array
//update seen by

export class ProposalService {
  public async getProposal(_id: string) {
    const proposal = await Proposal.findOne({ _id })
      .populate("author")
      .populate("votes.by")
      .populate({
        path: "community",
        select: "proposal comment",
      });
    if (!proposal) throw new AppError(404, "Proposal not found");
    return proposal;
  }

  public async createProposal(payload: any) {
    const newProposal = new Proposal(payload);
    await newProposal.save();
    return newProposal;
  }

  public async updateProposal(_id: string, payload: any) {
    const proposal = await Proposal.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
    if (!proposal) {
      throw new AppError(404, "Proposal not found");
    }
    return proposal;
  }

  public async deleteProposal(_id: string) {
    const proposal = await Proposal.findOneAndDelete({ _id });
    if (!proposal) {
      throw new AppError(404, "Proposal not found");
    }
    return "Proposal has been deleted successfully";
  }

  public async voteOnProposal(_id: string, userId: string, vote: string) {
    await Proposal.findOneAndUpdate(
      {
        _id,
        "votes.by": { $ne: userId }, // Ensure the user hasn't already voted
      },
      {
        $push: { votes: { by: userId, vote } }, // Add the user's vote
      },
      {
        new: true,
      }
    );

    return "Successfully voted";
  }

  public async updateSeenByProposal(_id: string, userId: string) {
    await Proposal.findOneAndUpdate(
      {
        _id,
      },
      {
        $addToSet: { seenBy: userId },
      },
      {
        new: true,
      }
    );

    return "Updated";
  }

  public async commentOnProposal(_id: string, payload: any) {
    await Proposal.findOneAndUpdate(
      {
        _id,
      },
      {
        $inc: { comments: 1 },
      },
      {
        new: true,
      }
    );
    const comment = new ProposalComment({
      ...payload,
      parentId: _id,
      type: "proposal",
    });
    await comment.save();
    return "Successfully commented on proposal";
  }
}
