"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, Clock, FileText } from "lucide-react"

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Therapeutic Exercises</h2>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Exercises</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Mindfulness Practice",
                  dueDate: "Apr 15, 2024",
                  description: "Daily mindfulness exercise to practice awareness",
                  progress: 0,
                },
                {
                  title: "Thought Patterns",
                  dueDate: "Apr 18, 2024",
                  description: "Identify and analyze recurring thought patterns",
                  progress: 30,
                },
              ].map((exercise, i) => (
                <Card
                  key={i}
                  className={`cursor-pointer transition-all ${selectedExercise === i ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                  onClick={() => setSelectedExercise(i)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Pending</Badge>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {exercise.dueDate}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Progress</div>
                        <div>{exercise.progress}%</div>
                      </div>
                      <Progress value={exercise.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue Exercise</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Mindfulness Practice</CardTitle>
                <CardDescription>Daily mindfulness exercise to practice awareness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Instructions</h3>
                  <div className="prose prose-sm">
                    <p>
                      This exercise is designed to help you develop mindfulness in your daily life. Follow these steps:
                    </p>
                    <ol>
                      <li>Find a quiet place where you won't be disturbed for 10 minutes.</li>
                      <li>Sit in a comfortable position with your back straight.</li>
                      <li>Close your eyes and focus on your breathing.</li>
                      <li>Notice the sensation of your breath entering and leaving your body.</li>
                      <li>
                        When your mind wanders (which is normal), gently bring your attention back to your breath.
                      </li>
                      <li>Practice this for 10 minutes daily.</li>
                    </ol>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Reflection Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm mb-2">What sensations did you notice in your body during this practice?</p>
                      <Textarea placeholder="Type your answer here..." className="min-h-[100px]" />
                    </div>
                    <div>
                      <p className="text-sm mb-2">What thoughts or feelings arose during your practice?</p>
                      <Textarea placeholder="Type your answer here..." className="min-h-[100px]" />
                    </div>
                    <div>
                      <p className="text-sm mb-2">How might you incorporate mindfulness into your daily activities?</p>
                      <Textarea placeholder="Type your answer here..." className="min-h-[100px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Progress</Button>
                <Button>Submit Exercise</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Gratitude Journal",
                  completedDate: "Apr 5, 2024",
                  description: "Daily gratitude practice for positive focus",
                  feedback: "Great reflections on finding gratitude in small moments.",
                },
                {
                  title: "Stress Inventory",
                  completedDate: "Mar 28, 2024",
                  description: "Identify sources of stress and coping strategies",
                  feedback: "Excellent work identifying your stress triggers.",
                },
                {
                  title: "Values Clarification",
                  completedDate: "Mar 20, 2024",
                  description: "Explore and define your core personal values",
                  feedback: "Thoughtful exploration of your values and priorities.",
                },
              ].map((exercise, i) => (
                <Card key={i} className="hover:bg-muted/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="default">Completed</Badge>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {exercise.completedDate}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs font-medium mb-1">Therapist Feedback:</p>
                      <p className="text-sm">{exercise.feedback}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Exercise
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Exercises</CardTitle>
                <CardDescription>Your complete exercise history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Mindfulness Practice",
                      date: "Apr 10, 2024",
                      status: "Pending",
                      dueDate: "Apr 15, 2024",
                      progress: 0,
                    },
                    {
                      title: "Thought Patterns",
                      date: "Apr 8, 2024",
                      status: "Pending",
                      dueDate: "Apr 18, 2024",
                      progress: 30,
                    },
                    {
                      title: "Gratitude Journal",
                      date: "Apr 1, 2024",
                      status: "Completed",
                      completedDate: "Apr 5, 2024",
                      progress: 100,
                    },
                    {
                      title: "Stress Inventory",
                      date: "Mar 25, 2024",
                      status: "Completed",
                      completedDate: "Mar 28, 2024",
                      progress: 100,
                    },
                    {
                      title: "Values Clarification",
                      date: "Mar 15, 2024",
                      status: "Completed",
                      completedDate: "Mar 20, 2024",
                      progress: 100,
                    },
                  ].map((exercise, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{exercise.title}</p>
                          <p className="text-xs text-muted-foreground">Assigned: {exercise.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge variant={exercise.status === "Completed" ? "default" : "outline"}>
                            {exercise.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {exercise.status === "Completed"
                              ? `Completed: ${exercise.completedDate}`
                              : `Due: ${exercise.dueDate}`}
                          </p>
                        </div>
                        <Progress value={exercise.progress} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
