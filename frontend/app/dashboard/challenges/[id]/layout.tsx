"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Particles } from "@/components/particles"

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <Particles className="absolute inset-0" />
        {children}
      </div>
    </ProtectedRoute>
  )
}
