"use client";
import {
  Box,
  Card,
  LinearProgress,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { LogoutFloatingButton } from "@/components/LogoutFloatingButton";
import type { Message } from "@/types/message";

export const MessageList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0); // 0-based

  const { messages, fetchMessages, msgTotalCount } = useMessages();

  useEffect(() => {
    setIsLoading(true);
    fetchMessages(limit, page * limit).then(() => setIsLoading(false));
  }, [fetchMessages, limit, page]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoutFloatingButton />
      {/* Message Contents */}
      <Paper
        sx={{
          p: 4,
          m: 2,
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          width: "90%",
        }}
      >
        {isLoading ? (
          <LinearProgress />
        ) : messages?.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            No Messages
          </Typography>
        ) : (
          <>
            <TablePagination
              component="div"
              count={msgTotalCount}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              onRowsPerPageChange={(event) => {
                setLimit(parseInt(event.target.value, 10));
                setPage(0);
              }}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiTablePagination-toolbar": {
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  gap: 1,
                  p: 0,
                },
                "& .MuiTablePagination-input": {
                  m: 0, // 原本有 32px padding
                },
                "& .MuiTablePagination-actions": {
                  ml: "0 !important", // 原本有 20px padding
                },
              }}
            />
            {messages?.map((message: Message, index: number) => (
              <Card
                sx={{
                  p: 2,
                  width: "100%",
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
                key={index}
              >
                {message.content}
              </Card>
            ))}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default MessageList;
