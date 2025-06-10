"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, Trophy, Users, Zap, Lock, Unlock, Shield, Settings, Activity, AlertTriangle } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

// Sample data for charts
const activityData = [
  { day: "Mon", submissions: 12, solves: 5 },
  { day: "Tue", submissions: 18, solves: 8 },
  { day: "Wed", submissions: 15, solves: 7 },
  { day: "Thu", submissions: 25, solves: 12 },
  { day: "Fri", submissions: 30, solves: 15 },
  { day: "Sat", submissions: 40, solves: 20 },
  { day: "Sun", submissions: 35, solves: 18 },
]

const adminActivityData = [
  { day: "Mon", submissions: 45, solves: 23, teams: 8 },
  { day: "Tue", submissions: 67, solves: 34, teams: 8 },
  { day: "Wed", submissions: 52, solves: 28, teams: 9 },
  { day: "Thu", submissions: 89, solves: 45, teams: 9 },
  { day: "Fri", submissions: 112, solves: 67, teams: 10 },
  { day: "Sat", submissions: 134, solves: 78, teams: 10 },
  { day: "Sun", submissions: 98, solves: 56, teams: 10 },
]

const categoryData = [
  { name: "Web", count: 12 },
  { name: "Crypto", count: 8 },
  { name: "Forensics", count: 10 },
  { name: "Pwn", count: 6 },
  { name: "Reverse", count: 9 },
]

// Sample tasks data
const taskData = {
  challenges: [
    { id: 1, title: "Web Exploitation 101", category: "Web", difficulty: "Easy", points: 100, solved: false },
    { id: 2, title: "Cryptography Challenge", category: "Crypto", difficulty: "Medium", points: 200, solved: true },
    { id: 3, title: "Binary Exploitation", category: "Pwn", difficulty: "Hard", points: 300, solved: false },
  ],
  teams: [
    { id: 1, name: "HackMasters", members: 4, score: 3250 },
    { id: 2, name: "CodeBreakers", members: 3, score: 3100 },
    { id: 3, name: "ByteBusters", members: 3, score: 2450 },
  ],
  submissions: [
    { id: 1, challenge: "Web Exploitation 101", team: "HackMasters", timestamp: "2023-05-15 14:30", status: "Correct" },
    {
      id: 2,
      challenge: "Cryptography Challenge",
      team: "ByteBusters",
      timestamp: "2023-05-15 15:45",
      status: "Incorrect",
    },
    { id: 3, challenge: "Binary Exploitation", team: "CodeBreakers", timestamp: "2023-05-15 16:20", status: "Correct" },
  ],
  solves: [
    { id: 1, challenge: "Web Exploitation 101", team: "HackMasters", points: 100, timestamp: "2023-05-15 14:30" },
    { id: 2, challenge: "Cryptography Challenge", team: "ByteBusters", points: 200, timestamp: "2023-05-16 10:15" },
    { id: 3, challenge: "Binary Exploitation", team: "CodeBreakers", points: 300, timestamp: "2023-05-16 11:45" },
  ],
}

