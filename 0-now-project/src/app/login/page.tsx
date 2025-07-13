"use client";
import LoginForm from "@/components/LoginForm";
import WelcomeScreen from "@/components/WelcomeScreen";
import { MessageProvider } from "@/context/MessageContext";
import { useState, useEffect } from "react";
export default function LoginPage() {
  const [welcome, setWelcome] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return welcome ? (
    <WelcomeScreen />
  ) : (
    <MessageProvider>
      <LoginForm />
    </MessageProvider>
  );
}
