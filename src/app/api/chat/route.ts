import { Humanloop, ChatMessage } from "humanloop";

if (!process.env.HUMANLOOP_API_KEY) {
  throw Error(
    "no Humanloop API key provided; add one to your .env.local file with: `HUMANLOOP_API_KEY=..."
  );
}

const humanloop = new Humanloop({
  basePath: "https://api.humanloop.com/v4",
  apiKey: process.env.HUMANLOOP_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  const messages: ChatMessage[] = (await req.json()) as ChatMessage[];

  const response = await humanloop.chatDeployedStream({
    project: "mini-project",
    messages,
  });

  return new Response(response.data);
}