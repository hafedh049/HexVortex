"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import {
  Activity,
  Shield,
  Settings,
  Users,
  Flag,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Globe,
  FileDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample logs data - Extended for pagination demo
const logsData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    type: "security",
    level: "warning",
    message: "Multiple failed login attempts detected",
    user: "user@example.com",
    ip: "192.168.1.100",
    details: "5 failed attempts in 2 minutes",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:30:42",
    type: "system",
    level: "info",
    message: "Challenge container deployed successfully",
    user: "admin",
    ip: "10.0.0.1",
    details: "Container ID: web-exploit-101",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:28:33",
    type: "user",
    level: "info",
    message: "New team registration",
    user: "team-leader@hackteam.com",
    ip: "203.0.113.45",
    details: "Team: CyberWarriors, Members: 4",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:25:18",
    type: "challenge",
    level: "success",
    message: "Challenge solved",
    user: "player@team.com",
    ip: "198.51.100.23",
    details: "Challenge: Web Exploitation 101, Points: 100",
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:22:07",
    type: "security",
    level: "error",
    message: "Suspicious file upload attempt blocked",
    user: "attacker@malicious.com",
    ip: "203.0.113.666",
    details: "File type: .exe, Size: 2.5MB",
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:20:55",
    type: "system",
    level: "warning",
    message: "High CPU usage detected",
    user: "system",
    ip: "localhost",
    details: "CPU usage: 85% for 5 minutes",
  },
  {
    id: 7,
    timestamp: "2024-01-15 14:18:12",
    type: "admin",
    level: "info",
    message: "Challenge configuration updated",
    user: "admin@ctf.com",
    ip: "10.0.0.1",
    details: "Challenge: Crypto Master, Points: 150 -> 200",
  },
  {
    id: 8,
    timestamp: "2024-01-15 14:15:33",
    type: "user",
    level: "info",
    message: "Password reset requested",
    user: "user@example.com",
    ip: "192.168.1.50",
    details: "Reset token sent to email",
  },
  {
    id: 9,
    timestamp: "2024-01-15 14:12:45",
    type: "security",
    level: "error",
    message: "SQL injection attempt detected",
    user: "anonymous",
    ip: "203.0.113.999",
    details: "Payload: ' OR 1=1 --",
  },
  {
    id: 10,
    timestamp: "2024-01-15 14:10:22",
    type: "challenge",
    level: "info",
    message: "New challenge published",
    user: "admin@ctf.com",
    ip: "10.0.0.1",
    details: "Challenge: Advanced Cryptography, Category: Crypto",
  },
  // Additional logs for pagination demo
  {
    id: 11,
    timestamp: "2024-01-15 14:08:15",
    type: "security",
    level: "warning",
    message: "Brute force attack detected",
    user: "attacker@evil.com",
    ip: "192.168.1.200",
    details: "100 failed attempts in 1 minute",
  },
  {
    id: 12,
    timestamp: "2024-01-15 14:06:42",
    type: "system",
    level: "info",
    message: "Database backup completed",
    user: "system",
    ip: "10.0.0.1",
    details: "Backup size: 2.5GB",
  },
  {
    id: 13,
    timestamp: "2024-01-15 14:04:33",
    type: "user",
    level: "info",
    message: "User profile updated",
    user: "user2@example.com",
    ip: "203.0.113.50",
    details: "Profile picture changed",
  },
  {
    id: 14,
    timestamp: "2024-01-15 14:02:18",
    type: "challenge",
    level: "success",
    message: "Challenge solved",
    user: "hacker@team.com",
    ip: "198.51.100.30",
    details: "Challenge: Binary Exploitation, Points: 200",
  },
  {
    id: 15,
    timestamp: "2024-01-15 14:00:07",
    type: "security",
    level: "error",
    message: "XSS attempt blocked",
    user: "malicious@user.com",
    ip: "203.0.113.777",
    details: "Payload: <script>alert('xss')</script>",
  },
  {
    id: 16,
    timestamp: "2024-01-15 13:58:55",
    type: "system",
    level: "info",
    message: "Server restart completed",
    user: "admin",
    ip: "10.0.0.1",
    details: "Downtime: 30 seconds",
  },
  {
    id: 17,
    timestamp: "2024-01-15 13:56:12",
    type: "admin",
    level: "warning",
    message: "Disk space low",
    user: "system",
    ip: "localhost",
    details: "Only 5% space remaining",
  },
  {
    id: 18,
    timestamp: "2024-01-15 13:54:33",
    type: "user",
    level: "info",
    message: "New user registration",
    user: "newbie@ctf.com",
    ip: "192.168.1.75",
    details: "Email verification pending",
  },
  {
    id: 19,
    timestamp: "2024-01-15 13:52:45",
    type: "security",
    level: "error",
    message: "CSRF attack detected",
    user: "attacker@bad.com",
    ip: "203.0.113.888",
    details: "Invalid token submitted",
  },
  {
    id: 20,
    timestamp: "2024-01-15 13:50:22",
    type: "challenge",
    level: "info",
    message: "Challenge hint requested",
    user: "student@university.edu",
    ip: "10.0.0.50",
    details: "Challenge: Reverse Engineering 101",
  },
  {
    id: 21,
    timestamp: "2024-01-15 13:48:15",
    type: "security",
    level: "warning",
    message: "Suspicious user agent detected",
    user: "bot@crawler.com",
    ip: "192.168.1.300",
    details: "User-Agent: SQLMap/1.0",
  },
  {
    id: 22,
    timestamp: "2024-01-15 13:46:42",
    type: "system",
    level: "success",
    message: "SSL certificate renewed",
    user: "admin",
    ip: "10.0.0.1",
    details: "Valid until: 2025-01-15",
  },
  {
    id: 23,
    timestamp: "2024-01-15 13:44:33",
    type: "user",
    level: "info",
    message: "Team invitation sent",
    user: "captain@team.com",
    ip: "203.0.113.60",
    details: "Invited: rookie@newbie.com",
  },
  {
    id: 24,
    timestamp: "2024-01-15 13:42:18",
    type: "challenge",
    level: "success",
    message: "First blood achieved",
    user: "speedster@fast.com",
    ip: "198.51.100.40",
    details: "Challenge: Web Exploitation Advanced, Bonus: 50 points",
  },
  {
    id: 25,
    timestamp: "2024-01-15 13:40:07",
    type: "security",
    level: "error",
    message: "Directory traversal attempt",
    user: "hacker@evil.org",
    ip: "203.0.113.999",
    details: "Path: ../../../../etc/passwd",
  },
]

