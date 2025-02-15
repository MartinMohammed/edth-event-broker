import dotenv from "dotenv";
dotenv.config();

export const config = {
  elevenLabs: {
    apiKey: process.env.ELEVEN_LABS_API_KEY || "",
    voiceId: process.env.ELEVEN_LABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB", // Example voice ID
    modelId: process.env.ELEVEN_LABS_MODEL_ID || "eleven_monolingual_v1",
  },
};
