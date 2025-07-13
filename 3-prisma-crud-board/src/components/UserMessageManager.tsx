"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  IconButton,
  ButtonGroup,
  // CircularProgress,
  Stack,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAdmin } from "@/hooks/useAdmin";
// import type { Message } from "@/types/message";
import { useRouter } from "next/navigation";
import PopupMessage from "@/components/PopupMessage";
import LogoutFloatingButton from "@/components/LogoutFloatingButton";
import LoadingScreen from "@/components/LoadingScreen";
import { formateDate } from "@/utils/formateDate";
import { apiRequest } from "@/utils/apiRequest";
import { useMessages } from "@/hooks/useMessages";

// type User = { id: string; username: string; messages: Message[] };

export default function UserMessageManager() {
  const {
    userName,
    usersMap,

    stats,
    messages,
    changeSelectedUser,
    fetchMessages,
  } = useAdmin();
  // const [messages, setMessages] = useState<User[]>([]);
  // const [msgsbyUser, setMsgbyUser] = useState<User[]>([]);
  const [textErr, setTextErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirectAfterPopup, setRedirectAfterPopup] = useState<null | string>(
    null
  );
  const router = useRouter();

  const {
    showResultMessage,
    resultMessage,
    resultMessageType,
    resultMessageOpenFlag,
    setResultMessageOpenFlag,
    resultMessageKey,
  } = useMessages();

  const users =
    usersMap &&
    [...usersMap].map(([id, { username, color }]) => ({ id, username, color }));
  const userColor =
    users?.find((u) => u.username === userName)?.color || "#000000";
  const selectedUserId = users?.find((u) => u.username === userName)?.id || "";

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleMessageClose = () => {
    setResultMessageOpenFlag(false);
    if (redirectAfterPopup) {
      router.push(redirectAfterPopup);
      setRedirectAfterPopup(null); // 重置狀態
    }
  };

  useEffect(() => {
    changeSelectedUser(selectedUserId);
  }, [stats, selectedUserId, changeSelectedUser]);

  const showMessage = async (
    message: string,
    type: "info" | "success" | "error" | "warning" | undefined
  ) => {
    showResultMessage(message, type);
    if (type === "success") {
      await fetchMessages();
    } else if (type === "error") {
      setTextErr(true);
    }
  };
  const resetEditState = () => {
    setEditingMessageId(null);
    setEditedText("");
    setTextErr(false);
  };

  const handleDelete = async (messageId: string) => {
    setIsLoading(true);
    try {
      await apiRequest(`/api/messages/${messageId}`, "DELETE");
      await showMessage("Message deleted successfully.", "success");
      resetEditState();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg === "Request timed out") {
        const msg = `Ruquest timed out. Please try again later. ${errorMsg}`;
        showMessage(msg, "error");
      } else {
        const msg = `Message deleted failed. Error: ${errorMsg}`;
        showMessage(msg, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (messageId: string) => {
    setIsLoading(true);
    try {
      await apiRequest(`/api/messages/${messageId}`, "PUT", {
        content: editedText,
      });
      await showMessage("Message edited successfully.", "success");
      resetEditState();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg === "Request timed out") {
        const msg = `Ruquest timed out. Please try again later. ${errorMsg}`;
        showMessage(msg, "error");
      } else {
        const msg = `Message edited failed. Error: ${errorMsg}`;
        showMessage(msg, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: { md: "50%", xs: "none" },
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <LogoutFloatingButton />
      <Card
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {isLoading ? <LoadingScreen /> : null}

        <PopupMessage
          open={resultMessageOpenFlag}
          message={resultMessage}
          type={resultMessageType}
          onClose={handleMessageClose}
          messageKey={resultMessageKey}
        />
        {userName ? (
          <Typography variant="h6" sx={{ color: userColor }}>
            {userName + "'s Messages"}
          </Typography>
        ) : (
          <Typography variant="h6">
            Please click one cell from the pie chart.
          </Typography>
        )}
        {/* {messages.length > 0 ? ( */}
        {messages ? (
          <></>
        ) : (
          <>
            <Stack spacing={2}>
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
          </>
        )}
        {messages?.messages.map((msg) => (
          <Card key={msg.id} sx={{ p: 2, mb: 1, overflow: "unset" }}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {formateDate(new Date(msg.updatedAt)).toLocaleString()}
            </Typography>
            {editingMessageId === msg.id ? (
              <>
                <TextField
                  fullWidth
                  value={editedText}
                  multiline
                  onChange={(e) => {
                    setEditedText(e.target.value);
                    setTextErr(false);
                  }}
                  error={textErr}
                />
                <ButtonGroup
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={() => handleEdit(msg.id)}>
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
                sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                variant="body1"
              >
                {msg.content}
              </Typography>
            )}
            {editingMessageId === null ? (
              <ButtonGroup sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => {
                    setEditingMessageId(msg.id);
                    setEditedText(msg.content);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(msg.id)}>
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            ) : null}
          </Card>
        ))}
      </Card>
    </Box>
  );
}
