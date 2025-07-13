"use client";
import { useState, createContext } from "react";
import { Message } from "@prisma/client";

type MessageContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  msgTotalCount: number;
  setMsgTotalCount: (msgTotalCount: number) => void;
  username: string;
  setUsername: (username: string) => void;
  resultMessage: string;
  setResultMessage: (resultMessage: string) => void;
  resultMessageType: "success" | "info" | "error" | "warning";
  setResultMessageType: (
    resultMessageType: "success" | "info" | "error" | "warning"
  ) => void;
  resultMessageOpenFlag: boolean;
  setResultMessageOpenFlag: (resultMessageOpenFlag: boolean) => void;
  resultMessageKey: number;
  setResultMessageKey: (resultMessageKey: number) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
  msgTotalCount: 0,
  setMsgTotalCount: () => {},
  username: "",
  setUsername: () => {},
  resultMessage: "",
  setResultMessage: () => {},
  resultMessageType: "info",
  setResultMessageType: () => {},
  resultMessageOpenFlag: false,
  setResultMessageOpenFlag: () => {},
  resultMessageKey: 0,
  setResultMessageKey: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgTotalCount, setMsgTotalCount] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resultMessageType, setResultMessageType] = useState<
    "success" | "info" | "error" | "warning"
  >("info");
  const [resultMessageOpenFlag, setResultMessageOpenFlag] =
    useState<boolean>(false);
  const [resultMessageKey, setResultMessageKey] = useState<number>(0);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        msgTotalCount,
        setMsgTotalCount,
        username,
        setUsername,
        resultMessage,
        setResultMessage,
        resultMessageType,
        setResultMessageType,
        resultMessageOpenFlag,
        setResultMessageOpenFlag,
        resultMessageKey,
        setResultMessageKey,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
