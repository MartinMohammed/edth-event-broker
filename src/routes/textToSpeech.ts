import { Router } from "express";
import type { Request, Response } from "express";
import { ElevenLabsService } from "../services/elevenLabsService";
import { textToSpeechSchema } from "../models/schemas";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  // add some logging
  console.log("[Text-to-Speech Route] Received request:", req.body);
  try {
    const validation = textToSpeechSchema.safeParse(req.body);
    console.log("[Text-to-Speech Route] Validation result:", validation);

    if (!validation.success) {
      console.error(
        "[Text-to-Speech Route] Invalid request body:",
        validation.error.errors
      );
      return res.status(400).json({
        error: "Invalid request body",
        details: validation.error.errors,
      });
    }

    const { text } = validation.data;
    console.log("[Text-to-Speech Route] Text:", text);
    const audioBase64 = await ElevenLabsService.textToSpeech(text);
    // console.log("[Text-to-Speech Route] Audio base64:", audioBase64);
    return res.json({
      audio: audioBase64,
      format: "mp3",
      encoding: "base64",
    });
  } catch (error) {
    console.error("[Text-to-Speech Route] Error:", error);
    return res.status(500).json({
      error: "Failed to generate speech",
    });
  }
});

export default router;
