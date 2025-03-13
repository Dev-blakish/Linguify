import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Lesson, Progress as ProgressType } from "@shared/schema";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: [`/api/lessons/${user?.language}/${user?.level}`],
  });

  const { data: progress } = useQuery<ProgressType[]>({
    queryKey: ["/api/progress"],
  });

  const completedLessons = progress?.filter(p => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercentage = user?.progress || 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Linguify
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Practice Chat
              </Button>
            </Link>
            <a href="https://wa.me/2348182039201" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2a10 10 0 0 0-8.64 15.04L2.32 22l5.05-1.26A10 10 0 1 0 12 2zm0 18.28a8.28 8.28 0 0 1-4.28-1.18l-.31-.18-3.18.83.84-3.09-.2-.33A8.28 8.28 0 1 1 12 20.28z"/>
                  <path d="M16.61 14.82c-.25.7-1.23 1.26-1.7 1.36-.46.1-.89.13-2.66-.57-2.25-.88-3.56-3.14-3.64-3.28-.07-.13-.62-1.11-.62-2.13 0-1.02.53-1.5.7-1.69.17-.19.37-.24.5-.24l.53.01c.11 0 .3-.03.46.35.16.37.56 1.29.61 1.38.05.09.08.2.02.31-.06.11-.11.18-.22.28-.11.1-.24.22-.34.3-.12.09-.24.19-.1.36.14.17.61.76 1.22 1.34.84.77 1.55.95 1.77 1.06.22.11.35.09.48-.05.13-.14.56-.64.71-.86.15-.22.3-.18.5-.11.2.07 1.19.64 1.4.77.2.13.35.19.39.29.05.1.05.59-.2 1.29z"/>
                </svg>
                WhatsApp
              </Button>
            </a>
            <Button variant="ghost" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display">
              {user?.lastLoginAt ? `Welcome back, ${user?.username}!` : `Welcome to Linguify, ${user?.username}!`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Keep practicing and you'll reach your language goals in no time!
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Your Progress</h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Progress 
                  value={progressPercentage} 
                  className="mb-2" 
                />
              </motion.div>
              <p className="text-sm text-muted-foreground">
                {progressPercentage}% Complete
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons?.map((lesson) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-display">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{lesson.content}</p>
                  <Button className="w-full">Start Lesson</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}