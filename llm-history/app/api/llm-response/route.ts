import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  // for Groq. Get your api-key and save it in .env file with GROQ_API_KEY name
  const openai = createOpenAI({
    baseURL:'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY
  });

  const result = await streamText({
    model: openai('llama-3.1-70b-versatile'),
    prompt: prompt, 
    system: "you are the greatest historian ever and are really good at explaining human history. you can act like any historical figure or any person in a time period extremely well and answer questions about any period of time very well."
  });

  return result.toDataStreamResponse();
}
