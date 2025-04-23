"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Mic, MicOff, Save, CalendarIcon, Search, FileText, Plus } from "lucide-react"

export default function JournalPage() {
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Your Journal</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
                <CardDescription>Record your thoughts, feelings, and reflections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Entry Title" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Write your thoughts here..." className="min-h-[200px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    onClick={toggleRecording}
                    className="mr-2"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {isRecording ? "Recording... Click to stop" : "Record audio"}
                  </span>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Entry
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Entries</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="space-y-4">
                {[
                  {
                    title: "Finding Balance",
                    date: "Apr 8, 2024",
                    excerpt: "Today I practiced the mindfulness techniques we discussed in our last session...",
                    hasAudio: true,
                  },
                  {
                    title: "Breakthrough Moment",
                    date: "Apr 5, 2024",
                    excerpt: "I had a realization today about my patterns of thinking when it comes to...",
                    hasAudio: false,
                  },
                  {
                    title: "Weekly Reflection",
                    date: "Apr 1, 2024",
                    excerpt: "This week has been challenging but I've noticed improvements in how I handle stress...",
                    hasAudio: true,
                  },
                ].map((entry, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{entry.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {entry.date}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{entry.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center">
                        {entry.hasAudio && (
                          <Button variant="outline" size="sm" className="mr-2">
                            <Mic className="mr-2 h-4 w-4" />
                            Play Audio
                          </Button>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Full Entry
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="search" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Journal Entries</CardTitle>
                    <CardDescription>Find entries by keyword, date, or content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search journal entries..." className="pl-8" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Filter by date</h3>
                        <Calendar mode="single" className="rounded-md border" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal Stats</CardTitle>
                <CardDescription>Your journaling activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Entries</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">With Audio</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Consistency</div>
                      <div>70%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[70%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Journaling Prompts</CardTitle>
                <CardDescription>Inspiration for your entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "What are three things you're grateful for today?",
                    "Describe a challenge you faced recently and how you overcame it.",
                    "What patterns have you noticed in your thoughts or behaviors?",
                    "What self-care activities have been most helpful for you?",
                    "Reflect on a recent interaction that had an impact on you.",
                  ].map((prompt, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted">
                      <p className="text-sm">{prompt}</p>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        Use This Prompt
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
