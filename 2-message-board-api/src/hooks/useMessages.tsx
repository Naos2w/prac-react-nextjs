"use client";
import { useCallback, useContext } from "react";
import { Message } from "@/types/message";
import { MessageContext } from "@/context/MessageContext";

export function useMessages() {
  const { messages, setMessages } = useContext(MessageContext);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/message");
      const data: Message[] = await res.json();
      console.log(`fetchMessages: ${data}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  return { messages, fetchMessages };
}
