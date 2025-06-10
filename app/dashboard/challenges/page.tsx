"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Lock, Unlock, FileText, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample challenge data
const challenges = [
  {
    id: 1,
    title: "Web Exploitation 101",
    description: "A beginner-friendly web exploitation challenge.",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    solved: 24,
    tasks: [
      { id: 1, title: "SQL Injection", points: 50, solved: false },
      { id: 2, title: "XSS Attack", points: 50, solved: false },
    ],
  },
  {
    id: 2,
    title: "Cryptography Challenge",
    description: "Break various encryption algorithms.",
    category: "Crypto",
    difficulty: "Medium",
    points: 200,
    solved: 12,
    tasks: [
      { id: 3, title: "Caesar Cipher", points: 50, solved: true },
      { id: 4, title: "RSA Basics", points: 75, solved: false },
      { id: 5, title: "Advanced Encryption", points: 75, solved: false },
    ],
  },
  {
    id: 3,
    title: "Binary Exploitation",
    description: "Exploit vulnerabilities in binary files.",
    category: "Pwn",
    difficulty: "Hard",
    points: 300,
    solved: 5,
    tasks: [
      { id: 6, title: "Buffer Overflow", points: 100, solved: false },
      { id: 7, title: "Return-Oriented Programming", points: 200, solved: false },
    ],
  },
  {
    id: 4,
    title: "Forensics Investigation",
    description: "Analyze digital evidence to solve the mystery.",
    category: "Forensics",
    difficulty: "Medium",
    points: 250,
    solved: 18,
    tasks: [
      { id: 8, title: "File Analysis", points: 75, solved: false },
      { id: 9, title: "Memory Dump", points: 100, solved: false },
      { id: 10, title: "Network Traffic", points: 75, solved: false },
    ],
  },
  // 20 more challenges
  {
    id: 5,
    title: "Web Authentication Bypass",
    description: "Find ways to bypass authentication mechanisms.",
    category: "Web",
    difficulty: "Medium",
    points: 150,
    solved: 15,
    tasks: [
      { id: 11, title: "Cookie Manipulation", points: 75, solved: false },
      { id: 12, title: "JWT Vulnerabilities", points: 75, solved: false },
    ],
  },
  {
    id: 6,
    title: "Advanced Web Exploitation",
    description: "Advanced techniques for exploiting web applications.",
    category: "Web",
    difficulty: "Hard",
    points: 250,
    solved: 8,
    tasks: [
      { id: 13, title: "Server-Side Template Injection", points: 125, solved: false },
      { id: 14, title: "GraphQL Vulnerabilities", points: 125, solved: false },
    ],
  },
  {
    id: 7,
    title: "Symmetric Cryptography",
    description: "Break symmetric encryption algorithms.",
    category: "Crypto",
    difficulty: "Easy",
    points: 100,
    solved: 30,
    tasks: [
      { id: 15, title: "Substitution Ciphers", points: 50, solved: true },
      { id: 16, title: "Block Cipher Modes", points: 50, solved: false },
    ],
  },
  {
    id: 8,
    title: "Asymmetric Cryptography",
    description: "Challenges focused on public key cryptography.",
    category: "Crypto",
    difficulty: "Hard",
    points: 300,
    solved: 7,
    tasks: [
      { id: 17, title: "RSA Implementation Flaws", points: 150, solved: false },
      { id: 18, title: "Elliptic Curve Cryptography", points: 150, solved: false },
    ],
  },
  {
    id: 9,
    title: "Stack Smashing",
    description: "Exploit stack-based buffer overflows.",
    category: "Pwn",
    difficulty: "Medium",
    points: 200,
    solved: 10,
    tasks: [
      { id: 19, title: "Stack Canaries", points: 100, solved: false },
      { id: 20, title: "Return to libc", points: 100, solved: false },
    ],
  },
  {
    id: 10,
    title: "Heap Exploitation",
    description: "Exploit heap-based vulnerabilities.",
    category: "Pwn",
    difficulty: "Hard",
    points: 350,
    solved: 3,
    tasks: [
      { id: 21, title: "Use After Free", points: 175, solved: false },
      { id: 22, title: "Heap Overflow", points: 175, solved: false },
    ],
  },
  {
    id: 11,
    title: "File System Forensics",
    description: "Recover and analyze file system artifacts.",
    category: "Forensics",
    difficulty: "Easy",
    points: 100,
    solved: 22,
    tasks: [
      { id: 23, title: "File Carving", points: 50, solved: true },
      { id: 24, title: "Metadata Analysis", points: 50, solved: false },
    ],
  },
  {
    id: 12,
    title: "Memory Forensics",
    description: "Analyze memory dumps to find evidence.",
    category: "Forensics",
    difficulty: "Hard",
    points: 300,
    solved: 6,
    tasks: [
      { id: 25, title: "Process Analysis", points: 100, solved: false },
      { id: 26, title: "Rootkit Detection", points: 100, solved: false },
      { id: 27, title: "Hidden Data Extraction", points: 100, solved: false },
    ],
  },
  {
    id: 13,
    title: "Mobile Application Security",
    description: "Find vulnerabilities in mobile applications.",
    category: "Mobile",
    difficulty: "Medium",
    points: 200,
    solved: 14,
    tasks: [
      { id: 28, title: "Android APK Analysis", points: 100, solved: false },
      { id: 29, title: "iOS Application Security", points: 100, solved: false },
    ],
  },
  {
    id: 14,
    title: "Reverse Engineering Basics",
    description: "Learn the basics of reverse engineering.",
    category: "Reverse",
    difficulty: "Easy",
    points: 150,
    solved: 20,
    tasks: [
      { id: 30, title: "Assembly Basics", points: 75, solved: true },
      { id: 31, title: "Static Analysis", points: 75, solved: false },
    ],
  },
  {
    id: 15,
    title: "Advanced Reverse Engineering",
    description: "Advanced techniques for reverse engineering binaries.",
    category: "Reverse",
    difficulty: "Hard",
    points: 350,
    solved: 4,
    tasks: [
      { id: 32, title: "Anti-Debugging Techniques", points: 175, solved: false },
      { id: 33, title: "Obfuscated Code Analysis", points: 175, solved: false },
    ],
  },
  {
    id: 16,
    title: "Network Security",
    description: "Analyze and exploit network protocols.",
    category: "Network",
    difficulty: "Medium",
    points: 250,
    solved: 11,
    tasks: [
      { id: 34, title: "Packet Analysis", points: 125, solved: false },
      { id: 35, title: "Protocol Vulnerabilities", points: 125, solved: false },
    ],
  },
  {
    id: 17,
    title: "OSINT Challenge",
    description: "Use open-source intelligence to find information.",
    category: "OSINT",
    difficulty: "Easy",
    points: 100,
    solved: 25,
    tasks: [
      { id: 36, title: "Social Media Investigation", points: 50, solved: true },
      { id: 37, title: "Domain Information Gathering", points: 50, solved: false },
    ],
  },
  {
    id: 18,
    title: "Hardware Hacking",
    description: "Exploit vulnerabilities in hardware devices.",
    category: "Hardware",
    difficulty: "Hard",
    points: 400,
    solved: 2,
    tasks: [
      { id: 38, title: "UART Analysis", points: 200, solved: false },
      { id: 39, title: "Firmware Extraction", points: 200, solved: false },
    ],
  },
  {
    id: 19,
    title: "Cloud Security",
    description: "Find misconfigurations in cloud environments.",
    category: "Cloud",
    difficulty: "Medium",
    points: 200,
    solved: 9,
    tasks: [
      { id: 40, title: "S3 Bucket Analysis", points: 100, solved: false },
      { id: 41, title: "IAM Misconfigurations", points: 100, solved: false },
    ],
  },
  {
    id: 20,
    title: "Steganography",
    description: "Find hidden data in various file formats.",
    category: "Stego",
    difficulty: "Easy",
    points: 150,
    solved: 18,
    tasks: [
      { id: 42, title: "Image Steganography", points: 75, solved: true },
      { id: 43, title: "Audio Steganography", points: 75, solved: false },
    ],
  },
  {
    id: 21,
    title: "Container Security",
    description: "Exploit vulnerabilities in containerized applications.",
    category: "Cloud",
    difficulty: "Hard",
    points: 300,
    solved: 5,
    tasks: [
      { id: 44, title: "Docker Escape", points: 150, solved: false },
      { id: 45, title: "Kubernetes Security", points: 150, solved: false },
    ],
  },
  {
    id: 22,
    title: "Blockchain Security",
    description: "Find vulnerabilities in smart contracts and blockchain applications.",
    category: "Blockchain",
    difficulty: "Medium",
    points: 250,
    solved: 7,
    tasks: [
      { id: 46, title: "Smart Contract Vulnerabilities", points: 125, solved: false },
      { id: 47, title: "Blockchain Protocol Analysis", points: 125, solved: false },
    ],
  },
  {
    id: 23,
    title: "Password Cracking",
    description: "Crack various password hashing algorithms.",
    category: "Crypto",
    difficulty: "Easy",
    points: 150,
    solved: 19,
    tasks: [
      { id: 48, title: "Dictionary Attacks", points: 75, solved: true },
      { id: 49, title: "Rainbow Tables", points: 75, solved: false },
    ],
  },
  {
    id: 24,
    title: "AI Security",
    description: "Exploit vulnerabilities in AI systems.",
    category: "AI",
    difficulty: "Hard",
    points: 350,
    solved: 3,
    tasks: [
      { id: 50, title: "Model Poisoning", points: 175, solved: false },
      { id: 51, title: "Prompt Injection", points: 175, solved: false },
    ],
  },
]