export default function SystemLogsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const [logFilter, setLogFilter] = useState("all")
  const [logSearch, setLogSearch] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(5)

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">You need admin privileges to view system logs.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleFilterChange = (newFilter: string) => {
    setLogFilter(newFilter)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogSearch(e.target.value)
    setCurrentPage(1)
  }

  const filteredLogs = logsData.filter((log) => {
    const matchesFilter = logFilter === "all" || log.type === logFilter
    const matchesSearch =
      logSearch === "" ||
      log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.user.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(logSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)
  const startIndex = (currentPage - 1) * logsPerPage
  const endIndex = startIndex + logsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

  const getLogIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "challenge":
        return <Flag className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400 bg-red-900/20 border-red-900/50"
      case "warning":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-900/50"
      case "success":
        return "text-green-400 bg-green-900/20 border-green-900/50"
      case "info":
        return "text-blue-400 bg-blue-900/20 border-blue-900/50"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-900/50"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleExport = (format: "json" | "csv" | "html" | "pdf") => {
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `system-logs-${timestamp}`

    switch (format) {
      case "json":
        const jsonData = JSON.stringify(filteredLogs, null, 2)
        downloadFile(jsonData, `${filename}.json`, "application/json")
        break

      case "csv":
        const csvHeaders = ["ID", "Timestamp", "Type", "Level", "Message", "User", "IP", "Details"]
        const csvRows = filteredLogs.map((log) => [
          log.id,
          log.timestamp,
          log.type,
          log.level,
          `"${log.message.replace(/"/g, '""')}"`,
          log.user,
          log.ip,
          `"${log.details.replace(/"/g, '""')}"`,
        ])
        const csvContent = [csvHeaders.join(","), ...csvRows.map((row) => row.join(","))].join("\n")
        downloadFile(csvContent, `${filename}.csv`, "text/csv")
        break

      case "html":
        const htmlContent = generateFancyHTML(filteredLogs)
        downloadFile(htmlContent, `${filename}.html`, "text/html")
        break

      case "pdf":
        generatePDF(filteredLogs, filename)
        break
    }
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateFancyHTML = (logs: typeof filteredLogs) => {
    const getLogLevelClass = (level: string) => {
      switch (level) {
        case "error":
          return "bg-red-100 text-red-800 border-red-200"
        case "warning":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "success":
          return "bg-green-100 text-green-800 border-green-200"
        case "info":
          return "bg-blue-100 text-blue-800 border-blue-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }

    const getTypeIcon = (type: string) => {
      switch (type) {
        case "security":
          return "🛡️"
        case "system":
          return "⚙️"
        case "user":
          return "👤"
        case "challenge":
          return "🏁"
        case "admin":
          return "👑"
        default:
          return "📊"
      }
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Logs Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5em; font-weight: 300; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1.1em; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 30px; background: #f8f9fa; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2em; font-weight: bold; color: #2a5298; }
        .stat-label { color: #666; margin-top: 5px; }
        .logs-container { padding: 30px; }
        .log-entry { background: white; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .log-header { padding: 15px 20px; background: #f8f9fa; border-bottom: 1px solid #e9ecef; display: flex; align-items: center; justify-content: space-between; }
        .log-meta { display: flex; align-items: center; gap: 15px; }
        .log-icon { font-size: 1.2em; }
        .log-level { padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; border: 1px solid; }
        .log-type { background: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; }
        .log-content { padding: 20px; }
        .log-message { font-weight: 600; margin-bottom: 15px; color: #333; }
        .log-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
        .log-detail { }
        .log-detail-label { font-weight: 600; color: #666; font-size: 0.9em; }
        .log-detail-value { color: #333; font-family: monospace; }
        .log-description { background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #2a5298; }
        .footer { background: #2a5298; color: white; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 System Logs Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${logs.length}</div>
                <div class="stat-label">Total Logs</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${logs.filter((log) => log.type === "security").length}</div>
                <div class="stat-label">Security Events</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${logs.filter((log) => log.level === "error").length}</div>
                <div class="stat-label">Errors</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${logs.filter((log) => log.level === "warning").length}</div>
                <div class="stat-label">Warnings</div>
            </div>
        </div>

        <div class="logs-container">
            ${logs
              .map(
                (log) => `
                <div class="log-entry">
                    <div class="log-header">
                        <div class="log-meta">
                            <span class="log-icon">${getTypeIcon(log.type)}</span>
                            <span class="log-level ${getLogLevelClass(log.level)}">${log.level.toUpperCase()}</span>
                            <span class="log-type">${log.type.toUpperCase()}</span>
                        </div>
                        <div style="color: #666; font-size: 0.9em;">#${log.id}</div>
                    </div>
                    <div class="log-content">
                        <div class="log-message">${log.message}</div>
                        <div class="log-details">
                            <div class="log-detail">
                                <div class="log-detail-label">Timestamp</div>
                                <div class="log-detail-value">${log.timestamp}</div>
                            </div>
                            <div class="log-detail">
                                <div class="log-detail-label">User</div>
                                <div class="log-detail-value">${log.user}</div>
                            </div>
                            <div class="log-detail">
                                <div class="log-detail-label">IP Address</div>
                                <div class="log-detail-value">${log.ip}</div>
                            </div>
                        </div>
                        <div class="log-description">
                            <strong>Details:</strong> ${log.details}
                        </div>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>

        <div class="footer">
            <p>System Logs Report • CTF Platform • ${logs.length} entries exported</p>
        </div>
    </div>
</body>
</html>`
  }

  const generatePDF = async (logs: typeof filteredLogs, filename: string) => {
    // Create a fancy HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 3px solid #2a5298; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2a5298; margin: 0; font-size: 28px; }
        .header p { color: #666; margin: 10px 0 0 0; }
        .stats { display: flex; justify-content: space-around; margin-bottom: 30px; }
        .stat { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .stat-number { font-size: 24px; font-weight: bold; color: #2a5298; }
        .stat-label { color: #666; font-size: 12px; }
        .log-entry { border: 1px solid #ddd; border-radius: 6px; margin-bottom: 15px; page-break-inside: avoid; }
        .log-header { background: #f8f9fa; padding: 10px 15px; border-bottom: 1px solid #ddd; }
        .log-meta { display: flex; align-items: center; gap: 10px; }
        .log-level { padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; }
        .log-level.error { background: #fee; color: #c53030; }
        .log-level.warning { background: #fffbeb; color: #d69e2e; }
        .log-level.success { background: #f0fff4; color: #38a169; }
        .log-level.info { background: #ebf8ff; color: #3182ce; }
        .log-content { padding: 15px; }
        .log-message { font-weight: 600; margin-bottom: 10px; }
        .log-details { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 12px; }
        .log-detail-label { font-weight: 600; color: #666; }
        .log-description { background: #f8f9fa; padding: 10px; border-radius: 4px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 System Logs Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        <p>Total Entries: ${logs.length}</p>
    </div>
    
    <div class="stats">
        <div class="stat">
            <div class="stat-number">${logs.length}</div>
            <div class="stat-label">Total Logs</div>
        </div>
        <div class="stat">
            <div class="stat-number">${logs.filter((log) => log.type === "security").length}</div>
            <div class="stat-label">Security Events</div>
        </div>
        <div class="stat">
            <div class="stat-number">${logs.filter((log) => log.level === "error").length}</div>
            <div class="stat-label">Errors</div>
        </div>
        <div class="stat">
            <div class="stat-number">${logs.filter((log) => log.level === "warning").length}</div>
            <div class="stat-label">Warnings</div>
        </div>
    </div>

    ${logs
      .map(
        (log) => `
        <div class="log-entry">
            <div class="log-header">
                <div class="log-meta">
                    <span class="log-level ${log.level}">${log.level.toUpperCase()}</span>
                    <span style="background: #6c757d; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px;">${log.type.toUpperCase()}</span>
                    <span style="color: #666; font-size: 12px;">#${log.id}</span>
                </div>
            </div>
            <div class="log-content">
                <div class="log-message">${log.message}</div>
                <div class="log-details">
                    <div>
                        <div class="log-detail-label">Timestamp:</div>
                        <div>${log.timestamp}</div>
                    </div>
                    <div>
                        <div class="log-detail-label">User:</div>
                        <div>${log.user}</div>
                    </div>
                    <div>
                        <div class="log-detail-label">IP:</div>
                        <div>${log.ip}</div>
                    </div>
                </div>
                <div class="log-description">
                    <strong>Details:</strong> ${log.details}
                </div>
            </div>
        </div>
    `,
      )
      .join("")}
</body>
</html>`

    // Convert HTML to PDF using browser's print functionality
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()

      // Wait for content to load then trigger print
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
            <Activity className="h-8 w-8 mr-3 text-blue-400" />
            System Logs
          </h1>
          <p className="text-gray-400 mt-1">Monitor system activity and security events</p>
        </div>
        <div className="flex items-center gap-2 relative z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)] relative z-10"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)] relative z-10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-[hsl(var(--border)/0.5)] text-white">
              <DropdownMenuItem onClick={() => handleExport("json")} className="hover:bg-gray-800 cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")} className="hover:bg-gray-800 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("html")} className="hover:bg-gray-800 cursor-pointer">
                <Globe className="h-4 w-4 mr-2" />
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")} className="hover:bg-gray-800 cursor-pointer">
                <FileDown className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-black/70 hover:border-blue-400/50 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Total Logs
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {logsData.length}
            </div>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-black/70 hover:border-red-400/50 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Security Events
            </CardTitle>
            <Shield className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {logsData.filter((log) => log.type === "security").length}
            </div>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-black/70 hover:border-green-400/50 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              System Events
            </CardTitle>
            <Settings className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
              {logsData.filter((log) => log.type === "system").length}
            </div>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Normal operation</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-black/70 hover:border-red-400/50 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Errors
            </CardTitle>
            <Activity className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {logsData.filter((log) => log.level === "error").length}
            </div>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Critical issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-400" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search logs by message, user, or details..."
              value={logSearch}
              onChange={handleSearchChange}
              className="pl-10 bg-gray-800 border-[hsl(var(--border)/0.5)] text-white placeholder-gray-400 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            />
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "security", "system", "user", "challenge", "admin"].map((filter) => (
              <Button
                key={filter}
                variant={logFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(filter)}
                className={cn(
                  "text-xs",
                  logFilter === filter
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "border-[hsl(var(--border)/0.5)] text-gray-400 hover:text-white hover:bg-[hsl(var(--accent)/0.2)]",
                )}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card className="bg-black/50 border-[hsl(var(--border)/0.5)] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Log Entries ({filteredLogs.length})</CardTitle>
          <CardDescription className="text-gray-400">Real-time system activity and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-[hsl(var(--primary))] scrollbar-thumb-rounded-full hover:scrollbar-thumb-[hsl(var(--primary)/0.8)] scrollbar-track-rounded-full">
            {paginatedLogs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-900/50 border border-[hsl(var(--border)/0.3)] rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg text-sm", getLogLevelColor(log.level))}>
                    {getLogIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs px-2 py-1 font-semibold uppercase tracking-wide shadow-sm",
                          getLogLevelColor(log.level),
                        )}
                      >
                        {log.level}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-200 border-gray-600/50 px-2 py-1 font-semibold uppercase tracking-wide shadow-sm backdrop-blur-sm"
                      >
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-white font-medium mb-2">{log.message}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
                      <div>
                        <span className="text-gray-500">Time:</span> {log.timestamp}
                      </div>
                      <div>
                        <span className="text-gray-500">User:</span> {log.user}
                      </div>
                      <div>
                        <span className="text-gray-500">IP:</span> {log.ip}
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 bg-gray-800/30 p-2 rounded border border-gray-700/50">
                      <span className="text-gray-500">Details:</span> {log.details}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {paginatedLogs.length === 0 && filteredLogs.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No logs found</h3>
                <p>No logs match your current filter criteria</p>
              </div>
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[hsl(var(--border)/0.3)]">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} logs
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)] disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {/* First page */}
                  {currentPage > 3 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        className="w-8 h-8 p-0 border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)]"
                      >
                        1
                      </Button>
                      {currentPage > 4 && <span className="text-gray-400 px-1">...</span>}
                    </>
                  )}

                  {/* Page numbers around current page */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    // Don't show if it's already shown as first page
                    if (pageNum === 1 && currentPage > 3) return null
                    // Don't show if it's already shown as last page
                    if (pageNum === totalPages && currentPage < totalPages - 2) return null

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-8 h-8 p-0",
                          currentPage === pageNum
                            ? "bg-[hsl(var(--primary))] text-white"
                            : "border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)]",
                        )}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="text-gray-400 px-1">...</span>}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 p-0 border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)]"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[hsl(var(--border)/0.5)] text-gray-300 hover:text-white hover:bg-[hsl(var(--accent)/0.2)] disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
