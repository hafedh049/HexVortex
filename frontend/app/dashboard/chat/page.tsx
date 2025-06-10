"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  ImageIcon,
  Paperclip,
  X,
  Smile,
  Terminal,
  FileIcon,
  Download,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  FileCode,
  FileArchive,
  FileAudio,
  FileVideo,
  File,
  Mic,
} from "lucide-react"

// Extended message type with reactions
interface Reaction {
  emoji: string
  users: string[]
  count: number
}

interface Message {
  id: number
  sender: string
  username: string
  content: string
  timestamp: string
  avatar: string
  mediaUrl?: string
  mediaType?: "image" | "video" | "audio" | undefined
  fileType?: string
  fileSize?: number
  reactions?: Reaction[]
}

// Available emoji reactions
const availableEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥", "👏"]

// Sample chat data
const initialMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    username: "johndoe",
    content: "Hey team, I think I found a clue for the web challenge.",
    timestamp: "10:15 AM",
    avatar: "",
    reactions: [
      { emoji: "👍", users: ["janesmith", "alexj"], count: 2 },
      { emoji: "🔥", users: ["janesmith"], count: 1 },
    ],
  },
  {
    id: 2,
    sender: "Jane Smith",
    username: "janesmith",
    content: "What did you find?",
    timestamp: "10:17 AM",
    avatar: "",
  },
  {
    id: 3,
    sender: "John Doe",
    username: "johndoe",
    content: "If you look at the source code, there's a hidden comment with what looks like a base64 encoded string.",
    timestamp: "10:20 AM",
    avatar: "",
    reactions: [{ emoji: "😮", users: ["janesmith", "alexj"], count: 2 }],
  },
  {
    id: 4,
    sender: "Alex Johnson",
    username: "alexj",
    content: "Good catch! Let me try to decode it.",
    timestamp: "10:22 AM",
    avatar: "",
  },
  {
    id: 5,
    sender: "Alex Johnson",
    username: "alexj",
    content: "It decodes to 'check_the_robots_file'. Let's see what's in robots.txt",
    timestamp: "10:25 AM",
    avatar: "",
    reactions: [{ emoji: "👏", users: ["johndoe", "janesmith"], count: 2 }],
  },
  {
    id: 6,
    sender: "Jane Smith",
    username: "janesmith",
    content: "I'm on it. Checking robots.txt now.",
    timestamp: "10:26 AM",
    avatar: "",
  },
]

// Maximum file size (70MB in bytes)
const MAX_FILE_SIZE = 70 * 1024 * 1024

// Function to get file type from file name
const getFileType = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase() || ""

  // Map extensions to file types
  const extensionMap: Record<string, string> = {
    // Documents
    pdf: "pdf",
    doc: "document",
    docx: "document",
    txt: "text",
    rtf: "text",
    md: "text",

    // Spreadsheets
    xls: "spreadsheet",
    xlsx: "spreadsheet",
    csv: "spreadsheet",

    // Code
    js: "code",
    ts: "code",
    jsx: "code",
    tsx: "code",
    html: "code",
    css: "code",
    py: "code",
    java: "code",
    c: "code",
    cpp: "code",
    php: "code",
    rb: "code",
    go: "code",
    json: "code",

    // Archives
    zip: "archive",
    rar: "archive",
    "7z": "archive",
    tar: "archive",
    gz: "archive",

    // Media
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    mp4: "video",
    avi: "video",
    mov: "video",
    webm: "video",
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    svg: "image",
    webp: "image",
  }

  return extensionMap[extension] || "generic"
}

// Function to get icon based on file type
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return <FilePdf className="h-8 w-8 text-white" />
    case "document":
      return <FileText className="h-8 w-8 text-white" />
    case "text":
      return <FileText className="h-8 w-8 text-white" />
    case "spreadsheet":
      return <FileSpreadsheet className="h-8 w-8 text-white" />
    case "code":
      return <FileCode className="h-8 w-8 text-white" />
    case "archive":
      return <FileArchive className="h-8 w-8 text-white" />
    case "audio":
      return <FileAudio className="h-8 w-8 text-white" />
    case "video":
      return <FileVideo className="h-8 w-8 text-white" />
    case "image":
      return <ImageIcon className="h-8 w-8 text-white" />
    default:
      return <File className="h-8 w-8 text-white" />
  }
}

