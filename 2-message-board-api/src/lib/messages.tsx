import type { Message } from "@/types/message";

const messages: Message[] = [];

export const getMessages = () => {
  return messages;
};

export const addMessage = (msg: Message) => {
  messages.unshift(msg);
};
