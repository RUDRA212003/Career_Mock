import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{type}}', type)
      .replace('{{duration}}', duration);

    console.log("PROMPT SENT TO GROQ:", FINAL_PROMPT);

    const groq = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });

    // ✅ Use the latest model
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI interviewer that generates professional interview questions in JSON format.",
        },
        { role: "user", content: FINAL_PROMPT },
      ],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("Error from Groq:", e);
    return NextResponse.json({ error: e.message || e });
  }
}
