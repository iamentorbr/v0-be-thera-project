import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileAudio, BookOpen, MessageSquare, Sparkles, Video } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">✨ Welcome, John</h2>
            <p className="text-muted-foreground">Your journey to wellness continues today</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Book Session
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Session</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Apr 12</div>
              <p className="text-xs text-muted-foreground">2:00 PM with Jane Doe</p>
              <Button variant="link" className="px-0 mt-2">
                View details
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Content</CardTitle>
              <FileAudio className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Items</div>
              <p className="text-xs text-muted-foreground">Meditation audio and resources</p>
              <Button variant="link" className="px-0 mt-2">
                Explore
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Exercises</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Due by April 15</p>
              <Button variant="link" className="px-0 mt-2">
                Complete now
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <Button variant="link" className="px-0 mt-2">
                Write new entry
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Your Wellness Journey</CardTitle>
              <CardDescription>Track your progress and upcoming milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Meditation Practice</div>
                    <div>7/10 days</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[70%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Journaling</div>
                    <div>5/8 entries</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[62.5%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Exercise Completion</div>
                    <div>3/5 exercises</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[60%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Daily Inspiration</CardTitle>
              <CardDescription>A thought for your reflection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-4 py-6">
                <Sparkles className="h-12 w-12 text-primary" />
                <blockquote className="italic text-lg">
                  "The journey of a thousand miles begins with a single step."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  Take a moment today to reflect on how far you've come on your journey.
                </p>
                <Button variant="outline" className="mt-4">
                  Add to Journal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Resources shared by your therapist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Morning Meditation", type: "Audio", date: "Apr 8" },
                { title: "Mindfulness Exercise", type: "PDF", date: "Apr 5" },
                { title: "Reflection Questions", type: "Text", date: "Apr 3" },
              ].map((item, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                    {item.type === "Audio" ? (
                      <FileAudio className="h-10 w-10 text-primary" />
                    ) : item.type === "PDF" ? (
                      <BookOpen className="h-10 w-10 text-primary" />
                    ) : (
                      <MessageSquare className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novidades em breve</CardTitle>
            <CardDescription>Recursos que estão chegando na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">Sessões Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Participe de sessões por videoconferência diretamente na plataforma.
                  </p>
                  <Button variant="link" size="sm" className="px-0" asChild>
                    <Link href="/client/video">Saiba mais</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">Chat com Terapeuta</h4>
                  <p className="text-sm text-muted-foreground">
                    Comunique-se com seu terapeuta entre as sessões de forma segura.
                  </p>
                  <Button variant="link" size="sm" className="px-0" disabled>
                    Em desenvolvimento
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
