"use client";
import CreateUserForm from "@/components/CreateUserForm";
import { MessageProvider } from "@/context/MessageContext";

export default function CreateUserPage() {
  return (
    <MessageProvider>
      <CreateUserForm />
    </MessageProvider>
  );
}
