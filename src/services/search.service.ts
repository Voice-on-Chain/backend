import { Poll } from "../models/poll.model";
import { Post } from "../models/post.model";
import { Proposal } from "../models/proposal.model";

export class SearchService {
  // Search through all collections with MongoDB full-text search
  public async search(query: string) {
    // Define the search query object using $text
    const searchQuery = { $text: { $search: query } };

    // Perform search on Post collection
    const posts = await Post.find(searchQuery, {
      score: { $meta: "textScore" },
    })
      .populate("author")
      .populate("community")
      .sort({ score: { $meta: "textScore" } });

    // Perform search on Poll collection
    const polls = await Poll.find(searchQuery, {
      score: { $meta: "textScore" },
    })
      .populate("author")
      .populate("community")
      .sort({ score: { $meta: "textScore" } });

    // Perform search on Proposal collection
    const proposals = await Proposal.find(searchQuery, {
      score: { $meta: "textScore" },
    })
      .populate("author")
      .populate("community")
      .sort({ score: { $meta: "textScore" } });

    // Combine results and label them by type
    let searchResults = [
      ...posts.map((post) => ({ type: "post", data: post })),
      ...polls.map((poll) => ({ type: "poll", data: poll })),
      ...proposals.map((proposal) => ({ type: "proposal", data: proposal })),
    ];

    // Optionally, sort all results by relevance (textScore) if needed
    searchResults = searchResults.sort((a: any, b: any) => {
      const scoreA = a?.data?.score ?? 0;
      const scoreB = b?.data?.score ?? 0;
      return scoreB - scoreA; // Higher scores first
    });

    return searchResults;
  }
}