export default function ChallengesPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Easy",
    maxTeamSize: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [challengesPerPage] = useState(9) // 3x3 grid

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title.trim()) errors.title = "Title is required"
    if (!formData.description.trim()) errors.description = "Description is required"
    if (!formData.category) errors.category = "Category is required"
    if (!formData.maxTeamSize || !/^[1-7]$/.test(formData.maxTeamSize)) {
      errors.maxTeamSize = "Max team size must be a single digit from 1 to 7"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create new challenge object
      const newChallenge = {
        id: challenges.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty as "Easy" | "Medium" | "Hard" | "Insane",
        solved: 0,
        tasks: [],
      }

      // Add to challenges array (in real app, this would be an API call)
      challenges.unshift(newChallenge)

      setSubmitMessage({ type: "success", message: "Challenge created successfully!" })

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "Easy",
        maxTeamSize: "",
      })

      // Close dialog after 2 seconds
      setTimeout(() => {
        setIsCreateDialogOpen(false)
        setSubmitMessage(null)
      }, 2000)
    } catch (error) {
      setSubmitMessage({ type: "error", message: "Failed to create challenge. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getCurrentPageChallenges = (challengesToShow: typeof challenges) => {
    const indexOfLastChallenge = currentPage * challengesPerPage
    const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage
    return challengesToShow.slice(indexOfFirstChallenge, indexOfLastChallenge)
  }

  const getTotalPages = (challengesToShow: typeof challenges) => {
    return Math.ceil(challengesToShow.length / challengesPerPage)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Challenges</h1>
        {isAdmin && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)] relative z-20 pointer-events-auto"
                type="button"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new challenge for participants to solve.
                </DialogDescription>
              </DialogHeader>

              {submitMessage && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    submitMessage.type === "success"
                      ? "bg-green-900/20 text-green-400 border border-green-900/50"
                      : "bg-red-900/20 text-red-400 border border-red-900/50"
                  }`}
                >
                  {submitMessage.message}
                </div>
              )}

              <form onSubmit={handleCreateChallenge} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Web Exploitation 101"
                    className="bg-black/50 border-gray-700"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={isSubmitting}
                  />
                  {formErrors.title && <span className="text-red-400 text-xs">{formErrors.title}</span>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    placeholder="A beginner-friendly web challenge"
                    className="bg-black/50 border-gray-700"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={isSubmitting}
                  />
                  {formErrors.description && <span className="text-red-400 text-xs">{formErrors.description}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="category" className="bg-black/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[hsl(var(--border)/0.5)] text-white">
                        <SelectItem value="Web" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🌐</span> Web
                          </span>
                        </SelectItem>
                        <SelectItem value="Crypto" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🔐</span> Crypto
                          </span>
                        </SelectItem>
                        <SelectItem value="Forensics" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🔍</span> Forensics
                          </span>
                        </SelectItem>
                        <SelectItem value="Pwn" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>💥</span> Pwn
                          </span>
                        </SelectItem>
                        <SelectItem value="Reverse" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🔄</span> Reverse
                          </span>
                        </SelectItem>
                        <SelectItem value="Mobile" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>📱</span> Mobile
                          </span>
                        </SelectItem>
                        <SelectItem value="Network" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🌐</span> Network
                          </span>
                        </SelectItem>
                        <SelectItem value="OSINT" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🕵️</span> OSINT
                          </span>
                        </SelectItem>
                        <SelectItem value="Hardware" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>⚡</span> Hardware
                          </span>
                        </SelectItem>
                        <SelectItem value="Cloud" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>☁️</span> Cloud
                          </span>
                        </SelectItem>
                        <SelectItem value="Stego" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🎭</span> Stego
                          </span>
                        </SelectItem>
                        <SelectItem value="Blockchain" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>⛓️</span> Blockchain
                          </span>
                        </SelectItem>
                        <SelectItem value="AI" className="hover:bg-gray-800">
                          <span className="flex items-center gap-2">
                            <span>🤖</span> AI
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.category && <span className="text-red-400 text-xs">{formErrors.category}</span>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => handleInputChange("difficulty", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="difficulty" className="bg-black/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[hsl(var(--border)/0.5)] text-white">
                        <SelectItem value="Easy" className="hover:bg-gray-800 text-green-400">
                          <span className="text-green-400">Easy</span>
                        </SelectItem>
                        <SelectItem value="Medium" className="hover:bg-gray-800 text-yellow-400">
                          <span className="text-yellow-400">Medium</span>
                        </SelectItem>
                        <SelectItem value="Hard" className="hover:bg-gray-800 text-red-400">
                          <span className="text-red-400">Hard</span>
                        </SelectItem>
                        <SelectItem value="Insane" className="hover:bg-gray-800 text-purple-400">
                          <span className="text-purple-400">Insane</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-team-size">Max Team Size *</Label>
                  <Input
                    id="max-team-size"
                    placeholder="4"
                    type="number"
                    min="1"
                    max="7"
                    maxLength={1}
                    className="bg-black/50 border-gray-700 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    value={formData.maxTeamSize}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "" || (value.length === 1 && /^[1-7]$/.test(value))) {
                        handleInputChange("maxTeamSize", value)
                      }
                    }}
                    disabled={isSubmitting}
                  />
                  {formErrors.maxTeamSize && <span className="text-red-400 text-xs">{formErrors.maxTeamSize}</span>}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                  >
                    {isSubmitting ? "Creating..." : "Create Challenge"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border-b border-[hsl(var(--border)/0.2)] w-full justify-start rounded-none px-0 mb-4 flex-wrap bg-transparent relative z-10 pointer-events-auto">
          <TabsTrigger
            value="all"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white pointer-events-auto relative z-10"
          >
            All Challenges
          </TabsTrigger>
          <TabsTrigger
            value="web"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Web
          </TabsTrigger>
          <TabsTrigger
            value="crypto"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Crypto
          </TabsTrigger>
          <TabsTrigger
            value="forensics"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Forensics
          </TabsTrigger>
          <TabsTrigger
            value="pwn"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Pwn
          </TabsTrigger>
          <TabsTrigger
            value="reverse"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Reverse
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Mobile
          </TabsTrigger>
          <TabsTrigger
            value="network"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Network
          </TabsTrigger>
          <TabsTrigger
            value="osint"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            OSINT
          </TabsTrigger>
          <TabsTrigger
            value="hardware"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Hardware
          </TabsTrigger>
          <TabsTrigger
            value="cloud"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Cloud
          </TabsTrigger>
          <TabsTrigger
            value="stego"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Stego
          </TabsTrigger>
          <TabsTrigger
            value="blockchain"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            Blockchain
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            onClick={() => setCurrentPage(1)}
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-0 text-white data-[state=active]:bg-transparent pointer-events-auto relative z-10 data-[state=active]:text-white data-[state=inactive]:text-white hover:text-white"
          >
            AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getCurrentPageChallenges(challenges).map((challenge) => (
              <Card
                key={challenge.id}
                className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md shadow-[hsl(var(--accent)/0.1)] hover:border-[hsl(var(--border)/0.3)]"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">{challenge.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        challenge.difficulty === "Easy"
                          ? "bg-[hsl(var(--accent)/0.2)] text-green-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                          : challenge.difficulty === "Medium"
                            ? "bg-[hsl(var(--accent)/0.2)] text-yellow-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                            : "bg-[hsl(var(--accent)/0.2)] text-red-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400 mt-2">{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      Category:
                      <Badge
                        variant="outline"
                        className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--primary)/0.2)] transition-colors"
                      >
                        {challenge.category}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-[hsl(var(--accent)/0.1)] text-gray-300 border-[hsl(var(--border)/0.3)] hover:bg-[hsl(var(--accent)/0.2)] transition-colors"
                    >
                      {challenge.points} pts
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Tasks: {challenge.tasks.length}</span>
                      <span>Solved by: {challenge.solved} teams</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-[hsl(var(--primary))] via-white/20 to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:via-white/30 hover:to-[hsl(var(--primary)/0.7)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => (window.location.href = `/dashboard/challenges/${challenge.id}/tasks`)}
                  >
                    View Tasks
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {getTotalPages(challenges) > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex space-x-1">
                {Array.from({ length: getTotalPages(challenges) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] text-white"
                        : "bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === getTotalPages(challenges)}
                className="bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Dynamic tab content for each category */}
        {[
          "web",
          "crypto",
          "forensics",
          "pwn",
          "reverse",
          "mobile",
          "network",
          "osint",
          "hardware",
          "cloud",
          "stego",
          "blockchain",
          "ai",
        ].map((category) => (
          <TabsContent key={category} value={category} className="m-0">
            {(() => {
              const categoryPage = currentPage
              const filteredChallenges = challenges.filter((c) => c.category.toLowerCase() === category.toLowerCase())
              const paginatedChallenges = getCurrentPageChallenges(filteredChallenges)

              return (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedChallenges.map((challenge) => (
                      <Card
                        key={challenge.id}
                        className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md shadow-[hsl(var(--accent)/0.1)] hover:border-[hsl(var(--border)/0.3)]"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white">{challenge.title}</CardTitle>
                            <Badge
                              variant="outline"
                              className={
                                challenge.difficulty === "Easy"
                                  ? "bg-[hsl(var(--accent)/0.2)] text-green-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                                  : challenge.difficulty === "Medium"
                                    ? "bg-[hsl(var(--accent)/0.2)] text-yellow-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                                    : "bg-[hsl(var(--accent)/0.2)] text-red-400 hover:bg-[hsl(var(--accent)/0.3)] border-[hsl(var(--border)/0.5)]"
                              }
                            >
                              {challenge.difficulty}
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-400 mt-2">{challenge.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex justify-between text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                              Category:
                              <Badge
                                variant="outline"
                                className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--primary)/0.2)] transition-colors"
                              >
                                {challenge.category}
                              </Badge>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-[hsl(var(--accent)/0.1)] text-gray-300 border-[hsl(var(--border)/0.3)] hover:bg-[hsl(var(--accent)/0.2)] transition-colors"
                            >
                              {challenge.points} pts
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            <div className="flex justify-between">
                              <span>Tasks: {challenge.tasks.length}</span>
                              <span>Solved by: {challenge.solved} teams</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full bg-gradient-to-r from-[hsl(var(--primary))] via-white/20 to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:via-white/30 hover:to-[hsl(var(--primary)/0.7)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => (window.location.href = `/dashboard/challenges/${challenge.id}/tasks`)}
                          >
                            View Tasks
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {filteredChallenges.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No challenges found in this category.</p>
                    </div>
                  )}

                  {/* Pagination for category */}
                  {getTotalPages(filteredChallenges) > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex space-x-1">
                        {Array.from({ length: getTotalPages(filteredChallenges) }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] text-white"
                                : "bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
                            }
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === getTotalPages(filteredChallenges)}
                        className="bg-black/50 border-[hsl(var(--border)/0.2)] text-white hover:bg-[hsl(var(--accent)/0.3)]"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )
            })()}
          </TabsContent>
        ))}
      </Tabs>

      {/* Challenge Details Dialog */}
      {selectedChallenge && (
        <Dialog open={!!selectedChallenge} onOpenChange={(open) => !open && setSelectedChallenge(null)}>
          <DialogContent className="max-w-4xl bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-2xl">{selectedChallenge.title}</DialogTitle>
                <Badge
                  variant="outline"
                  className={
                    selectedChallenge.difficulty === "Easy"
                      ? "bg-[hsl(var(--accent)/0.2)] text-green-400 border-[hsl(var(--border)/0.5)]"
                      : selectedChallenge.difficulty === "Medium"
                        ? "bg-[hsl(var(--accent)/0.2)] text-yellow-400 border-[hsl(var(--border)/0.5)]"
                        : "bg-[hsl(var(--accent)/0.2)] text-red-400 border-[hsl(var(--border)/0.5)]"
                  }
                >
                  {selectedChallenge.difficulty}
                </Badge>
              </div>
              <DialogDescription className="text-gray-400 mt-2">{selectedChallenge.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="flex justify-between text-sm text-gray-400">
                <div>
                  Category: <span className="text-[hsl(var(--primary))]">{selectedChallenge.category}</span>
                </div>
                <div>Total Points: {selectedChallenge.points}</div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Tasks</h3>
                <div className="space-y-3">
                  {selectedChallenge.tasks.map((task: any) => (
                    <Card key={task.id} className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic-sm">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base text-white flex items-center">
                            {task.solved ? (
                              <Unlock className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 mr-2 text-gray-500" />
                            )}
                            {task.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-[hsl(var(--accent)/0.2)] text-[hsl(var(--primary))] border-[hsl(var(--border)/0.5)]"
                          >
                            {task.points} pts
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardFooter className="py-3">
                        <Button
                          className="w-full bg-gradient-to-r from-[hsl(var(--primary))] via-white/20 to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:via-white/30 hover:to-[hsl(var(--primary)/0.7)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => setSelectedTask(task)}
                        >
                          {task.solved ? "View Solution" : "Solve Challenge"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
          <DialogContent className="max-w-3xl bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription className="text-gray-400">{selectedTask.points} points</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-black/50 rounded-lg border border-[hsl(var(--border)/0.5)]">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
                <p className="text-white">
                  This task requires you to find and exploit a vulnerability in the provided web application. Look for
                  common security flaws and think outside the box!
                </p>
              </div>

              <div className="p-4 bg-black/50 rounded-lg border border-[hsl(var(--border)/0.5)]">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Hints</h3>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Check the input validation on the login form</li>
                  <li>Remember to look at the HTTP response headers</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic text-white hover:bg-[hsl(var(--accent)/0.3)]"
                >
                  <FileText className="h-4 w-4 mr-2" /> View Instructions
                </Button>
                <Button
                  variant="outline"
                  className="bg-black/50 border-[hsl(var(--border)/0.2)] shadow-neomorphic text-white hover:bg-[hsl(var(--accent)/0.3)]"
                >
                  <Download className="h-4 w-4 mr-2" /> Download Files
                </Button>
              </div>

              <div className="p-4 bg-black/50 rounded-lg border border-[hsl(var(--border)/0.5)]">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Submit Flag</h3>
                <div className="flex gap-2">
                  <Input placeholder="flag{...}" className="bg-black/50 border-gray-700 flex-1" />
                  <Button className="bg-gradient-to-r from-[hsl(var(--primary))] via-white/20 to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:via-white/30 hover:to-[hsl(var(--primary)/0.7)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
