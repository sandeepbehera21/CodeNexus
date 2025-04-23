// app/api/chatbot/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY); // Debug log

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is missing on the server" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      const botResponse = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ reply: botResponse });
    } else {
      return NextResponse.json(
        { error: data.error?.message || "Failed to get response from Gemini API" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in chatbot API route:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}