"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy, Users, Shield, Terminal, Code, Zap, Bug, Lock, Cpu } from "lucide-react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"

// Sample teams data
const teamsData = [
  {
    id: 1,
    name: "HackMasters",
    members: [
      { id: 1, name: "Alex Chen", username: "alexc", role: "Leader" },
      { id: 2, name: "Sarah Johnson", username: "sarahj", role: "Member" },
      { id: 3, name: "Mike Williams", username: "mikew", role: "Member" },
      { id: 4, name: "Emma Davis", username: "emmad", role: "Member" },
    ],
    score: 3250,
    solved: 24,
    achievements: ["First Blood", "Web Master"],
    avatar: "",
  },
  {
    id: 2,
    name: "CodeBreakers",
    members: [
      { id: 5, name: "David Lee", username: "davidl", role: "Leader" },
      { id: 6, name: "Lisa Wang", username: "lisaw", role: "Member" },
      { id: 7, name: "Tom Harris", username: "tomh", role: "Member" },
    ],
    score: 3100,
    solved: 22,
    achievements: ["Crypto Expert"],
    avatar: "",
  },
  {
    id: 3,
    name: "ByteBusters",
    members: [
      { id: 8, name: "John Doe", username: "johndoe", role: "Leader" },
      { id: 9, name: "Jane Smith", username: "janesmith", role: "Member" },
      { id: 10, name: "Alex Johnson", username: "alexj", role: "Member" },
    ],
    score: 2450,
    solved: 18,
    achievements: ["First Blood"],
    avatar: "",
  },
  {
    id: 4,
    name: "SecurityNinjas",
    members: [
      { id: 11, name: "Ryan Kim", username: "ryank", role: "Leader" },
      { id: 12, name: "Olivia Brown", username: "oliviab", role: "Member" },
      { id: 13, name: "James Wilson", username: "jamesw", role: "Member" },
      { id: 14, name: "Sophia Martinez", username: "sophiam", role: "Member" },
    ],
    score: 2300,
    solved: 17,
    achievements: ["First Blood"],
    avatar: "",
  },
  {
    id: 5,
    name: "CyberWolves",
    members: [
      { id: 15, name: "Daniel Taylor", username: "danielt", role: "Leader" },
      { id: 16, name: "Ava Anderson", username: "avaa", role: "Member" },
    ],
    score: 2100,
    solved: 16,
    achievements: [],
    avatar: "",
  },
]

const getHackerIconForTeam = (teamId: number) => {
  const hackerIcons = [Terminal, Code, Zap, Bug, Lock, Cpu, Shield]
  const iconIndex = teamId % hackerIcons.length
  const IconComponent = hackerIcons[iconIndex]
  return <IconComponent className="h-6 w-6" />
}

function TeamsPageContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<any>(null)

  const filteredTeams = teamsData.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Teams</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search teams..."
            className="w-full bg-black/50 border-gray-700 pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <Card
            key={team.id}
            className="bg-black/50 border-teal-900/20 backdrop-blur-sm shadow-neomorphic cursor-pointer hover:bg-black/70 transition-colors"
            onClick={() => setSelectedTeam(team)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-teal-900/50 text-white">
                      {getHackerIconForTeam(team.id)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-white">{team.name}</CardTitle>
                </div>
                <Badge variant="outline" className="bg-teal-900/20 text-teal-400 border-teal-900/50">
                  Rank #{teamsData.findIndex((t) => t.id === team.id) + 1}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{team.members.length} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>{team.solved} solved</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="flex justify-between mb-2">
                  <span>Score:</span>
                  <span className="font-bold text-white">{team.score}</span>
                </div>
                <div>
                  <span>Achievements:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {team.achievements.length > 0 ? (
                      team.achievements.map((achievement, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-teal-900/20 text-teal-400 border-teal-900/50"
                        >
                          {achievement}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">No achievements yet</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTeam && (
        <Card className="bg-black/50 border-teal-900/50 backdrop-blur-sm mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-teal-900/50 text-white text-lg">
                    {getHackerIconForTeam(selectedTeam.id)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-white">{selectedTeam.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Rank #{teamsData.findIndex((t) => t.id === selectedTeam.id) + 1} • {selectedTeam.score} points
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-black/50 border-teal-900/50 text-white hover:bg-teal-900/20"
                onClick={() => setSelectedTeam(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Team Members</h3>
                <div className="space-y-3">
                  {selectedTeam.members.map((member: any) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-teal-900/50 text-white">
                            {member.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-gray-400">@{member.username}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-teal-900/20 text-teal-400 border-teal-900/50">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Team Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm">
                    <div className="text-3xl font-bold text-white">{selectedTeam.score}</div>
                    <div className="text-sm text-gray-400">Total Score</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm">
                    <div className="text-3xl font-bold text-white">{selectedTeam.solved}</div>
                    <div className="text-sm text-gray-400">Challenges Solved</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm">
                    <div className="text-3xl font-bold text-white">{selectedTeam.achievements.length}</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Achievements</h3>
                {selectedTeam.achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTeam.achievements.map((achievement: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-900/20">
                          <Trophy className="h-5 w-5 text-teal-400" />
                        </div>
                        <div className="font-medium text-white">{achievement}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-black/50 border border-teal-900/20 shadow-neomorphic-sm text-center text-gray-400">
                    This team hasn't earned any achievements yet.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function TeamsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <TeamsPageContent />
    </ProtectedRoute>
  )
}
