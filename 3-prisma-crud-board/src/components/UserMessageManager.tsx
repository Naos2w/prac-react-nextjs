"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAdmin } from "@/hooks/useAdmin";
import type { Message } from "@/types/message";

type User = { id: string; username: string; messages: Message[] };

export default function UserMessageManager() {
  const { userName, usersMap, setUsersMap } = useAdmin();
  const [messages, setMessages] = useState<User[]>([]);

  const users =
    usersMap &&
    [...usersMap].map(([id, { username, color }]) => ({ id, username, color }));
  const userColor =
    users?.find((u) => u.username === userName)?.color || "#000000";
  const selectedUserId = users?.find((u) => u.username === userName)?.id || "";

  // const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  const selectedUser = messages.filter((m) => m.id === selectedUserId);

  const handleDelete = async (messageId: string) => {
    // await fetch(`/api/messages/${messageId}`, { method: "DELETE" });
    // setUsers((prev) =>
    //   prev.map((u) =>
    //     u.id === selectedUserId
    //       ? { ...u, messages: u.messages.filter((m) => m.id !== messageId) }
    //       : u
    //   )
    // );
  };

  const handleEdit = async (messageId: string) => {
    await fetch(`/api/messages/${messageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editedText }),
    });
    // setUsers((prev) =>
    //   prev.map((u) =>
    //     u.id === selectedUserId
    //       ? {
    //           ...u,
    //           messages: u.messages.map((m) =>
    //             m.id === messageId ? { ...m, text: editedText } : m
    //           ),
    //         }
    //       : u
    //   )
    // );
    setEditingMessageId(null);
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
      <Card
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {userName ? (
          <Typography variant="h6" sx={{ color: userColor }}>
            {userName + "'s Messages"}
          </Typography>
        ) : (
          <Typography variant="h6">
            Please click one cell from the pie chart.
          </Typography>
        )}

        {/* <Select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          displayEmpty
          sx={{ mt: 2, mb: 2, minWidth: 200 }}
        >
          <MenuItem value="">-- Select a user --</MenuItem>
          {users &&
            users?.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.username}
              </MenuItem>
            ))}
        </Select> */}

        {selectedUser?.map((user) =>
          user.messages.map((u) => (
            <Card key={user.id} sx={{ p: 2, mb: 1, overflow: "unset" }}>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {formatDate(new Date(u.createdAt)).toLocaleString()}
              </Typography>
              {editingMessageId === user.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <Button onClick={() => handleEdit(user.id)} sx={{ mt: 1 }}>
                    Save
                  </Button>
                </>
              ) : (
                <Typography sx={{ wordBreak: "break-word" }} variant="body1">
                  {u.content}
                </Typography>
              )}
              <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => {
                    setEditingMessageId(user.id);
                    setEditedText(u.content);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))
        )}
      </Card>
    </Box>
  );
}
