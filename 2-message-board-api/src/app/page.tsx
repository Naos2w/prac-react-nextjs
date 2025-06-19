import { MessageForm } from "@/components/MessageForm";
import { MessageList } from "@/components/MessageList";
import { MessageProvider } from "@/context/MessageContext";

export default function Home() {
  return (
    <main>
      <MessageProvider>
        <MessageForm />
        <MessageList />
      </MessageProvider>
    </main>
  );
}
