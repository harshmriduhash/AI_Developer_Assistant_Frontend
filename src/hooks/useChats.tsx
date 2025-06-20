import { useEffect, useRef, useState } from "react";
import { ChatEntry, fetchChatLog, postQuery } from "../api/chatApi";

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const loadChatLog = async () => {
    try {
      const data = await fetchChatLog();
      const sorted = data.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setChatLog(sorted);
    } catch (err: any) {
      setError("Failed to fetch chat log");
    }
  };

  // Load chat history on component mount
  useEffect(() => {
    loadChatLog();
  }, []);

  // Maintain chat scroll position
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    /* 
     Immediate on-screen display using a temporary ID and temporary creation time
     so that the user can see their question while the response is being generated
    */
    const tempEntry: ChatEntry = {
      id: Date.now(),
      question: userMessage,
      response: "",
      created_at: new Date().toISOString(),
    };
    setChatLog((prev) => [...prev, tempEntry]);
    const index = chatLog.length;

    try {
      const stream = await postQuery(userMessage);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullReply = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          fullReply += chunk;

          setChatLog((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], response: fullReply };
            return updated;
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      await loadChatLog();
    }
  };

  return {
    message,
    setMessage,
    chatLog,
    loading,
    error,
    chatEndRef,
    sendMessage,
  };
};

export default useChat;
