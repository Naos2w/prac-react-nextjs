"use client";
import { useState, createContext } from "react";
import { Message } from "@/types/message";

type MessageContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  msgTotalCount: number;
  setMsgTotalCount: (msgTotalCount: number) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
  msgTotalCount: 0,
  setMsgTotalCount: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgTotalCount, setMsgTotalCount] = useState<number>(0);

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, msgTotalCount, setMsgTotalCount }}
    >
      {children}
    </MessageContext.Provider>
  );
};
