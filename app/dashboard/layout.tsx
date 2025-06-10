"use client"

import { cn } from "@/lib/utils"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { ProtectedRoute } from "@/components/protected-route"
import { Particles } from "@/components/particles"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-gray-900 relative">
      <Particles className="absolute inset-0" />
      <Sidebar />
      <div className={cn("flex-1 flex flex-col transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
