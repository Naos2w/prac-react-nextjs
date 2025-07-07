"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  IconButton,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAdmin } from "@/hooks/useAdmin";
import type { Message } from "@/types/message";
import { redirect } from "next/navigation";
import PopupMessage from "./PopupMessage";
import LogoutFloatingButton from "./LogoutFloatingButton";

type User = { id: string; username: string; messages: Message[] };

export default function UserMessageManager() {
  const { userName, usersMap, setRefreshChart } = useAdmin();
  const [messages, setMessages] = useState<User[]>([]);
  const [msgsbyUser, setMsgbyUser] = useState<User[]>([]);
  const [resultMsg, setResultMsg] = useState<string>("");
  const [dlgFlg, setDlgFlg] = useState<boolean>(false);
  const [textErr, setTextErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const users =
    usersMap &&
    [...usersMap].map(([id, { username, color }]) => ({ id, username, color }));
  const userColor =
    users?.find((u) => u.username === userName)?.color || "#000000";
  const selectedUserId = users?.find((u) => u.username === userName)?.id || "";

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/messages");
    if (!res.ok) {
      redirect("/login");
    }
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const selectedUser = messages.filter((m) => m.id === selectedUserId);
    setMsgbyUser(selectedUser);
  }, [userName, messages, selectedUserId]);

  const handleDelete = async (messageId: string) => {
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setResultMsg("Deleted ok.");
        setDlgFlg(true);
        setEditingMessageId(null);
        setEditedText("");
        setIsLoading(true);
        setRefreshChart(true);
        await fetchMessages();

        setTimeout(() => {
          setResultMsg("");
        }, 2500);
        setIsLoading(false);
      } else {
        const { error } = await res.json();
        throw new Error(error);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setResultMsg(`Deleted failed. ${errorMsg}`);
      setDlgFlg(true);
    }
  };

  const handleEdit = async (messageId: string) => {
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedText }),
      });
      if (res.ok) {
        setResultMsg("Updated ok.");
        setDlgFlg(true);
        setEditingMessageId(null);
        setEditedText("");
        setIsLoading(true);
        setRefreshChart(true);
        await fetchMessages();

        setTimeout(() => {
          setResultMsg("");
        }, 2500);
        setIsLoading(false);
      } else {
        const { error } = await res.json();
        throw new Error(error);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setResultMsg(`Updated failed. ${errorMsg}`);
      setDlgFlg(true);
      setTextErr(true);
    }
  };
  const formatDate = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(
      d.getDate()
    )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
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
        {isLoading ? <CircularProgress /> : null}
        <PopupMessage
          open={dlgFlg}
          message={resultMsg}
          type={resultMsg.includes("ok") ? "info" : "error"}
          onClose={() => setDlgFlg(false)}
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

        {msgsbyUser?.map((user) =>
          user.messages.map((u) => (
            <Card key={u.id} sx={{ p: 2, mb: 1, overflow: "unset" }}>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {formatDate(new Date(u.createdAt)).toLocaleString()}
              </Typography>
              {editingMessageId === u.id ? (
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
                    <IconButton onClick={() => handleEdit(u.id)}>
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
                <Typography sx={{ wordBreak: "break-word" }} variant="body1">
                  {u.content}
                </Typography>
              )}
              {editingMessageId === null ? (
                <ButtonGroup
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton
                    onClick={() => {
                      setEditingMessageId(u.id);
                      setEditedText(u.content);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(u.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              ) : null}
            </Card>
          ))
        )}
      </Card>
    </Box>
  );
}
