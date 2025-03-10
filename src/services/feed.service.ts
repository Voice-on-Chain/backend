import OpenAI from "openai";
import { Poll } from "../models/poll.model";
import { Post } from "../models/post.model";
import { Proposal } from "../models/proposal.model";

export class FeedService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "YOUR_API_KEY",
    });
  }
  public async getFeed(page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author")
      .populate("community")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Fetch the 10 most recent polls
    const polls = await Poll.find()
      .populate("author")
      .populate("community")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Fetch the 10 most recent proposals
    const proposals = await Proposal.find()
      .populate("author")
      .populate("community")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Combine all items into one array
    let feed = [
      ...posts.map((post) => ({ type: "post", data: post })),
      ...polls.map((poll) => ({ type: "poll", data: poll })),
      ...proposals.map((proposal) => ({ type: "proposal", data: proposal })),
    ];

    // Shuffle the combined feed items to mix posts, polls, and proposals
    feed = this.shuffleArray(feed);

    return feed;
  }

  // Function to fetch the recent feed activity and summarize it
  public async getRecentFeedSummary(limit = 30): Promise<string> {
    // Fetch the most recent posts
    const posts = await Post.find().sort({ createdAt: -1 }).limit(limit);

    // Fetch the most recent polls
    const polls = await Poll.find().sort({ createdAt: -1 }).limit(limit);

    // Fetch the most recent proposals
    const proposals = await Proposal.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    // Combine all items into one array for summarization
    const combinedFeed = [
      ...posts.map((post) => ({ type: "post", content: post.content })),
      ...polls.map((poll) => ({ type: "poll", content: poll.question })),
      ...proposals.map((proposal) => ({
        type: "proposal",
        content: `${proposal.title}: ${proposal.description}`,
      })),
    ];

    // Generate a compiled summary for this feed activity
    return await this.summarizeFeedActivity(combinedFeed);
  }

  // Function to generate a summary for the entire feed activity
  private async summarizeFeedActivity(
    feed: { type: string; content: string }[]
  ): Promise<string> {
    const prompt = this.createFeedSummaryPrompt(feed);

    try {
      const summary = await this.generateContent(prompt);
      return summary;
    } catch (error) {
      console.error("Error generating feed summary:", error);
      return "Error generating feed summary";
    }
  }

  // Function to create the AI prompt for summarizing the feed
  private createFeedSummaryPrompt(
    feed: { type: string; content: string }[]
  ): string {
    let feedDetails = feed
      .map((item) => `${item.type}: ${item.content}`)
      .join("\n");

    return `
    Here are the recent activities from Blockchain communities:
    
    ${feedDetails}

    Please generate a detailed summary of the recent activities with at least two paragraphs. The first paragraph should highlight key trends and developments from the posts, while the second paragraph should focus on the discussions and decisions from the polls and proposals. Be sure to capture the most important highlights from each type of activity, including specific examples of posts, poll questions, and proposal titles.
    `;
  }

  // Helper function to interact with OpenAI API
  private async generateContent(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 600, // Increase token limit for a detailed summary
      temperature: 0.7,
    });

    return response?.choices[0]?.message?.content?.trim() || "";
  }

  // Helper function to shuffle the array (Fisher-Yates shuffle)
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
