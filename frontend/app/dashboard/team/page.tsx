"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Shield, Trophy, UserPlus, X, Terminal, Code, Bug, Lock, Key, Zap, Eye } from "lucide-react"
import { useState } from "react"

// Sample team data
const teamData = {
  name: "ByteBusters",
  created: "2023-05-15",
  members: [
    { id: 1, name: "John Doe", username: "johndoe", role: "Leader", avatar: "" },
    { id: 2, name: "Jane Smith", username: "janesmith", role: "Member", avatar: "" },
    { id: 3, name: "Alex Johnson", username: "alexj", role: "Member", avatar: "" },
  ],
  inviteCode: "BYTE-BUST-2023",
  stats: {
    rank: 5,
    score: 2450,
    solved: 18,
    achievements: [
      { id: 1, name: "First Blood", description: "First team to solve a challenge", icon: Trophy },
      { id: 2, name: "Web Master", description: "Solved all web challenges", icon: Shield },
    ],
  },
}

// Function to get a random hacker icon based on member ID
const getRandomHackerIcon = (memberId) => {
  const hackerIcons = [Shield, Terminal, Code, Bug, Lock, Key, Zap, Eye]
  const iconIndex = memberId % hackerIcons.length
  const IconComponent = hackerIcons[iconIndex]
  return <IconComponent className="h-5 w-5 text-teal-400" />
}

export default function TeamPage() {
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [hasTeam, setHasTeam] = useState(true) // For demo purposes

  if (!hasTeam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md bg-black/50 border-teal-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Join the Competition</CardTitle>
            <CardDescription className="text-gray-400">
              Create a team or join an existing one to participate in challenges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setShowCreateTeamDialog(true)}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Create a Team
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-code" className="text-gray-300">
                Have an invite code?
              </Label>
              <div className="flex gap-2">
                <Input
                  id="invite-code"
                  placeholder="Enter invite code"
                  className="bg-black/50 border-gray-700 flex-1"
                />
                <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
                  Join
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Team</h1>
        <Button
          onClick={() => setShowInviteDialog(true)}
          className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 relative z-20"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-black/50 border-teal-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Team Members</CardTitle>
            <CardDescription className="text-gray-400">Manage your team members and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamData.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-teal-900/20"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {member.avatar && <AvatarImage src={member.avatar || "/placeholder.svg"} />}
                      <AvatarFallback className="bg-teal-900/50 text-white">
                        {getRandomHackerIcon(member.id)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-sm text-gray-400">@{member.username}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-teal-900/20 text-teal-400 border-teal-900/50">
                      {member.role}
                    </Badge>
                    {member.role !== "Leader" && (
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove member</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-teal-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Team Information</CardTitle>
            <CardDescription className="text-gray-400">Details about your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-400">Team Name</div>
              <div className="text-white">{teamData.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">Created On</div>
              <div className="text-white">{new Date(teamData.created).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">Invite Code</div>
              <div className="flex items-center gap-2">
                <code className="rounded bg-black/50 px-2 py-1 text-sm text-white">{teamData.inviteCode}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy invite code</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/50 border-teal-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Team Stats</CardTitle>
          <CardDescription className="text-gray-400">Your team's performance and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20">
              <div className="text-4xl font-bold text-white">#{teamData.stats.rank}</div>
              <div className="text-sm text-gray-400">Current Rank</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20">
              <div className="text-4xl font-bold text-white">{teamData.stats.score}</div>
              <div className="text-sm text-gray-400">Total Score</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/50 border border-teal-900/20">
              <div className="text-4xl font-bold text-white">{teamData.stats.solved}</div>
              <div className="text-sm text-gray-400">Challenges Solved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/50 border-teal-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Achievements</CardTitle>
          <CardDescription className="text-gray-400">Special recognitions earned by your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {teamData.stats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-black/50 border border-teal-900/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900/20">
                  <achievement.icon className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <div className="font-medium text-white">{achievement.name}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-teal-900/50">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Share your team invite code with others to let them join your team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-code" className="text-gray-300">
                Your Team Invite Code
              </Label>
              <div className="flex items-center gap-2">
                <Input id="invite-code" value={teamData.inviteCode} readOnly className="bg-black/50 border-gray-700" />
                <Button variant="outline" size="icon" className="h-10 w-10 border-gray-700">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy invite code</span>
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Share this code with your teammates. They can use it to join your team.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-invite" className="text-gray-300">
                Or Invite by Email
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email-invite"
                  placeholder="teammate@example.com"
                  className="bg-black/50 border-gray-700 flex-1"
                />
                <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Team Dialog */}
      <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-teal-900/50">
          <DialogHeader>
            <DialogTitle>Create a Team</DialogTitle>
            <DialogDescription className="text-gray-400">
              Form your own team to participate in CTF challenges.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input id="team-name" placeholder="ByteBusters" className="bg-black/50 border-gray-700" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team-description">Team Description (Optional)</Label>
              <Input
                id="team-description"
                placeholder="A team of security enthusiasts"
                className="bg-black/50 border-gray-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowCreateTeamDialog(false)
                setHasTeam(true)
              }}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
            >
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
