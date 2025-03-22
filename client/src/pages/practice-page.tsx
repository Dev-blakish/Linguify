import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, History } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import type { ChatHistory } from "@shared/schema";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PracticePage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  // Fetch chat history
  const { data: chatHistory } = useQuery<ChatHistory[]>({
    queryKey: ["/api/chat-history"],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progress: number) => {
      await apiRequest("POST", "/api/progress", { progress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat", { message });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      // Increment progress after successful chat interaction
      if (user && user.progress < 100) {
        updateProgressMutation.mutate(Math.min(user.progress + 5, 100));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    chatMutation.mutate(input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-display">Practice Chat</h1>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <History className="h-4 w-4" />
                  Chat History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Chat History</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] mt-4">
                  <div className="space-y-4">
                    {chatHistory?.map((chat) => (
                      <Card key={chat.id}>
                        <CardHeader>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(chat.createdAt), "PPpp")}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="font-semibold">You:</p>
                            <p>{chat.message}</p>
                          </div>
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <p className="font-semibold">Assistant:</p>
                            <p>{chat.response}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Link href="/">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="h-[480px] flex flex-col">
          <CardContent className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Practice ${user?.language} here...`}
              />
              <Button type="submit" disabled={chatMutation.isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}