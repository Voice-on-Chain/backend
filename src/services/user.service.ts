import { Community } from "../models/community.model";
import { User } from "../models/user.model";
import AppError from "../utils/helpers/AppError";

export class UserService {
  public async getProfile(_id?: string) {
    const user = await User.findOne({ _id }).populate({
      path: "communities",
      select: "name logo",
    });
    if (!user) throw new AppError(404, "User not found!");
    return user;
  }

  public async createProfile(payload: any) {
    this.verifyUsernameUniqueness(payload?.username);
    const user = new User(payload);
    return await user.save();
  }

  public async updateProfile(payload: any) {
    const { email, username, address, country } = payload;
    const user = await User.findOne({ address });
    if (!user) {
      return this.createProfile(payload);
    }
    if (email) user.email = email;
    if (country) user.country = country;
    if (username) {
      this.verifyUsernameUniqueness(username);
      user.username = username;
    }

    if (address) {
      user.address = address;
    }
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async updateProfilePhoto(
    fileUploaded: {
      url: string;
      id: string;
    },
    _id: string
  ) {
    const user = await User.findOne({ _id });
    if (!user) throw new AppError(404, "user not found");
    if (fileUploaded) user.profilePhoto = fileUploaded;

    const updatedUser = await user.save();
    return updatedUser;
  }

  public async deleteProfilePhoto(_id: string) {
    const user = await User.findOne({ _id });
    if (!user) throw new AppError(404, "user not found");
    user.profilePhoto = null;

    const updatedUser = await user.save();
    return updatedUser;
  }

  private async verifyUsernameUniqueness(username: string) {
    const user = await User.findOne({ username });
    if (user) return new AppError(400, "Username already exists!");
    return true;
  }

  public async getUserCommunities(_id: string) {
    const user = await User.findOne({ _id }).populate("communities");
    return user?.communities;
  }

  public async joinCommunity(_id: string, communityId: string) {
    await User.findOneAndUpdate(
      {
        _id,
      },
      { $push: { communities: communityId } },
      { new: true }
    );

    await Community.findOneAndUpdate(
      {
        _id: communityId,
      },
      { $addToSet: { members: _id } },
      { new: true }
    );

    return "Successfully joined community";
  }

  public async leaveCommunity(_id: string, communityId: string) {
    await User.findOneAndUpdate(
      {
        _id,
      },
      { $pull: { communities: communityId } },
      { new: true }
    );

    await Community.findOneAndUpdate(
      {
        _id: communityId,
      },
      { $pull: { members: _id } },
      { new: true }
    );

    return "Successfully left community";
  }

  public async lendVoice(_id: string, payload: any) {
    const { toId, voicePower } = payload;
    await User.findOneAndUpdate(
      {
        _id,
        "lends.by": { $ne: toId },
      },
      { $push: { lends: { by: toId, voicePower } } },
      { new: true }
    );

    await User.findOneAndUpdate(
      {
        _id: toId,
        "lenders.by": { $ne: _id },
      },
      { $push: { lenders: { by: _id, voicePower } } },
      { new: true }
    );

    return "Successfully lent voice";
  }

  public async retractVoice(_id: string, payload: any) {
    const { toId } = payload;
    await User.findOneAndUpdate(
      {
        _id,
      },
      { $pull: { lends: { by: toId } } },
      { new: true }
    );

    await User.findOneAndUpdate(
      {
        _id: toId,
      },
      { $pull: { lenders: { by: _id } } },
      { new: true }
    );

    return "Successfully retracted voice";
  }
}
