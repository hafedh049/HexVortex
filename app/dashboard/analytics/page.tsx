"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ProtectedRoute } from "@/components/protected-route"

// Sample data for charts
const activityData = [
  { day: "Mon", submissions: 120, solves: 45 },
  { day: "Tue", submissions: 180, solves: 65 },
  { day: "Wed", submissions: 150, solves: 55 },
  { day: "Thu", submissions: 250, solves: 90 },
  { day: "Fri", submissions: 300, solves: 110 },
  { day: "Sat", submissions: 400, solves: 150 },
  { day: "Sun", submissions: 350, solves: 130 },
]

const categoryData = [
  { name: "Web", count: 12, solved: 8 },
  { name: "Crypto", count: 8, solved: 5 },
  { name: "Forensics", count: 10, solved: 7 },
  { name: "Pwn", count: 6, solved: 3 },
  { name: "Reverse", count: 9, solved: 6 },
]

const difficultyData = [
  { name: "Easy", value: 40 },
  { name: "Medium", value: 35 },
  { name: "Hard", value: 25 },
]

const COLORS = ["#10b981", "#3b82f6", "#ef4444"]

const teamSizeData = [
  { size: "1", count: 5 },
  { size: "2", count: 12 },
  { size: "3", count: 18 },
  { size: "4", count: 13 },
]

function AnalyticsPageContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList className="bg-black/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Activity Overview</CardTitle>
            <CardDescription className="text-gray-400">Submissions and solves over the past week</CardDescription>
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
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
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

        <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Challenge Categories</CardTitle>
            <CardDescription className="text-gray-400">Distribution of challenges by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Total",
                  color: "hsl(var(--chart-3))",
                },
                solved: {
                  label: "Solved",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="solved" fill="var(--color-solved)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Challenge Difficulty</CardTitle>
            <CardDescription className="text-gray-400">Distribution of challenges by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Team Size Distribution</CardTitle>
            <CardDescription className="text-gray-400">Number of teams by team size</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Teams",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamSizeData}>
                  <XAxis dataKey="size" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Challenge Solve Rate</CardTitle>
          <CardDescription className="text-gray-400">Percentage of teams that solved each challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={[
                  { subject: "Web Exploitation 101", A: 65, fullMark: 100 },
                  { subject: "Cryptography Challenge", A: 45, fullMark: 100 },
                  { subject: "Binary Exploitation", A: 25, fullMark: 100 },
                  { subject: "Forensics Investigation", A: 38, fullMark: 100 },
                  { subject: "Network Security", A: 42, fullMark: 100 },
                  { subject: "Reverse Engineering", A: 30, fullMark: 100 },
                  { subject: "Mobile Security", A: 35, fullMark: 100 },
                  { subject: "IoT Hacking", A: 20, fullMark: 100 },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#888888" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#888888" }} />
                <Radar
                  name="Solve Rate"
                  dataKey="A"
                  stroke="#9c27b0"
                  fill="#9c27b0"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip formatter={(value) => [`${value}%`, "Solve Rate"]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AnalyticsPageContent />
    </ProtectedRoute>
  )
}