// Function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingFile, setUploadingFile] = useState(false)

  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const recordingDurationRef = useRef<number>(0)

  // Format recording time to MM:SS
  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Reset recording state
      audioChunksRef.current = []
      recordingDurationRef.current = 0
      setRecordingTime(0)

      // Create media recorder
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      // Set up event handlers
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      recorder.onstop = () => {
        // Get final duration from ref
        const finalDuration = recordingDurationRef.current

        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(audioBlob)

        // Create message with audio
        const message: Message = {
          id: messages.length + 1,
          sender: "John Doe",
          username: "johndoe",
          content: `Voice message (${formatRecordingTime(finalDuration)})`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          avatar: "",
          mediaUrl: audioUrl,
          mediaType: "audio",
          fileType: "audio",
          fileSize: audioBlob.size,
        }

        // Add message to chat
        setMessages((prev) => [...prev, message])

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      // Start recording
      recorder.start()
      setIsRecording(true)

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        recordingDurationRef.current += 1
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clear timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
        recordingTimerRef.current = null
      }
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      messages.forEach((message) => {
        if (message.mediaUrl && message.mediaUrl.startsWith("blob:")) {
          URL.revokeObjectURL(message.mediaUrl)
        }
      })
    }
  }, [])

  // Close lightbox on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null)
        setShowEmojiPicker(null)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".emoji-picker") && !target.closest(".emoji-button")) {
        setShowEmojiPicker(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: "John Doe", // Current user
      username: "johndoe",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleImageUpload = () => {
    imageInputRef.current?.click()
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if file size exceeds the maximum allowed size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File is too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`)
      // Reset the input
      event.target.value = ""
      return
    }

    setUploadingFile(true)

    try {
      // Create a blob URL for the file
      const mediaUrl = URL.createObjectURL(file)

      // Determine file type
      let mediaType: "image" | "video" | undefined
      let fileType = "generic"

      if (file.type.startsWith("image/")) {
        mediaType = "image"
        fileType = "image"
      } else if (file.type.startsWith("video/")) {
        mediaType = "video"
        fileType = "video"
      } else {
        mediaType = undefined // For other file types
        fileType = getFileType(file.name)
      }

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const message: Message = {
        id: messages.length + 1,
        sender: "John Doe",
        username: "johndoe",
        content: `Shared ${mediaType || fileType} file: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "",
        mediaUrl,
        mediaType,
        fileType,
        fileSize: file.size,
      }

      setMessages([...messages, message])
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploadingFile(false)
      // Reset the input
      event.target.value = ""
    }
  }

  const handlePaperclipClick = () => {
    // Trigger the file upload
    handleFileUpload()
  }

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const addReaction = (messageId: number, emoji: string) => {
    const currentUser = "johndoe" // Current user

    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === messageId) {
          const reactions = message.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            // If user already reacted with this emoji, remove their reaction
            if (existingReaction.users.includes(currentUser)) {
              const updatedUsers = existingReaction.users.filter((user) => user !== currentUser)
              if (updatedUsers.length === 0) {
                // Remove the reaction entirely if no users left
                return {
                  ...message,
                  reactions: reactions.filter((r) => r.emoji !== emoji),
                }
              } else {
                // Update the reaction with fewer users
                return {
                  ...message,
                  reactions: reactions.map((r) =>
                    r.emoji === emoji ? { ...r, users: updatedUsers, count: updatedUsers.length } : r,
                  ),
                }
              }
            } else {
              // Add user to existing reaction
              const updatedUsers = [...existingReaction.users, currentUser]
              return {
                ...message,
                reactions: reactions.map((r) =>
                  r.emoji === emoji ? { ...r, users: updatedUsers, count: updatedUsers.length } : r,
                ),
              }
            }
          } else {
            // Add new reaction
            return {
              ...message,
              reactions: [...reactions, { emoji, users: [currentUser], count: 1 }],
            }
          }
        }
        return message
      }),
    )

    setShowEmojiPicker(null)
  }

  const toggleEmojiPicker = (messageId: number) => {
    setShowEmojiPicker(showEmojiPicker === messageId ? null : messageId)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Initial scroll to bottom
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Messages</h1>
      </div>

      <Card className="bg-black/50 border-teal-900/50 backdrop-blur-sm h-[calc(100vh-12rem)]">
        <CardHeader className="border-b border-teal-900/20 p-4">
          <CardTitle className="text-white">ByteBusters</CardTitle>
          <CardDescription className="text-gray-400">Collaborate with your team members in real-time</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
          <ScrollArea className="flex-1 p-4 [&>[data-radix-scroll-area-viewport]]:scrollbar-none" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.username === "johndoe" ? "justify-end" : ""} group relative`}
                >
                  {/* Reaction Button - For others' messages (left side) */}
                  {message.username !== "johndoe" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="emoji-button opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0 rounded-full self-end mb-2 mr-1"
                      onClick={() => toggleEmojiPicker(message.id)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  )}

                  {message.username !== "johndoe" && (
                    <Avatar>
                      {/* Update AvatarImage logic here */}
                      <AvatarImage src={message.avatar && message.avatar.trim() ? message.avatar : undefined} />
                      {/* Update AvatarFallback to always show the Terminal icon */}
                      <AvatarFallback className="bg-teal-900/50 text-white">
                        <Terminal className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] ${message.username === "johndoe" ? "order-first" : "order-last"} relative`}
                  >
                    <div className="flex items-center gap-2">
                      {message.username !== "johndoe" && <div className="font-medium text-white">{message.sender}</div>}
                      <div className="text-xs text-gray-400">{message.timestamp}</div>
                    </div>
                    {message.mediaType === "image" ? (
                      <img
                        src={message.mediaUrl || "/placeholder.svg"}
                        alt="Shared image"
                        className="mt-1 rounded-lg max-w-xs w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(message.mediaUrl!)}
                      />
                    ) : message.mediaType === "video" ? (
                      <video controls className="mt-1 rounded-lg max-w-xs w-full h-auto" src={message.mediaUrl}>
                        Your browser does not support the video tag.
                      </video>
                    ) : message.mediaType === "audio" ? (
                      <div className="bg-black/50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <button
                            className="flex-shrink-0 w-10 h-10 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center transition-colors"
                            onClick={(e) => {
                              e.preventDefault()
                              const audio = e.currentTarget.parentElement?.parentElement?.querySelector(
                                "audio",
                              ) as HTMLAudioElement
                              if (audio) {
                                if (audio.paused) {
                                  audio.play()
                                  // Update button icon to pause
                                  const icon = e.currentTarget.querySelector("svg")
                                  if (icon) {
                                    icon.innerHTML =
                                      '<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v6a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v6a1 1 0 11-2 0V7z" clipRule="evenodd" />'
                                  }
                                } else {
                                  audio.pause()
                                  // Update button icon to play
                                  const icon = e.currentTarget.querySelector("svg")
                                  if (icon) {
                                    icon.innerHTML =
                                      '<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />'
                                  }
                                }
                              }
                            }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            className="flex-shrink-0 w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                            onClick={(e) => {
                              e.preventDefault()
                              const audio = e.currentTarget.parentElement?.parentElement?.querySelector(
                                "audio",
                              ) as HTMLAudioElement
                              if (audio) {
                                audio.pause()
                                audio.currentTime = 0
                                // Reset play button icon
                                const playButton = e.currentTarget.parentElement?.querySelector("button:first-child")
                                const icon = playButton?.querySelector("svg")
                                if (icon) {
                                  icon.innerHTML =
                                    '<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />'
                                }
                              }
                            }}
                          >
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <div className="flex-1 flex items-center gap-1 h-8">
                            {/* Wave visualization */}
                            {Array.from({ length: 20 }).map((_, i) => (
                              <div
                                key={i}
                                className="bg-teal-500/30 rounded-full animate-pulse"
                                style={{
                                  width: "3px",
                                  height: `${Math.random() * 20 + 8}px`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: `${1 + Math.random()}s`,
                                }}
                              />
                            ))}
                          </div>
                          <div className="bg-black/40 border border-teal-900/30 rounded-full px-3 py-1 text-xs text-teal-300 font-mono backdrop-blur-sm shadow-sm time-display">
                            0:00 / 0:00
                          </div>
                        </div>
                        <audio
                          className="hidden"
                          src={message.mediaUrl}
                          onLoadedMetadata={(e) => {
                            const audio = e.currentTarget
                            const duration = audio.duration
                            const timeDisplay = audio.parentElement?.querySelector(".time-display")
                            if (timeDisplay && duration && isFinite(duration)) {
                              const totalMins = Math.floor(duration / 60)
                              const totalSecs = Math.floor(duration % 60)
                              timeDisplay.textContent = `0:00 / ${totalMins}:${totalSecs.toString().padStart(2, "0")}`
                            }
                          }}
                          onTimeUpdate={(e) => {
                            const audio = e.currentTarget
                            const currentTime = audio.currentTime
                            const duration = audio.duration
                            const timeDisplay = audio.parentElement?.querySelector(".time-display")
                            if (timeDisplay && duration && isFinite(duration) && isFinite(currentTime)) {
                              const currentMins = Math.floor(currentTime / 60)
                              const currentSecs = Math.floor(currentTime % 60)
                              const totalMins = Math.floor(duration / 60)
                              const totalSecs = Math.floor(duration % 60)
                              timeDisplay.textContent = `${currentMins}:${currentSecs.toString().padStart(2, "0")} / ${totalMins}:${totalSecs.toString().padStart(2, "0")}`
                            }
                          }}
                          onEnded={(e) => {
                            // Reset play button icon when audio ends
                            const playButton = e.currentTarget.parentElement?.querySelector("button:first-child")
                            const icon = playButton?.querySelector("svg")
                            if (icon) {
                              icon.innerHTML =
                                '<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />'
                            }
                          }}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : message.mediaUrl ? (
                      // File preview for other files
                      <div
                        className="mt-1 bg-black/30 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-black/40 transition-colors"
                        onClick={() => {
                          // Create a temporary anchor element to trigger download
                          const a = document.createElement("a")
                          a.href = message.mediaUrl!
                          a.download = message.content.replace(/Shared .* file: /, "")
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                        }}
                      >
                        <div className="bg-teal-900/50 p-2 rounded-lg">
                          {message.fileType ? (
                            getFileIcon(message.fileType)
                          ) : (
                            <FileIcon className="h-8 w-8 text-white" />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium text-white truncate">
                            {message.content.replace(/Shared .* file: /, "")}
                          </p>
                          <div className="flex flex-col gap-1 text-xs text-gray-400">
                            {message.fileSize && <span>{formatFileSize(message.fileSize)}</span>}
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" /> Click to download
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p
                        className={`mt-1 py-2 px-3 rounded-lg ${
                          message.username === "johndoe"
                            ? "bg-teal-900/30 text-white ml-auto"
                            : "bg-gray-900/50 text-white"
                        }`}
                      >
                        {message.content}
                      </p>
                    )}

                    {/* Reactions Display */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {message.reactions.map((reaction) => (
                          <button
                            key={reaction.emoji}
                            className="bg-black/50 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1"
                          >
                            {reaction.emoji} {reaction.count}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Emoji Picker */}
                    {showEmojiPicker === message.id && (
                      <div
                        className={`emoji-picker absolute z-10 mt-2 p-2 bg-black/90 border border-teal-900/50 rounded-lg backdrop-blur-sm ${
                          message.username === "johndoe" ? "right-0" : "left-0"
                        }`}
                      >
                        <div className="grid grid-cols-4 gap-1">
                          {availableEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => addReaction(message.id, emoji)}
                              className="p-2 hover:bg-teal-900/30 rounded transition-colors text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reaction Button - For your messages (right side) */}
                  {message.username === "johndoe" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="emoji-button opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0 rounded-full self-end mb-2 ml-1"
                      onClick={() => toggleEmojiPicker(message.id)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  )}

                  {message.username === "johndoe" && (
                    <Avatar>
                      <AvatarImage src={message.avatar && message.avatar.trim() ? message.avatar : undefined} />
                      <AvatarFallback className="bg-teal-900/50 text-white">
                        <Terminal className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {/* Empty div at the end to scroll to */}
              <div ref={endOfMessagesRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-teal-900/20 p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2 items-center">
            <div className="flex gap-2 bg-black/40 border border-teal-900/30 rounded-lg px-2 py-1 backdrop-blur-sm shadow-sm shadow-teal-900/10 h-10 items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={handleImageUpload}
                disabled={uploadingFile}
              >
                <ImageIcon className="h-5 w-5" />
                <span className="sr-only">Attach image</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={handlePaperclipClick}
                disabled={uploadingFile}
              >
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`${isRecording ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-white"}`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={uploadingFile}
              >
                <Mic className="h-5 w-5" />
                <span className="sr-only">{isRecording ? "Stop recording" : "Record voice message"}</span>
              </Button>
            </div>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-black/50 border-gray-700"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
              disabled={uploadingFile || !newMessage.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          {/* Hidden file inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "image")}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="*/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "file")}
          />
        </CardFooter>
      </Card>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <img
              src={lightboxImage || "/placeholder.svg"}
              alt="Full size image"
              className="max-h-[90vh] max-w-full object-contain mx-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