export default function DashboardPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogDescription, setDialogDescription] = useState("")
  const [dialogData, setDialogData] = useState<any[]>([])

  const handleCardClick = (category: string) => {
    setSelectedCategory(category)

    switch (category) {
      case "challenges":
        setDialogTitle("Active Challenges")
        setDialogDescription("View and manage all active challenges")
        setDialogData(taskData.challenges)
        break
      case "teams":
        setDialogTitle("Teams")
        setDialogDescription("All participating teams")
        setDialogData(taskData.teams)
        break
      case "submissions":
        setDialogTitle("Recent Submissions")
        setDialogDescription("Recent challenge submissions from teams")
        setDialogData(taskData.submissions)
        break
      case "solves":
        setDialogTitle("Challenge Solves")
        setDialogDescription("Successfully solved challenges")
        setDialogData(taskData.solves)
        break
      case "categories":
        setDialogTitle("Challenge Categories")
        setDialogDescription("Challenges grouped by category")
        setDialogData(
          categoryData.map((cat) => ({
            name: cat.name,
            count: cat.count,
            id: cat.name.toLowerCase(),
          })),
        )
        break
      default:
        setDialogTitle("")
        setDialogDescription("")
        setDialogData([])
    }
  }

  const renderDialogContent = () => {
    if (!selectedCategory) return null

    switch (selectedCategory) {
      case "challenges":
        return (
          <div className="space-y-4">
            {dialogData.map((challenge) => (
              <Card key={challenge.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base text-white flex items-center">
                      {challenge.solved ? (
                        <Unlock className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2 text-gray-500" />
                      )}
                      {challenge.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        challenge.difficulty === "Easy"
                          ? "bg-green-900/20 text-green-400 border-green-900/50"
                          : challenge.difficulty === "Medium"
                            ? "bg-yellow-900/20 text-yellow-400 border-yellow-900/50"
                            : "bg-red-900/20 text-red-400 border-red-900/50"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <div>
                      Category: <span className="text-[hsl(var(--primary))]">{challenge.category}</span>
                    </div>
                    <div>{challenge.points} pts</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <Button
                    className="w-full mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                    onClick={() => (window.location.href = "/dashboard/challenges")}
                  >
                    {isAdmin ? "Manage Challenge" : "View Challenge"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case "teams":
        return (
          <div className="space-y-4">
            {dialogData.map((team) => (
              <Card key={team.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base text-white">{team.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-[hsl(var(--accent)/0.2)] text-[hsl(var(--primary))] border-[hsl(var(--border)/0.5)]"
                    >
                      {team.members} members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <div className="text-sm text-gray-400 mb-2">
                    Score: <span className="text-white font-bold">{team.score}</span>
                  </div>
                  <Button
                    className="w-full mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                    onClick={() => (window.location.href = "/dashboard/teams")}
                  >
                    {isAdmin ? "Manage Team" : "View Team"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case "submissions":
        return (
          <div className="space-y-4">
            {dialogData.map((submission) => (
              <Card key={submission.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base text-white">{submission.challenge}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        submission.status === "Correct"
                          ? "bg-green-900/20 text-green-400 border-green-900/50"
                          : "bg-red-900/20 text-red-400 border-red-900/50"
                      }
                    >
                      {submission.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <div className="text-sm text-gray-400">
                    Team: <span className="text-white">{submission.team}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Time: <span className="text-white">{submission.timestamp}</span>
                  </div>
                  <Button
                    className="w-full mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                    onClick={() => (window.location.href = "/dashboard/challenges")}
                  >
                    View Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case "solves":
        return (
          <div className="space-y-4">
            {dialogData.map((solve) => (
              <Card key={solve.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base text-white">{solve.challenge}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-[hsl(var(--accent)/0.2)] text-[hsl(var(--primary))] border-[hsl(var(--border)/0.5)]"
                    >
                      {solve.points} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <div className="text-sm text-gray-400">
                    Team: <span className="text-white">{solve.team}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Time: <span className="text-white">{solve.timestamp}</span>
                  </div>
                  <Button
                    className="w-full mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                    onClick={() => (window.location.href = "/dashboard/leaderboard")}
                  >
                    View Leaderboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case "categories":
        return (
          <div className="space-y-4">
            {dialogData.map((category) => (
              <Card key={category.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base text-white">{category.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-[hsl(var(--accent)/0.2)] text-[hsl(var(--primary))] border-[hsl(var(--border)/0.5)]"
                    >
                      {category.count} challenges
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <Button
                    className="w-full mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                    onClick={() => (window.location.href = "/dashboard/challenges")}
                  >
                    View Challenges
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-sm">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-black/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Challenges</CardTitle>
              <Flag className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45</div>
              <p className="text-xs text-gray-500">5 pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Teams</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-500">3 new this week</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Submissions</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,247</div>
              <p className="text-xs text-gray-500">89 today</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-red-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">System Status</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Online</div>
              <p className="text-xs text-gray-500">99.9% uptime</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm col-span-4">
            <CardHeader>
              <CardTitle className="text-white">Platform Activity</CardTitle>
              <CardDescription className="text-gray-400">Submissions, solves, and team activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  submissions: {
                    label: "Submissions",
                    color: "hsl(var(--chart-1))",
                  },
                  solves: {
                    label: "Solves",
                    color: "hsl(var(--chart-2))",
                  },
                  teams: {
                    label: "Active Teams",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adminActivityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="submissions" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="solves" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="teams" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm col-span-3">
            <CardHeader>
              <CardTitle className="text-white">Challenge Distribution</CardTitle>
              <CardDescription className="text-gray-400">Challenges by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Admin Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-400" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                Configure CTF
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Flag className="h-5 w-5 mr-2 text-green-400" />
                Challenge Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                Manage Challenges
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-400" />
                Live Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600">
                View Live Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dialog for showing tasks */}
        <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
          <DialogContent className="max-w-3xl bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
              <DialogDescription className="text-gray-400">{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-2">{renderDialogContent()}</div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Player Dashboard
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white">Player Dashboard</h1>
          <Badge className="bg-[hsl(var(--accent)/0.5)] text-[hsl(var(--primary))] border-[hsl(var(--border)/0.5)] text-sm">
            Player
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-black/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Available Challenges</CardTitle>
            <Flag className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-gray-500">2 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Your Team Rank</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5th</div>
            <p className="text-xs text-gray-500">Up 3 positions</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Your Submissions</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-500">8 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Your Solves</CardTitle>
            <Trophy className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15</div>
            <p className="text-xs text-gray-500">3 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card
          className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm col-span-4 transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)] hover:scale-[1.01] cursor-pointer"
          onClick={() => (window.location.href = "/dashboard/analytics")}
        >
          <CardHeader>
            <CardTitle className="text-white">Your Activity</CardTitle>
            <CardDescription className="text-gray-400">Your submissions and solves over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                submissions: {
                  label: "Submissions",
                  color: "hsl(var(--chart-1))",
                },
                solves: {
                  label: "Solves",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="submissions" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="solves" strokeWidth={2} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card
          className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm col-span-3 transition-all duration-300 hover:shadow-md hover:shadow-[hsl(var(--primary)/0.1)] hover:scale-[1.01] cursor-pointer"
          onClick={() => handleCardClick("categories")}
        >
          <CardHeader>
            <CardTitle className="text-white">Challenge Categories</CardTitle>
            <CardDescription className="text-gray-400">Categories you've attempted and solved</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Player Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Flag className="h-5 w-5 mr-2 text-blue-400" />
              Start Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
              onClick={() => (window.location.href = "/dashboard/challenges")}
            >
              Browse Challenges
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-400" />
              Team Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
              onClick={() => (window.location.href = "/dashboard/team")}
            >
              View Team
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-purple-400" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
              onClick={() => (window.location.href = "/dashboard/leaderboard")}
            >
              View Rankings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for showing tasks */}
      <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="max-w-3xl bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
            <DialogDescription className="text-gray-400">{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-2">{renderDialogContent()}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
