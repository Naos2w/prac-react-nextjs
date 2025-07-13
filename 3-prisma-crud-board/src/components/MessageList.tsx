"use client";
import {
  Box,
  Card,
  Paper,
  Typography,
  TablePagination,
  Stack,
  Skeleton,
  Avatar,
  IconButton,
  TextField,
  ButtonGroup,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { useUser } from "@/hooks/useUser";
import { LogoutFloatingButton } from "@/components/LogoutFloatingButton";
import { PopupMessage } from "@/components/PopupMessage";
import type { Message } from "@prisma/client";
import { formateDate } from "@/utils/formateDate";
import { apiRequest } from "@/utils/apiRequest";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingScreen } from "@/components/LoadingScreen";

export const MessageList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0); // 0-based
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editedTextErr, setEditedTextErr] = useState<boolean>(false);
  const theme = useTheme();
  const {
    messages,
    fetchMessages,
    msgTotalCount,
    showResultMessage,
    resultMessage,
    resultMessageType,
    resultMessageOpenFlag,
    setResultMessageOpenFlag,
  } = useMessages();
  const { username } = useUser();

  useEffect(() => {
    setIsLoading(true);
    fetchMessages(limit, page * limit).then(() => setIsLoading(false));
  }, [fetchMessages, limit, page]);

  const handleDelete = async (messageId: string) => {
    setIsLoading(true);
    try {
      await apiRequest(`/api/messages/${messageId}`, "DELETE");
      await showMessage("Deleted Successfully.", "success");
      resetEditState();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showMessage(`Deleted failed. ${errorMsg}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const resetEditState = () => {
    setEditingMessageId(null);
    setEditedText("");
    setEditedTextErr(false);
  };
  const showMessage = async (
    message: string,
    type: "info" | "success" | "error" | "warning" | undefined
  ) => {
    showResultMessage(message, type);
    if (type === "success") {
      await fetchMessages();
    } else if (type === "error") {
      setEditedTextErr(true);
    }
  };
  const handleEdit = async (messageId: string) => {
    if (!editedText.trim()) {
      setEditedTextErr(true);
      return;
    }
    setIsLoading(true);
    try {
      await apiRequest(`/api/messages/${messageId}`, "PUT", {
        content: editedText,
      });
      await showMessage("Updated Successfully.", "success");
      resetEditState();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      showMessage(`Updated failed. ${errorMsg}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading ? <LoadingScreen /> : null}
      <LogoutFloatingButton />
      <PopupMessage
        open={resultMessageOpenFlag}
        message={resultMessage}
        type={resultMessageType}
        onClose={() => setResultMessageOpenFlag(false)}
      />
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
          <Stack spacing={2}>
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "2rem" }}
            />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={100}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={100}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={100}
              animation="wave"
            />
          </Stack>
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
            {messages?.map((message: Message) => (
              <Box key={message.id}>
                <Card
                  sx={{
                    p: 2,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgb(29, 29, 29)"
                        : "#ffffff",
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        fontSize: "10px",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgb(117, 165, 204)"
                            : "#1976d2",
                      }}
                    >
                      {username}
                    </Avatar>
                    <Box flex={1}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle1">{username}</Typography>
                        {!editingMessageId ? (
                          <ButtonGroup>
                            <IconButton
                              onClick={() => {
                                setEditingMessageId(message.id);
                                setEditedText(message.content);
                              }}
                            >
                              <EditIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(message.id)}
                            >
                              <DeleteIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                          </ButtonGroup>
                        ) : null}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {formateDate(
                          new Date(message.updatedAt)
                        ).toLocaleString()}
                      </Typography>

                      {editingMessageId === message.id ? (
                        <>
                          <TextField
                            fullWidth
                            value={editedText}
                            multiline
                            onChange={(e) => {
                              setEditedText(e.target.value);
                              setEditedTextErr(false);
                            }}
                            error={editedTextErr}
                          />
                          <ButtonGroup
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <IconButton onClick={() => handleEdit(message.id)}>
                              <SaveAsIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setEditingMessageId(null);
                                setEditedText("");
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </ButtonGroup>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            mt: 1,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {message.content}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Card>
              </Box>
            ))}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default MessageList;
