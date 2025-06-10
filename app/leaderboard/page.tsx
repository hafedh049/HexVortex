"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Particles } from "@/components/particles"

// Sample leaderboard data
const teams = [
  { id: 1, name: "HackMasters", score: 3250, solved: 24, members: 4, avatar: "" },
  { id: 2, name: "CodeBreakers", score: 3100, solved: 22, members: 3, avatar: "" },
  { id: 3, name: "ByteBusters", score: 2450, solved: 18, members: 3, avatar: "" },
  { id: 4, name: "SecurityNinjas", score: 2300, solved: 17, members: 4, avatar: "" },
  { id: 5, name: "CyberWolves", score: 2100, solved: 16, members: 2, avatar: "" },
  { id: 6, name: "DigitalDefenders", score: 1950, solved: 15, members: 3, avatar: "" },
  { id: 7, name: "BinaryBandits", score: 1800, solved: 14, members: 4, avatar: "" },
  { id: 8, name: "HackHorizon", score: 1650, solved: 13, members: 3, avatar: "" },
  { id: 9, name: "CipherSquad", score: 1500, solved: 12, members: 2, avatar: "" },
  { id: 10, name: "NetRunners", score: 1350, solved: 11, members: 3, avatar: "" },
]

// Function to generate team logo color based on team name
const getTeamColor = (name: string) => {
  const colors = ["purple", "cyan", "green", "blue", "red", "amber"]
  // Simple hash function to pick a consistent color for each team
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function LeaderboardPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Particles className="absolute inset-0 z-0" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Leaderboard</h1>
            <p className="text-gray-400 mt-2">Current standings in the HexVortex CTF competition</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-950/20 hover:text-white"
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/login">Join Competition</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="teams" className="w-full mb-6">
          <TabsList className="bg-black/50 w-fit">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="challenges">By Challenge</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Top Teams</CardTitle>
                <CardDescription className="text-gray-400">Current standings based on total points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map((team, index) => {
                    const teamColor = getTeamColor(team.name)
                    // Determine padding based on rank
                    const padding = index === 0 ? "p-6" : index === 1 ? "p-5" : index === 2 ? "p-4" : "p-3"

                    // Medal colors for top 3
                    let medalColor = ""
                    let borderColor = ""
                    let bgColor = ""

                    if (index === 0) {
                      // Gold
                      medalColor = "text-yellow-500"
                      borderColor = "border-yellow-500"
                      bgColor = "bg-yellow-900/20"
                    } else if (index === 1) {
                      // Silver
                      medalColor = "text-gray-300"
                      borderColor = "border-gray-300"
                      bgColor = "bg-gray-700/20"
                    } else if (index === 2) {
                      // Bronze
                      medalColor = "text-amber-600"
                      borderColor = "border-amber-600"
                      bgColor = "bg-amber-900/20"
                    } else {
                      // Others
                      borderColor = "border-purple-900/20"
                      bgColor = "bg-black/50"
                    }

                    return (
                      <div
                        key={team.id}
                        className={`flex items-center justify-between ${padding} rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 ${bgColor} border ${borderColor} ${index === 0 ? "" : index === 1 ? "ml-2" : index === 2 ? "ml-4" : "ml-6"}`}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className={index < 3 ? "h-10 w-10" : "h-8 w-8"}>
                            {team.avatar ? (
                              <AvatarImage src={team.avatar || "/placeholder.svg"} />
                            ) : (
                              <div
                                className={`flex items-center justify-center w-full h-full bg-${teamColor}-900/50 text-${teamColor}-400`}
                              >
                                <Shield className={index < 3 ? "h-6 w-6" : "h-4 w-4"} />
                              </div>
                            )}
                          </Avatar>
                          <div>
                            <div
                              className={`font-medium text-white ${index === 0 ? "text-xl" : index === 1 ? "text-lg" : index === 2 ? "text-base" : ""}`}
                            >
                              {team.name}
                            </div>
                            <div className="text-sm text-gray-400">{team.members} members</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Solved</div>
                            <div className="font-medium text-white">{team.solved}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Score</div>
                            <div
                              className={`font-bold text-white ${index === 0 ? "text-2xl" : index === 1 ? "text-xl" : index === 2 ? "text-lg" : "text-base"}`}
                            >
                              {team.score}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges">
            <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Challenge Leaderboard</CardTitle>
                <CardDescription className="text-gray-400">Teams ranked by challenge completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Web Exploitation 101", teams: ["HackMasters", "CodeBreakers", "ByteBusters"], solves: 24 },
                    {
                      name: "Cryptography Challenge",
                      teams: ["ByteBusters", "HackMasters", "SecurityNinjas"],
                      solves: 18,
                    },
                    { name: "Binary Exploitation", teams: ["CodeBreakers", "CyberWolves", "HackMasters"], solves: 15 },
                    {
                      name: "Forensics Investigation",
                      teams: ["SecurityNinjas", "HackMasters", "ByteBusters"],
                      solves: 20,
                    },
                  ].map((challenge, index) => (
                    <div key={index} className="p-4 rounded-lg bg-black/50 border border-purple-900/20">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-white text-lg">{challenge.name}</h3>
                        <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-900/50">
                          {challenge.solves} solves
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">Top teams:</div>
                        <div className="flex flex-wrap gap-2">
                          {challenge.teams.map((team, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className={`transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer ${
                                idx === 0
                                  ? "bg-yellow-900/20 text-yellow-400 border-yellow-500 border-2 hover:bg-yellow-900/30 hover:shadow-yellow-500/20"
                                  : idx === 1
                                    ? "bg-gray-500/20 text-gray-300 border-gray-500 border-2 hover:bg-gray-500/30 hover:shadow-gray-500/20"
                                    : "bg-amber-800/20 text-amber-600 border-amber-800 border-2 hover:bg-amber-800/30 hover:shadow-amber-800/20"
                              }`}
                            >
                              {idx === 0 && "🏆 "}
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Category Rankings</CardTitle>
                <CardDescription className="text-gray-400">
                  Teams ranked by performance in each category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      category: "Web",
                      teams: [
                        { name: "HackMasters", score: 850 },
                        { name: "SecurityNinjas", score: 720 },
                        { name: "ByteBusters", score: 650 },
                      ],
                    },
                    {
                      category: "Crypto",
                      teams: [
                        { name: "CodeBreakers", score: 920 },
                        { name: "HackMasters", score: 780 },
                        { name: "CyberWolves", score: 620 },
                      ],
                    },
                    {
                      category: "Forensics",
                      teams: [
                        { name: "ByteBusters", score: 880 },
                        { name: "SecurityNinjas", score: 750 },
                        { name: "HackMasters", score: 700 },
                      ],
                    },
                    {
                      category: "Pwn",
                      teams: [
                        { name: "HackMasters", score: 920 },
                        { name: "CodeBreakers", score: 850 },
                        { name: "CyberWolves", score: 680 },
                      ],
                    },
                  ].map((category, index) => (
                    <Card key={index} className="bg-black/50 border-purple-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.teams.map((team, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center p-2 rounded bg-black/30 transition-all duration-300 hover:scale-105 hover:bg-black/50 hover:shadow-md hover:shadow-purple-500/20 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center ${idx === 0 ? "bg-yellow-900/50 text-yellow-400" : idx === 1 ? "bg-gray-700/50 text-gray-300" : "bg-amber-900/50 text-amber-600"}`}
                                >
                                  {idx + 1}
                                </div>
                                <span className="text-white">{team.name}</span>
                              </div>
                              <span className="font-medium text-purple-400">{team.score} pts</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Top Solvers</CardTitle>
              <CardDescription className="text-gray-400">Teams with the most challenges solved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teams
                  .slice(0, 5)
                  .sort((a, b) => b.solved - a.solved)
                  .map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-purple-900/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/50 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="font-medium text-white">{team.name}</div>
                      </div>
                      <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-900/50">
                        {team.solved} challenges
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">First Blood</CardTitle>
              <CardDescription className="text-gray-400">Teams that were first to solve challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-purple-900/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-white">Web Exploitation 101</div>
                      <div className="text-sm text-gray-400">SQL Injection</div>
                    </div>
                  </div>
                  <div className="font-medium text-white">HackMasters</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-purple-900/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-white">Cryptography Challenge</div>
                      <div className="text-sm text-gray-400">Caesar Cipher</div>
                    </div>
                  </div>
                  <div className="font-medium text-white">ByteBusters</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-purple-900/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-white">Forensics Investigation</div>
                      <div className="text-sm text-gray-400">File Analysis</div>
                    </div>
                  </div>
                  <div className="font-medium text-white">CodeBreakers</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-purple-900/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-white">Web Exploitation 101</div>
                      <div className="text-sm text-gray-400">XSS Attack</div>
                    </div>
                  </div>
                  <div className="font-medium text-white">SecurityNinjas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
