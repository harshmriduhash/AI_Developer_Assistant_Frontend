export interface ChatEntry {
  id: number;
  question: string;
  response: string;
  created_at: string;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const fetchChatLog = async (): Promise<ChatEntry[]> => {
  const res = await fetch(`${BASE_URL}/api/getchatlog`);
  if (!res.ok) throw new Error("Failed to fetch chat log");
  return res.json();
};

export const postQuery = async (
  message: string
): Promise<ReadableStream<Uint8Array>> => {
  const res = await fetch(`${BASE_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.body) throw new Error("No response stream");
  return res.body;
};
