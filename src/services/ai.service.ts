import OpenAI from "openai";

// AIContentService class for generating blockchain related content
class AIContentService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "YOUR_API_KEY",
    });
  }

  // Helper function to interact with OpenAI API
  private async generateContent(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 200, // Adjust based on desired length
      temperature: 0.7, // Controls creativity of responses
    });

    return response?.choices[0]?.message?.content?.trim() || "";
    // try {
    // } catch (error) {
    //   console.error("Error generating content:", error);
    //   return "Error generating content";
    // }
  }

  // Function to generate a single paragraph of post content related to blockchain and dApps
  async generatePostContent(): Promise<string> {
    const prompt = `
      Generate a single-paragraph post about blockchain and its ecosystem of decentralized applications (dApps).
      Focus on the benefits of building on blockchain, its scalability, security, and the innovations in the dApp space.
      The tone should be informative and engaging.
    `;
    return await this.generateContent(prompt);
  }

  // Function to generate a proposal with a title and description related to blockchains and dApps
  async generateProposal(): Promise<{ title: string; description: string }> {
    const prompt = `
      Generate a proposal related to the blockchain. 
      The proposal should have a catchy title and a brief description. 
      It should focus on improving the development or adoption of decentralized applications (dApps).
    `;
    const generatedContent = await this.generateContent(prompt);
    const [title, ...descriptionArray] = generatedContent
      .split("\n")
      .filter(Boolean);
    const description = descriptionArray.join(" ");

    return {
      title: title || "Proposal Title",
      description: description || "Proposal description goes here.",
    };
  }

  // Function to generate poll content with a question and options related to blockchains and dApps
  async generatePollContent(): Promise<{
    question: string;
    options: string[];
  }> {
    const prompt = `
      Generate a poll question with 4 multiple-choice options related to blockchain and decentralized applications (dApps). 
      The poll should encourage user interaction, and the options should explore aspects like scalability, security, or development on chain.
    `;
    const generatedContent = await this.generateContent(prompt);
    const lines = generatedContent.split("\n").filter(Boolean);

    return {
      question: lines[0] || "Poll question related to blockchain",
      options: lines.slice(1, 5) || [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
      ],
    };
  }
}

export default AIContentService;
