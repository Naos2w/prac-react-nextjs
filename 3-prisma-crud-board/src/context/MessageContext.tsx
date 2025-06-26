"use client";
import { useState, createContext } from "react";
import { Message } from "@/types/message";

type MessageContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  msgTotalCount: number;
  setMsgTotalCount: (msgTotalCount: number) => void;
  username: string;
  setUsername: (username: string) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
  msgTotalCount: 0,
  setMsgTotalCount: () => {},
  username: "",
  setUsername: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgTotalCount, setMsgTotalCount] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        msgTotalCount,
        setMsgTotalCount,
        username,
        setUsername,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
