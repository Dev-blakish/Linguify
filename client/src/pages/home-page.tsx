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
              Welcome back, {user?.username}!
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