"use client";
import { useCallback, useContext } from "react";
import { MessageContext } from "@/context/MessageContext";

export const useMessages = () => {
  const { messages, setMessages, msgTotalCount, setMsgTotalCount } =
    useContext(MessageContext);

  const fetchMessages = useCallback(
    async (limit?: number, offset?: number) => {
      try {
        let url = "/api/messages";
        if (limit && offset) {
          url += `?limit=${limit}&offset=${offset}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setMessages(data.messages);
        setMsgTotalCount(data.totalCount);
        // console.log(`totalCount: ${data.totalCount}`);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [setMessages, setMsgTotalCount]
  );

  return { messages, fetchMessages, msgTotalCount };
};
