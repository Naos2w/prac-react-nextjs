"use client";
import { useState, createContext } from "react";
import { Message } from "@/types/message";

type MessageContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
