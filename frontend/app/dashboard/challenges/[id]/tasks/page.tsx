"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  Download,
  FileText,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  LogOut,
  Shield,
  Edit,
  Plus,
  Trash2,
  Globe,
  Key,
  Search,
  Zap,
  RotateCcw,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-provider"

// Sample challenge data - in a real app, this would come from an API
const challenges = [
  {
    id: "1",
    title: "Web Exploitation 101",
    description: "A beginner-friendly web exploitation challenge.",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    solved: 24,
    tasks: [
      {
        id: "1",
        title: "SQL Injection",
        points: 50,
        solved: false,
        description: "Find and exploit a SQL injection vulnerability in the login form.",
        hints: [
          "Try using special characters in the input fields",
          "Remember to check for error messages that might reveal database information",
        ],
        files: [{ name: "vulnerable-app.zip", size: "2.3 MB" }],
      },
      {
        id: "2",
        title: "XSS Attack",
        points: 50,
        solved: false,
        description: "Identify and exploit a cross-site scripting vulnerability.",
        hints: [
          "Look for user input that gets reflected on the page",
          "Try injecting JavaScript code in various input fields",
        ],
        files: [{ name: "target-website.zip", size: "1.8 MB" }],
      },
    ],
  },
  {
    id: "2",
    title: "Cryptography Challenge",
    description: "Break various encryption algorithms.",
    category: "Crypto",
    difficulty: "Medium",
    points: 200,
    solved: 12,
    tasks: [
      {
        id: "3",
        title: "Caesar Cipher",
        points: 50,
        solved: true,
        description: "Decrypt a message encoded with a Caesar cipher.",
        hints: ["Try different shift values", "Look for patterns in the encrypted text"],
        files: [{ name: "encrypted.txt", size: "1.2 KB" }],
      },
      {
        id: "4",
        title: "RSA Basics",
        points: 75,
        solved: false,
        description: "Break a weak RSA implementation to recover the plaintext.",
        hints: ["Check if the key size is sufficient", "Look for mathematical vulnerabilities in the implementation"],
        files: [{ name: "rsa-challenge.py", size: "4.5 KB" }],
      },
      {
        id: "5",
        title: "Advanced Encryption",
        points: 75,
        solved: false,
        description: "Analyze and break a custom encryption algorithm.",
        hints: ["The algorithm might have implementation flaws", "Try to reverse-engineer the encryption process"],
        files: [
          { name: "custom-encryption.py", size: "6.2 KB" },
          { name: "encrypted-data.bin", size: "8.4 KB" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Binary Exploitation",
    description: "Exploit vulnerabilities in binary files.",
    category: "Pwn",
    difficulty: "Hard",
    points: 300,
    solved: 5,
    tasks: [
      {
        id: "6",
        title: "Buffer Overflow",
        points: 100,
        solved: false,
        description: "Exploit a buffer overflow vulnerability to gain control of program execution.",
        hints: ["Look for unsafe buffer handling functions", "Try to overwrite the return address on the stack"],
        files: [
          { name: "vulnerable-binary", size: "24.6 KB" },
          { name: "source.c", size: "2.1 KB" },
        ],
      },
      {
        id: "7",
        title: "Return-Oriented Programming",
        points: 200,
        solved: false,
        description: "Use ROP techniques to bypass security protections and execute arbitrary code.",
        hints: ["Identify useful gadgets in the binary", "Chain gadgets together to perform the desired operations"],
        files: [{ name: "target-binary", size: "32.8 KB" }],
      },
    ],
  },
  {
    id: "4",
    title: "Forensics Investigation",
    description: "Analyze digital evidence to solve the mystery.",
    category: "Forensics",
    difficulty: "Medium",
    points: 250,
    solved: 18,
    tasks: [
      {
        id: "8",
        title: "File Analysis",
        points: 75,
        solved: false,
        description: "Analyze a suspicious file to extract hidden information.",
        hints: ["Check file headers and metadata", "Look for steganography techniques"],
        files: [{ name: "suspicious-file.jpg", size: "1.5 MB" }],
      },
      {
        id: "9",
        title: "Memory Dump",
        points: 100,
        solved: false,
        description: "Analyze a memory dump to find evidence of malicious activity.",
        hints: [
          "Look for suspicious processes and network connections",
          "Extract strings and analyze them for patterns",
        ],
        files: [{ name: "memory-dump.raw", size: "256 MB" }],
      },
      {
        id: "10",
        title: "Network Traffic",
        points: 75,
        solved: false,
        description: "Analyze network traffic to identify suspicious activities.",
        hints: ["Look for unusual protocols or connections", "Check for encoded or encrypted data"],
        files: [{ name: "capture.pcap", size: "45.2 MB" }],
      },
    ],
  },
]

export default function TasksPage() {
  const params = useParams()
  const router = useRouter()
  const challengeId = params.id as string
  const { user, logout } = useAuth()
  const isAdmin = user?.role === "admin"

  const [challenge, setChallenge] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [flagInput, setFlagInput] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false)

  // Edit Challenge State
  const [showEditChallengeDialog, setShowEditChallengeDialog] = useState(false)
  const [editingChallenge, setEditingChallenge] = useState(false)
  const [challengeFormData, setChallengeFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Easy",
  })
  const [challengeFormErrors, setChallengeFormErrors] = useState<Record<string, string>>({})

  // Edit Task State
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false)
  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false)
  const [editingTask, setEditingTask] = useState(false)
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    points: "",
    hints: [""],
    files: [{ name: "", size: "", type: "" }],
  })
  const [taskFormErrors, setTaskFormErrors] = useState<Record<string, string>>({})
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundChallenge = challenges.find((c) => c.id === challengeId)
    if (foundChallenge) {
      setChallenge(foundChallenge)
      setChallengeFormData({
        title: foundChallenge.title,
        description: foundChallenge.description,
        category: foundChallenge.category,
        difficulty: foundChallenge.difficulty,
      })
    } else {
      // Challenge not found, redirect back to challenges page
      router.push("/dashboard/challenges")
    }
  }, [challengeId, router])

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task)
    setFlagInput("")
    setSubmissionResult(null)
  }

  const handleSubmitFlag = () => {
    if (!flagInput.trim()) {
      toast.error("Please enter a flag")
      return
    }

    setSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, let's say the flag is correct if it starts with "flag{"
      const isCorrect = flagInput.trim().startsWith("flag{")

      setSubmissionResult({
        success: isCorrect,
        message: isCorrect ? "Congratulations! You've solved this task." : "Incorrect flag. Please try again.",
      })

      setShowSubmissionDialog(true)
      setSubmitting(false)

      if (isCorrect) {
        // Mark task as solved
        if (challenge && selectedTask) {
          const updatedTasks = challenge.tasks.map((t: any) => (t.id === selectedTask.id ? { ...t, solved: true } : t))
          setChallenge({ ...challenge, tasks: updatedTasks })
          setSelectedTask({ ...selectedTask, solved: true })
        }
      }
    }, 1500)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Challenge Edit Functions
  const validateChallengeForm = () => {
    const errors: Record<string, string> = {}
    if (!challengeFormData.title.trim()) errors.title = "Title is required"
    if (!challengeFormData.description.trim()) errors.description = "Description is required"
    if (!challengeFormData.category) errors.category = "Category is required"
    setChallengeFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEditChallenge = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateChallengeForm()) return

    setEditingChallenge(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update challenge
      const updatedChallenge = { ...challenge, ...challengeFormData }
      setChallenge(updatedChallenge)

      toast.success("Challenge updated successfully!")
      setShowEditChallengeDialog(false)
    } catch (error) {
      toast.error("Failed to update challenge")
    } finally {
      setEditingChallenge(false)
    }
  }

  const handleChallengeInputChange = (field: string, value: string) => {
    setChallengeFormData((prev) => ({ ...prev, [field]: value }))
    if (challengeFormErrors[field]) {
      setChallengeFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (index: number, field: "name", value: string) => {
    const newFiles = [...(taskFormData.files || [{ name: "", size: "", type: "" }])]
    newFiles[index] = { ...newFiles[index], [field]: value }
    setTaskFormData((prev) => ({ ...prev, files: newFiles }))
  }

  const addFile = () => {
    setTaskFormData((prev) => ({
      ...prev,
      files: [...(prev.files || []), { name: "", size: "", type: "" }],
    }))
  }

  const removeFile = (index: number) => {
    const newFiles = taskFormData.files.filter((_, i) => i !== index)
    setTaskFormData((prev) => ({ ...prev, files: newFiles }))
  }

  // Task Edit Functions
  const validateTaskForm = () => {
    const errors: Record<string, string> = {}
    if (!taskFormData.title.trim()) errors.title = "Title is required"
    if (!taskFormData.description.trim()) errors.description = "Description is required"
    if (!taskFormData.points || isNaN(Number(taskFormData.points)) || Number(taskFormData.points) <= 0) {
      errors.points = "Points must be a positive number"
    }
    setTaskFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateTaskForm()) return

    setEditingTask(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingTaskId) {
        // Update existing task
        const updatedTasks = challenge.tasks.map((t: any) =>
          t.id === editingTaskId
            ? {
                ...t,
                title: taskFormData.title,
                description: taskFormData.description,
                points: Number(taskFormData.points),
                hints: taskFormData.hints.filter((h) => h.trim()),
                files: taskFormData.files?.filter((f) => f.name.trim()) || [],
              }
            : t,
        )
        setChallenge({ ...challenge, tasks: updatedTasks })

        if (selectedTask?.id === editingTaskId) {
          setSelectedTask({
            ...selectedTask,
            title: taskFormData.title,
            description: taskFormData.description,
            points: Number(taskFormData.points),
            hints: taskFormData.hints.filter((h) => h.trim()),
            files: taskFormData.files?.filter((f) => f.name.trim()) || [],
          })
        }

        toast.success("Task updated successfully!")
        setShowEditTaskDialog(false)
      } else {
        // Create new task
        const newTask = {
          id: String(Date.now()),
          title: taskFormData.title,
          description: taskFormData.description,
          points: Number(taskFormData.points),
          hints: taskFormData.hints.filter((h) => h.trim()),
          solved: false,
          files: taskFormData.files?.filter((f) => f.name.trim()) || [],
        }

        setChallenge({ ...challenge, tasks: [...challenge.tasks, newTask] })
        toast.success("Task created successfully!")
        setShowCreateTaskDialog(false)
      }

      // Reset form
      setTaskFormData({
        title: "",
        description: "",
        points: "",
        hints: [""],
        files: [{ name: "", size: "", type: "" }],
      })
      setEditingTaskId(null)
    } catch (error) {
      toast.error("Failed to save task")
    } finally {
      setEditingTask(false)
    }
  }

  const handleTaskInputChange = (field: string, value: string) => {
    setTaskFormData((prev) => ({ ...prev, [field]: value }))
    if (taskFormErrors[field]) {
      setTaskFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...taskFormData.hints]
    newHints[index] = value
    setTaskFormData((prev) => ({ ...prev, hints: newHints }))
  }

  const addHint = () => {
    setTaskFormData((prev) => ({ ...prev, hints: [...prev.hints, ""] }))
  }

  const removeHint = (index: number) => {
    if (taskFormData.hints.length > 1) {
      const newHints = taskFormData.hints.filter((_, i) => i !== index)
      setTaskFormData((prev) => ({ ...prev, hints: newHints }))
    }
  }

  const openEditTaskDialog = (task: any) => {
    setEditingTaskId(task.id)
    setTaskFormData({
      title: task.title,
      description: task.description,
      points: String(task.points),
      hints: task.hints.length > 0 ? task.hints : [""],
      files:
        task.files.length > 0
          ? task.files.map((f: any) => ({
              name: f.name,
              size: f.size,
              type: f.type || getFileType(f.name),
            }))
          : [{ name: "", size: "", type: "" }],
    })
    setShowEditTaskDialog(true)
  }

  const openCreateTaskDialog = () => {
    setEditingTaskId(null)
    setTaskFormData({
      title: "",
      description: "",
      points: "",
      hints: [""],
      files: [{ name: "", size: "", type: "" }],
    })
    setShowCreateTaskDialog(true)
  }

  const deleteTask = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const updatedTasks = challenge.tasks.filter((t: any) => t.id !== taskId)
        setChallenge({ ...challenge, tasks: updatedTasks })

        if (selectedTask?.id === taskId) {
          setSelectedTask(null)
        }

        toast.success("Task deleted successfully!")
      } catch (error) {
        toast.error("Failed to delete task")
      }
    }
  }

  const handleFileUpload = (index: number, uploadedFile: File) => {
    const newFiles = [...(taskFormData.files || [])]
    newFiles[index] = {
      name: uploadedFile.name,
      size: formatFileSize(uploadedFile.size),
      type: getFileType(uploadedFile.name),
    }
    setTaskFormData((prev) => ({ ...prev, files: newFiles }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    const typeMap: Record<string, string> = {
      zip: "Archive",
      rar: "Archive",
      "7z": "Archive",
      tar: "Archive",
      gz: "Archive",
      txt: "Text",
      pdf: "Document",
      doc: "Document",
      docx: "Document",
      py: "Python",
      js: "JavaScript",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      xml: "XML",
      csv: "CSV",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      gif: "Image",
      mp3: "Audio",
      wav: "Audio",
      mp4: "Video",
      avi: "Video",
      exe: "Executable",
      bin: "Binary",
    }
    return typeMap[extension || ""] || "Unknown"
  }

  const getFileTypeColor = (extension: string): string => {
    const colorMap: Record<string, string> = {
      zip: "text-purple-400",
      rar: "text-purple-400",
      "7z": "text-purple-400",
      tar: "text-purple-400",
      gz: "text-purple-400",
      txt: "text-blue-400",
      pdf: "text-red-400",
      doc: "text-blue-500",
      docx: "text-blue-500",
      py: "text-yellow-400",
      js: "text-yellow-300",
      html: "text-orange-400",
      css: "text-blue-300",
      json: "text-green-400",
      xml: "text-green-300",
      csv: "text-green-500",
      jpg: "text-pink-400",
      jpeg: "text-pink-400",
      png: "text-pink-400",
      gif: "text-pink-400",
      mp3: "text-indigo-400",
      wav: "text-indigo-400",
      mp4: "text-red-500",
      avi: "text-red-500",
      exe: "text-gray-300",
      bin: "text-gray-400",
    }
    return colorMap[extension] || "text-gray-400"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900/20 text-green-400 border-green-900/50"
      case "Medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-900/50"
      case "Hard":
        return "bg-red-900/20 text-red-400 border-red-900/50"
      case "Insane":
        return "bg-purple-900/20 text-purple-400 border-purple-900/50"
      default:
        return "bg-teal-900/20 text-teal-400 border-teal-900/50"
    }
  }

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-white text-xl">Loading challenge...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 overflow-auto">
      {/* Custom Navbar for Tasks Page */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between border-b border-purple-900/20 bg-black/50 backdrop-blur-sm px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-teal-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] bg-clip-text text-transparent">
              HexVortex
            </span>
          </div>
          <div className="h-6 w-px bg-gray-600 mx-2" />
          <span className="text-gray-400 text-sm">CTF Platform</span>
        </div>

        <div className="flex items-center gap-4">
          {user && <span className="text-gray-400 text-sm">Welcome, {user.name}</span>}
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="pt-16 min-h-screen w-full p-6 space-y-6">
        <div className="flex items-center justify-between bg-gradient-to-r from-teal-900/30 to-blue-900/30 p-4 rounded-xl border border-teal-900/30 shadow-neomorphic-sm">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-black/50 border-teal-900/20 text-white hover:bg-teal-900/20 transition-all duration-300"
              onClick={() => router.push("/dashboard/challenges")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-white">{challenge.title}</h1>
            <Badge
              variant="outline"
              className={`${getDifficultyColor(challenge.difficulty)} transition-all duration-300 hover:scale-105`}
            >
              {challenge.difficulty}
            </Badge>
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                className="bg-black/50 border-teal-900/20 text-white hover:bg-teal-900/20 hover:text-white transition-all duration-300"
                onClick={() => setShowEditChallengeDialog(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Challenge
              </Button>
            )}
          </div>
          <Badge
            variant="outline"
            className="bg-teal-900/20 text-teal-400 border-teal-900/50 transition-all duration-300 hover:scale-105"
          >
            {challenge.category}
          </Badge>
        </div>

        <div className="text-gray-400 bg-black/30 p-4 rounded-xl border border-teal-900/20 shadow-neomorphic-sm">
          {challenge.description}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-black/50 to-teal-900/20 border border-teal-900/20 rounded-lg p-4 shadow-neomorphic-sm transition-all duration-300 hover:shadow-teal-500/10 hover:scale-[1.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-900/20 rounded-full flex items-center justify-center">
                <span className="text-teal-400 font-bold text-sm">Pts</span>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Total Points</div>
                <div className="text-xl font-bold text-white">{challenge.points}</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-black/50 to-green-900/20 border border-teal-900/20 rounded-lg p-4 shadow-neomorphic-sm transition-all duration-300 hover:shadow-green-500/10 hover:scale-[1.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Solved By</div>
                <div className="text-xl font-bold text-white">{challenge.solved} teams</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Tasks</h2>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/50 border-teal-900/20 text-white hover:bg-teal-900/20 transition-all duration-300"
                  onClick={openCreateTaskDialog}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {challenge.tasks.map((task: any) => (
                <Card
                  key={task.id}
                  className={`bg-gradient-to-br from-black/50 to-teal-900/10 border-teal-900/20 shadow-neomorphic-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-teal-500/20 hover:scale-[1.02] relative z-10 ${selectedTask?.id === task.id ? "border-teal-500 shadow-teal-500/30" : ""}`}
                  onClick={() => handleTaskSelect(task)}
                >
                  <CardHeader className="py-3 relative z-20">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white flex items-center pointer-events-none">
                        {task.solved ? (
                          <Unlock className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 mr-2 text-gray-500" />
                        )}
                        {task.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-teal-900/20 text-teal-400 border-teal-900/50 pointer-events-none"
                        >
                          {task.points} pts
                        </Badge>
                        {isAdmin && (
                          <div className="flex gap-1 pointer-events-auto">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                openEditTaskDialog(task)
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteTask(task.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedTask ? (
              <Card className="bg-gradient-to-br from-black/50 to-teal-900/10 border-teal-900/20 shadow-neomorphic-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">{selectedTask.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        selectedTask.solved
                          ? "bg-green-900/20 text-green-400 border-green-900/50"
                          : "bg-teal-900/20 text-teal-400 border-teal-900/50"
                      }
                    >
                      {selectedTask.solved ? "Solved" : `${selectedTask.points} pts`}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{selectedTask.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-black/50 to-teal-900/10 rounded-lg border border-teal-900/50 transition-all duration-300 hover:shadow-teal-500/10">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Hints</h3>
                    <ul className="list-disc list-inside text-white space-y-2">
                      {selectedTask.hints.map((hint: string, index: number) => (
                        <li key={index}>{hint}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-black/50 to-teal-900/10 rounded-lg border border-teal-900/50 transition-all duration-300 hover:shadow-teal-500/10">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Files</h3>
                    <div className="space-y-2">
                      {selectedTask.files.map((file: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-teal-400" />
                            <span className="text-white">{file.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">{file.size}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!selectedTask.solved && (
                    <div className="p-4 bg-gradient-to-br from-black/50 to-teal-900/10 rounded-lg border border-teal-900/50 transition-all duration-300 hover:shadow-teal-500/10">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Submit Flag</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="flag{...}"
                          className="bg-black/50 border-gray-700 flex-1 text-white"
                          value={flagInput}
                          onChange={(e) => setFlagInput(e.target.value)}
                        />
                        <Button
                          className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 transition-all duration-300 hover:shadow-md hover:shadow-teal-500/20"
                          onClick={handleSubmitFlag}
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedTask.solved && (
                    <div className="p-4 bg-gradient-to-br from-black/50 to-green-900/20 rounded-lg border border-green-900/50 flex items-center gap-3 transition-all duration-300 hover:shadow-green-500/10">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400">You've successfully solved this task!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/50 border-teal-900/20 shadow-neomorphic-sm h-full flex items-center justify-center">
                <CardContent className="text-center p-8">
                  <div className="text-gray-400 mb-4">Select a task to view details</div>
                  <div className="text-sm text-gray-500">
                    Click on any task from the list on the left to view its details and submit your solution.
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Edit Challenge Dialog */}
        <Dialog open={showEditChallengeDialog} onOpenChange={setShowEditChallengeDialog}>
          <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <DialogTitle>Edit Challenge</DialogTitle>
              <DialogDescription className="text-gray-400">Update the challenge details.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditChallenge} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="challenge-title">Title *</Label>
                <Input
                  id="challenge-title"
                  className="bg-black/50 border-gray-700"
                  value={challengeFormData.title}
                  onChange={(e) => handleChallengeInputChange("title", e.target.value)}
                  disabled={editingChallenge}
                />
                {challengeFormErrors.title && <span className="text-red-400 text-xs">{challengeFormErrors.title}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="challenge-description">Description *</Label>
                <Textarea
                  id="challenge-description"
                  className="bg-black/50 border-gray-700"
                  value={challengeFormData.description}
                  onChange={(e) => handleChallengeInputChange("description", e.target.value)}
                  disabled={editingChallenge}
                />
                {challengeFormErrors.description && (
                  <span className="text-red-400 text-xs">{challengeFormErrors.description}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="challenge-category">Category *</Label>
                  <Select
                    value={challengeFormData.category}
                    onValueChange={(value) => handleChallengeInputChange("category", value)}
                    disabled={editingChallenge}
                  >
                    <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent className="bg-gray-900 border-[hsl(var(--border)/0.5)] text-white">
                      <SelectItem value="Web">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-400" />
                          <span>Web</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Crypto">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-yellow-400" />
                          <span>Crypto</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Forensics">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-green-400" />
                          <span>Forensics</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Pwn">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span>Pwn</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Reverse">
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4 text-purple-400" />
                          <span>Reverse</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Steganography">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-pink-400" />
                          <span>Steganography</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="OSINT">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-cyan-400" />
                          <span>OSINT</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Misc">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4 text-gray-400" />
                          <span>Misc</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Hardware">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span>Hardware</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Mobile">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-indigo-400" />
                          <span>Mobile</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Network">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-teal-400" />
                          <span>Network</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Blockchain">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-amber-400" />
                          <span>Blockchain</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="AI">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-violet-400" />
                          <span>AI</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {challengeFormErrors.category && (
                    <span className="text-red-400 text-xs">{challengeFormErrors.category}</span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="challenge-difficulty">Difficulty</Label>
                  <Select
                    value={challengeFormData.difficulty}
                    onValueChange={(value) => handleChallengeInputChange("difficulty", value)}
                    disabled={editingChallenge}
                  >
                    <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[hsl(var(--border)/0.5)] text-white">
                      <SelectItem value="Easy" className="text-green-400 focus:text-green-400 focus:bg-green-900/20">
                        Easy
                      </SelectItem>
                      <SelectItem
                        value="Medium"
                        className="text-yellow-400 focus:text-yellow-400 focus:bg-yellow-900/20"
                      >
                        Medium
                      </SelectItem>
                      <SelectItem value="Hard" className="text-red-400 focus:text-red-400 focus:bg-red-900/20">
                        Hard
                      </SelectItem>
                      <SelectItem
                        value="Insane"
                        className="text-purple-400 focus:text-purple-400 focus:bg-purple-900/20"
                      >
                        Insane
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditChallengeDialog(false)}
                  disabled={editingChallenge}
                  className="flex-1 bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editingChallenge}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                >
                  {editingChallenge ? "Updating..." : "Update Challenge"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={showEditTaskDialog} onOpenChange={setShowEditTaskDialog}>
          <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription className="text-gray-400">Update the task details.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditTask} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Title *</Label>
                <Input
                  id="task-title"
                  className="bg-black/50 border-gray-700"
                  value={taskFormData.title}
                  onChange={(e) => handleTaskInputChange("title", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.title && <span className="text-red-400 text-xs">{taskFormErrors.title}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="task-description">Description *</Label>
                <Textarea
                  id="task-description"
                  className="bg-black/50 border-gray-700"
                  value={taskFormData.description}
                  onChange={(e) => handleTaskInputChange("description", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.description && (
                  <span className="text-red-400 text-xs">{taskFormErrors.description}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="task-points">Points *</Label>
                <Input
                  id="task-points"
                  type="number"
                  className="bg-black/50 border-gray-700 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={taskFormData.points}
                  onChange={(e) => handleTaskInputChange("points", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.points && <span className="text-red-400 text-xs">{taskFormErrors.points}</span>}
              </div>

              <div className="grid gap-2">
                <Label>Hints</Label>
                {taskFormData.hints.map((hint, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Hint ${index + 1}`}
                      className="bg-black/50 border-gray-700 flex-1"
                      value={hint}
                      onChange={(e) => handleHintChange(index, e.target.value)}
                      disabled={editingTask}
                    />
                    {taskFormData.hints.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeHint(index)}
                        disabled={editingTask}
                        className="bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHint}
                  disabled={editingTask}
                  className="bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hint
                </Button>
              </div>

              <div className="grid gap-2">
                <Label>Files</Label>
                {taskFormData.files
                  ?.filter((file) => file.name.trim())
                  .map((file, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center p-3 bg-black/30 rounded-lg border border-gray-700"
                    >
                      <div className="flex-1 grid grid-cols-[2fr_auto_auto] gap-2">
                        <Input
                          placeholder="File name"
                          className="bg-black/50 border-0"
                          value={file.name || ""}
                          onChange={(e) => handleFileChange(index, "name", e.target.value)}
                          disabled={editingTask}
                        />
                        <div className="bg-black/50 rounded-md px-2 py-2 text-xs font-medium w-fit min-w-[60px] flex items-center justify-center">
                          <span
                            className={`uppercase ${getFileTypeColor(file.name ? file.name.split(".").pop()?.toLowerCase() || "unknown" : "unknown")}`}
                          >
                            {file.name ? file.name.split(".").pop()?.toLowerCase() || "UNKNOWN" : "TYPE"}
                          </span>
                        </div>
                        <div className="bg-black/50 rounded-md px-2 py-2 text-sm text-gray-400 w-fit min-w-[60px] text-center">
                          {file.size || "Size"}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFile(index)}
                          disabled={editingTask}
                          className="bg-red-900/50 border-red-700 text-red-300 hover:bg-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="import-file-input"
                    onChange={(e) => {
                      const uploadedFile = e.target.files?.[0]
                      if (uploadedFile) {
                        // Add new file to the list
                        const newFile = {
                          name: uploadedFile.name,
                          size: formatFileSize(uploadedFile.size),
                          type: getFileType(uploadedFile.name),
                        }
                        setTaskFormData((prev) => ({
                          ...prev,
                          files: [...(prev.files || []), newFile],
                        }))
                      }
                    }}
                    disabled={editingTask}
                  />
                  <label
                    htmlFor="import-file-input"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800 cursor-pointer"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Import File
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditTaskDialog(false)}
                  disabled={editingTask}
                  className="flex-1 bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editingTask}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                >
                  {editingTask ? "Updating..." : "Update Task"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Task Dialog */}
        <Dialog open={showCreateTaskDialog} onOpenChange={setShowCreateTaskDialog}>
          <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-[hsl(var(--border)/0.5)]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription className="text-gray-400">Add a new task to this challenge.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditTask} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-task-title">Title *</Label>
                <Input
                  id="new-task-title"
                  className="bg-black/50 border-gray-700"
                  value={taskFormData.title}
                  onChange={(e) => handleTaskInputChange("title", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.title && <span className="text-red-400 text-xs">{taskFormErrors.title}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-task-description">Description *</Label>
                <Textarea
                  id="new-task-description"
                  className="bg-black/50 border-gray-700"
                  value={taskFormData.description}
                  onChange={(e) => handleTaskInputChange("description", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.description && (
                  <span className="text-red-400 text-xs">{taskFormErrors.description}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-task-points">Points *</Label>
                <Input
                  id="new-task-points"
                  type="number"
                  className="bg-black/50 border-gray-700 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  value={taskFormData.points}
                  onChange={(e) => handleTaskInputChange("points", e.target.value)}
                  disabled={editingTask}
                />
                {taskFormErrors.points && <span className="text-red-400 text-xs">{taskFormErrors.points}</span>}
              </div>

              <div className="grid gap-2">
                <Label>Hints</Label>
                {taskFormData.hints.map((hint, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Hint ${index + 1}`}
                      className="bg-black/50 border-gray-700 flex-1"
                      value={hint}
                      onChange={(e) => handleHintChange(index, e.target.value)}
                      disabled={editingTask}
                    />
                    {taskFormData.hints.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeHint(index)}
                        disabled={editingTask}
                        className="bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHint}
                  disabled={editingTask}
                  className="bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hint
                </Button>
              </div>

              <div className="grid gap-2">
                <Label>Files</Label>
                {taskFormData.files
                  ?.filter((file) => file.name.trim())
                  .map((file, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center p-3 bg-black/30 rounded-lg border border-gray-700"
                    >
                      <div className="flex-1 grid grid-cols-[2fr_auto_auto] gap-2">
                        <Input
                          placeholder="File name"
                          className="bg-black/50 border-0"
                          value={file.name || ""}
                          onChange={(e) => handleFileChange(index, "name", e.target.value)}
                          disabled={editingTask}
                        />
                        <div className="bg-black/50 rounded-md px-2 py-2 text-xs font-medium w-fit min-w-[60px] flex items-center justify-center">
                          <span
                            className={`uppercase ${getFileTypeColor(file.name ? file.name.split(".").pop()?.toLowerCase() || "unknown" : "unknown")}`}
                          >
                            {file.name ? file.name.split(".").pop()?.toLowerCase() || "UNKNOWN" : "TYPE"}
                          </span>
                        </div>
                        <div className="bg-black/50 rounded-md px-2 py-2 text-sm text-gray-400 w-fit min-w-[60px] text-center">
                          {file.size || "Size"}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFile(index)}
                          disabled={editingTask}
                          className="bg-red-900/50 border-red-700 text-red-300 hover:bg-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="import-file-input"
                    onChange={(e) => {
                      const uploadedFile = e.target.files?.[0]
                      if (uploadedFile) {
                        // Add new file to the list
                        const newFile = {
                          name: uploadedFile.name,
                          size: formatFileSize(uploadedFile.size),
                          type: getFileType(uploadedFile.name),
                        }
                        setTaskFormData((prev) => ({
                          ...prev,
                          files: [...(prev.files || []), newFile],
                        }))
                      }
                    }}
                    disabled={editingTask}
                  />
                  <label
                    htmlFor="import-file-input"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800 cursor-pointer"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Import File
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateTaskDialog(false)}
                  disabled={editingTask}
                  className="flex-1 bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editingTask}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]"
                >
                  {editingTask ? "Creating..." : "Create Task"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Submission Result Dialog */}
        <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 text-white border-teal-900/50">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {submissionResult?.success ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-400" />
                    <span>Incorrect</span>
                  </>
                )}
              </DialogTitle>
              <DialogDescription className={submissionResult?.success ? "text-green-400" : "text-red-400"}>
                {submissionResult?.message}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {submissionResult?.success && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">+{selectedTask?.points} points</div>
                  <div className="text-gray-400">Keep up the good work!</div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
