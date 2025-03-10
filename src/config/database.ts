import dotenv from "dotenv";

dotenv.config();

const config = {
  mongodbURI: process.env.MONGODB_URI!,
};

export default config;
