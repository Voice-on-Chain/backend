import AppError from "../utils/helpers/AppError";
import { Poll } from "./../models/poll.model";

//get Poll by id
//delete poll
//update poll
//update votes array
//update seen by

export class PollService {
  public async getPoll(_id: string) {
    const poll = await Poll.findOne({ _id })
      .populate("author")
      .populate("votes.by")
      .populate({
        path: "community",
        select: "poll",
      });
    if (!poll) throw new AppError(404, "Poll not found");
    return poll;
  }

  public async createPoll(payload: any) {
    const newPoll = new Poll(payload);
    await newPoll.save();
    return newPoll;
  }

  public async updatePoll(_id: string, payload: any) {
    const poll = await Poll.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
    if (!poll) {
      throw new AppError(404, "Poll not found");
    }
    return poll;
  }

  public async deletePoll(_id: string) {
    const poll = await Poll.findOneAndDelete({ _id });
    if (!poll) {
      throw new AppError(404, "Poll not found");
    }
    return "Poll has been deleted successfully";
  }

  public async voteOnPoll(_id: string, userId: string, vote: string) {
    await Poll.findOneAndUpdate(
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

  public async updateSeenByPoll(_id: string, userId: string) {
    await Poll.findOneAndUpdate(
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
}
