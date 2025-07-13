import { Message } from "@prisma/client";

export interface UserMessageCountType {
  username: string;
  messageCount: number;
  id: string;
  color: string;
}

export interface UserWithMessagesType {
  id: string;
  username: string;
  messages: Message[];
}
export interface Stats {
  totalUsers: number;
  totalMessages: number;
  messageDistribution: {
    id: string;
    username: string;
    messageCount: number;
  }[];
  usersWithMessages: UserWithMessagesType[];
}
