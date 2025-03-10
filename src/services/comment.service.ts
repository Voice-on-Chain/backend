import { Comment, Reply } from "../models/comment.model";
export class CommentService {
  public async getComments(parentId: string, type: string) {
    const comments = await Comment.find({
      parentId: parentId,
      __t:
        type === "post"
          ? "PostComment"
          : type === "proposal"
          ? "ProposalComment"
          : "",
    })
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate("author")
      .sort({ updatedAt: -1 });
    return comments;
  }

  public async applaudComment(_id: string, userId: string) {
    await Comment.findOneAndUpdate(
      {
        _id,
      },
      {
        $addToSet: { applauds: userId },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded comment";
  }

  public async lendVoiceOnComment(_id: string, userId: string, amount: number) {
    await Comment.findOneAndUpdate(
      {
        _id,
        "lentVoices.by": { $ne: userId },
      },
      {
        $push: { lentVoices: { by: userId, amount } },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded comment";
  }

  public async replyComment(payload: any) {
    const { comment } = payload;
    const reply = new Reply(payload);
    await reply.save();

    await Comment.findOneAndUpdate(
      {
        _id: comment,
      },
      {
        $push: { replies: reply._id },
      },
      {
        new: true,
      }
    );

    return "Successfully replied comment";
  }

  public async applaudReply(_id: string, userId: string) {
    await Reply.findOneAndUpdate(
      {
        _id,
      },
      {
        $addToSet: { applauds: userId },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded reply";
  }

  public async lendVoiceOnReply(_id: string, userId: string, amount: number) {
    await Reply.findOneAndUpdate(
      {
        _id,
        "lentVoices.by": { $ne: userId },
      },
      {
        $push: { lentVoices: { by: userId, amount } },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded reply";
  }
}
