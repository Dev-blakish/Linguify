import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateChatResponse(
  prompt: string,
  language: string,
  level: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful language tutor for ${language} at ${level} level. 
            Respond in a friendly and encouraging way, correcting any language mistakes.
            Keep responses concise and focused on the language learning context.`,
        },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate chat response");
  }
}
