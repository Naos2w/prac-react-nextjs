"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Message = { id: string; text: string; createdAt: string };
type User = { id: string; username: string; messages: Message[] };

export default function UserMessageManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleDelete = async (messageId: string) => {
    await fetch(`/api/messages/${messageId}`, { method: "DELETE" });
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? { ...u, messages: u.messages.filter((m) => m.id !== messageId) }
          : u
      )
    );
  };

  const handleEdit = async (messageId: string) => {
    await fetch(`/api/messages/${messageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editedText }),
    });
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              messages: u.messages.map((m) =>
                m.id === messageId ? { ...m, text: editedText } : m
              ),
            }
          : u
      )
    );
    setEditingMessageId(null);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">🔍 Filter Messages by User</Typography>
      <Select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        displayEmpty
        sx={{ mt: 2, mb: 2, minWidth: 200 }}
      >
        <MenuItem value="">-- Select a user --</MenuItem>
        {users.map((u) => (
          <MenuItem key={u.id} value={u.id}>
            {u.username}
          </MenuItem>
        ))}
      </Select>

      {selectedUser?.messages.map((msg) => (
        <Card key={msg.id} sx={{ p: 2, mb: 1 }}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            {new Date(msg.createdAt).toLocaleString()}
          </Typography>
          {editingMessageId === msg.id ? (
            <>
              <TextField
                fullWidth
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <Button onClick={() => handleEdit(msg.id)} sx={{ mt: 1 }}>
                Save
              </Button>
            </>
          ) : (
            <Typography variant="body1">{msg.text}</Typography>
          )}
          <Box sx={{ mt: 1 }}>
            <IconButton
              onClick={() => {
                setEditingMessageId(msg.id);
                setEditedText(msg.text);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(msg.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
