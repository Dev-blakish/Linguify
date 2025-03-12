import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Lesson, Progress as ProgressType } from "@shared/schema";

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
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Linguify</h1>
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button variant="outline">Practice Chat</Button>
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
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons?.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{lesson.content}</p>
                <Button className="w-full">Start Lesson</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
