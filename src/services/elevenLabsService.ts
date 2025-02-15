import axios from "axios";
import { config } from "../config";

export class ElevenLabsService {
  private static baseUrl = "https://api.elevenlabs.io/v1";
  private static headers = {
    "xi-api-key": config.elevenLabs.apiKey,
    "Content-Type": "application/json",
  };

  static async textToSpeech(text: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${config.elevenLabs.voiceId}`,
        {
          text,
          model_id: config.elevenLabs.modelId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: this.headers,
          responseType: "arraybuffer",
        }
      );

      // Convert audio buffer to base64
      const base64Audio = Buffer.from(response.data).toString("base64");
      return base64Audio;
    } catch (error) {
      console.error("[ElevenLabs Service] Error generating speech:", error);
      throw new Error("Failed to generate speech");
    }
  }
}
