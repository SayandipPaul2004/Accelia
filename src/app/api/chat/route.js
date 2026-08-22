// app/api/chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are the customer-facing chat assistant for Accelia Clinical Solutions,
a Site Management Organization (SMO) based in India that connects Sponsors and CROs with
GCP-trained research sites.

What Accelia does:
- Connects Sponsors/CROs with research sites across India
- Helps sites with study start-up, reducing administrative burden
- Helps sponsors with site selection and building strong site partnerships
- Focused on faster, smoother, more patient-centric clinical trials

Your job:
- Answer questions about Accelia's services, how the SMO/CRO model works, how to join
  the site network, and how to get in touch — clearly and concisely (2-4 sentences).
- If someone asks something you don't have specific information about (exact pricing,
  named clients, internal processes), say so honestly and suggest they contact the team
  via the Contact page.
- Do NOT give medical advice, discuss specific patient treatment, or comment on any
  individual's health situation — redirect these to "please consult a healthcare
  professional" and steer back to what you can help with.
- Stay strictly on topic: Accelia's business, clinical trial site management, and how
  to engage with the company. Politely decline unrelated topics (general trivia, coding
  help, etc.) and redirect back to what you can help with.
- Keep tone professional but warm — this is a B2B site for sponsors, CROs, and clinics.
- Keep replies short. This is a chat widget, not an article.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "messages array required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    });

    const converted = messages.map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Gemini requires history to start with a "user" turn. Our widget always
    // seeds the chat with a bot welcome message, so drop any leading "model"
    // turns before the first "user" turn shows up.
    const firstUserIndex = converted.findIndex((m) => m.role === "user");
    const trimmed =
      firstUserIndex === -1 ? [] : converted.slice(firstUserIndex);

    const history = trimmed.slice(0, -1);
    const latest = trimmed[trimmed.length - 1];

    if (!latest) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(latest.parts[0].text);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
