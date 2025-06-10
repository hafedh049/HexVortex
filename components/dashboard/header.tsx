"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export function DashboardHeader() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-transparent bg-black/50 backdrop-blur-sm px-6">
      <div className="flex items-center gap-2 md:hidden">{/* Mobile menu button would go here */}</div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
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
  )
}
