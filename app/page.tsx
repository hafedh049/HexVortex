"use client"

import { Particles } from "@/components/particles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Trophy,
  Users,
  Zap,
  Shield,
  Code,
  Lock,
  Globe,
  Target,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

function AnimatedStat({ endValue, label, color }: { endValue: number; label: string; color: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000 // 2 seconds
          const startTime = Date.now()

          const timer = setInterval(() => {
            const now = Date.now()
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function for smoother animation
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            const currentCount = Math.floor(easedProgress * endValue)

            setCount(currentCount)

            if (progress === 1) {
              clearInterval(timer)
            }
          }, 16) // ~60fps
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [endValue, hasAnimated])

  return (
    <div className="text-center">
      <div
        ref={countRef}
        className={`text-3xl md:text-4xl font-bold text-${color}-400 mb-2 opacity-0 animate-fade-in-up`}
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        {count}+
      </div>
      <div
        className="text-gray-400 text-sm opacity-0 animate-fade-in-up"
        style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
      >
        {label}
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    // Add animation styles to the document
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      @keyframes movingBorder1 {
        0% { border-color: rgba(20, 184, 166, 0.6); box-shadow: 0 0 20px rgba(20, 184, 166, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        25% { border-color: rgba(6, 182, 212, 0.6); box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        50% { border-color: rgba(34, 197, 94, 0.6); box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        75% { border-color: rgba(6, 182, 212, 0.6); box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        100% { border-color: rgba(20, 184, 166, 0.6); box-shadow: 0 0 20px rgba(20, 184, 166, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
      }

      @keyframes movingBorder2 {
        0% { border-color: rgba(6, 182, 212, 0.6); box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        25% { border-color: rgba(59, 130, 246, 0.6); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        50% { border-color: rgba(20, 184, 166, 0.6); box-shadow: 0 0 20px rgba(20, 184, 166, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        75% { border-color: rgba(59, 130, 246, 0.6); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        100% { border-color: rgba(6, 182, 212, 0.6); box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
      }

      @keyframes movingBorder3 {
        0% { border-color: rgba(59, 130, 246, 0.6); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        25% { border-color: rgba(147, 51, 234, 0.6); box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        50% { border-color: rgba(6, 182, 212, 0.6); box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        75% { border-color: rgba(147, 51, 234, 0.6); box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
        100% { border-color: rgba(59, 130, 246, 0.6); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 5px 5px 10px rgba(0,0,0,0.3), -2px -2px 5px rgba(255,255,255,0.1); }
      }

      .animate-border-1 {
        animation: movingBorder1 3s ease-in-out infinite;
      }

      .animate-border-2 {
        animation: movingBorder2 3s ease-in-out infinite 1s;
      }

      .animate-border-3 {
        animation: movingBorder3 3s ease-in-out infinite 2s;
      }

      @keyframes glitch {
        0% {
          transform: translate(0);
          text-shadow: 0 0 0 transparent;
        }
        2% {
          transform: translate(-2px, 1px);
          text-shadow: -1px 0 0 rgba(255, 255, 255, 0.3), 1px 0 0 rgba(255, 255, 255, 0.3);
        }
        4% {
          transform: translate(1px, -1px);
          text-shadow: 2px 0 0 rgba(255, 255, 255, 0.3), -2px 0 0 rgba(255, 255, 255, 0.3);
        }
        6% {
          transform: translate(-1px, 2px);
          text-shadow: -2px 0 0 rgba(255, 255, 255, 0.3), 2px 0 0 rgba(255, 255, 255, 0.3);
        }
        8% {
          transform: translate(1px, -2px);
          text-shadow: 2px 0 0 rgba(255, 255, 255, 0.3), -2px 0 0 rgba(255, 255, 255, 0.3);
        }
        10% {
          transform: translate(0);
          text-shadow: 0 0 0 transparent;
        }
        100% {
          transform: translate(0);
          text-shadow: 0 0 0 transparent;
        }
      }

      .matrix-glitch {
        position: relative;
        animation: glitch 4s steps(1) infinite;
        animation-delay: 2s;
      }

      .matrix-glitch::before,
      .matrix-glitch::after {
        content: "HexVortex";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        background-clip: text;
        -webkit-background-clip: text;
      }

      .matrix-glitch::before {
        left: 1px;
        text-shadow: -1px 0 rgba(255, 255, 255, 0.2);
        animation: glitch 4s steps(1) infinite;
        animation-delay: 2.02s;
      }

      .matrix-glitch::after {
        left: -1px;
        text-shadow: 1px 0 rgba(255, 255, 255, 0.2);
        animation: glitch 4s steps(1) infinite;
        animation-delay: 1.98s;
        clip-path: polygon(0 45%, 100% 45%, 100% 100%, 0 100%);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const startDate = new Date("2025-05-23T11:00:00")

    const updateCounter = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ days, hours, minutes, seconds })
    }

    updateCounter()
    const interval = setInterval(updateCounter, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Particles className="absolute inset-0 z-0" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-green-500 mb-6 matrix-glitch">
            HexVortex
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mb-10">
            Test your hacking skills in our cutting-edge Capture The Flag platform. Join teams, solve challenges, and
            climb the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
            >
              <Link href="/login">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-teal-600 text-teal-400 hover:bg-teal-950/20 hover:text-white"
            >
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <AnimatedStat endValue={500} label="Active Players" color="teal" />
          <AnimatedStat endValue={150} label="Challenges" color="cyan" />
          <AnimatedStat endValue={50} label="Teams" color="green" />
          <div className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
            >
              24/7
            </div>
            <div
              className="text-gray-400 text-sm opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
            >
              Uptime
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-black/50 border-teal-900/20 backdrop-blur-sm shadow-neomorphic-sm hover:shadow-neomorphic hover:scale-105 hover:border-teal-500/30 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader>
              <Zap className="h-10 w-10 text-teal-500 mb-2" />
              <CardTitle className="text-white">Challenging Tasks</CardTitle>
              <CardDescription className="text-gray-400">
                Solve real-world security challenges across various categories
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              From web exploitation to cryptography, our platform offers diverse challenges to test and improve your
              skills.
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-teal-900/20 backdrop-blur-sm shadow-neomorphic-sm hover:shadow-neomorphic hover:scale-105 hover:border-cyan-500/30 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader>
              <Users className="h-10 w-10 text-cyan-500 mb-2" />
              <CardTitle className="text-white">Team Collaboration</CardTitle>
              <CardDescription className="text-gray-400">
                Create or join teams and collaborate to solve complex challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              Use our built-in team chat to share ideas, strategies, and solutions with your teammates in real-time.
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-teal-900/20 backdrop-blur-sm shadow-neomorphic-sm hover:shadow-neomorphic hover:scale-105 hover:border-green-500/30 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader>
              <Trophy className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle className="text-white">Competitive Leaderboard</CardTitle>
              <CardDescription className="text-gray-400">
                Compete against other teams and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              Watch your team climb the ranks as you solve challenges and earn points in our real-time leaderboard.
            </CardContent>
          </Card>
        </div>

        {/* Challenge Categories */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Challenge Categories</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore diverse cybersecurity domains and sharpen your skills across multiple disciplines
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Globe className="h-8 w-8 text-teal-400 mb-2" />
                <CardTitle className="text-lg text-white">Web Exploitation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">SQL injection, XSS, CSRF, and other web vulnerabilities</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Lock className="h-8 w-8 text-cyan-400 mb-2" />
                <CardTitle className="text-lg text-white">Cryptography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">Encryption, hashing, digital signatures, and cipher breaking</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Code className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-lg text-white">Reverse Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">Binary analysis, malware analysis, and code decompilation</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Shield className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle className="text-lg text-white">Forensics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">Digital forensics, memory analysis, and evidence recovery</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Target className="h-8 w-8 text-orange-400 mb-2" />
                <CardTitle className="text-lg text-white">Pwn/Binary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">Buffer overflows, ROP chains, and binary exploitation</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-teal-900/20 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <Clock className="h-8 w-8 text-pink-400 mb-2" />
                <CardTitle className="text-lg text-white">Misc</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">OSINT, steganography, and other miscellaneous challenges</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Get started in minutes and begin your cybersecurity journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-all duration-300 ease-in-out p-4 rounded-xl hover:bg-black/20 cursor-pointer">
              <div className="relative w-16 h-16 mx-auto mb-4 group-hover:transform group-hover:rotate-[360deg] transition-all duration-700 ease-in-out">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-700 transform rotate-45 border-2 animate-border-1 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.7)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    1
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                Sign Up & Join
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Create your account and join an existing team or create your own
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-all duration-300 ease-in-out p-4 rounded-xl hover:bg-black/20 cursor-pointer">
              <div className="relative w-16 h-16 mx-auto mb-4 group-hover:transform group-hover:rotate-[360deg] transition-all duration-700 ease-in-out">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-700 transform rotate-45 border-2 animate-border-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.7)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    2
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                Solve Challenges
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Browse challenges, submit flags, and earn points for your team
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-all duration-300 ease-in-out p-4 rounded-xl hover:bg-black/20 cursor-pointer">
              <div className="relative w-16 h-16 mx-auto mb-4 group-hover:transform group-hover:rotate-[360deg] transition-all duration-700 ease-in-out">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-700 transform rotate-45 border-2 animate-border-3 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    3
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                Climb the Ranks
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Compete with other teams and watch your ranking improve
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose HexVortex?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 hover:bg-teal-900/10 hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg cursor-pointer group">
                  <CheckCircle className="h-6 w-6 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-100 transition-colors duration-300">
                      Real-time Scoring
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Instant feedback and live leaderboard updates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-teal-900/10 hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg cursor-pointer group">
                  <CheckCircle className="h-6 w-6 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-100 transition-colors duration-300">
                      Team Chat Integration
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Built-in communication tools for seamless collaboration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-teal-900/10 hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg cursor-pointer group">
                  <CheckCircle className="h-6 w-6 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-100 transition-colors duration-300">
                      Progressive Difficulty
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Challenges designed for beginners to experts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-teal-900/10 hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg cursor-pointer group">
                  <CheckCircle className="h-6 w-6 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-100 transition-colors duration-300">
                      Detailed Analytics
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Track your progress and identify areas for improvement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-teal-900/10 hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg cursor-pointer group">
                  <CheckCircle className="h-6 w-6 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-100 transition-colors duration-300">
                      24/7 Availability
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Practice and compete anytime, anywhere
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-teal-500/30 backdrop-blur-sm">
                <CardHeader>
                  <Star className="h-12 w-12 text-teal-400 mb-4 hover:fill-teal-400 transition-all duration-300 cursor-pointer" />
                  <CardTitle className="text-2xl text-white">Ready to Start?</CardTitle>
                  <CardDescription className="text-gray-300">
                    Join thousands of cybersecurity enthusiasts and start your journey today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    <Link href="/login" className="flex items-center gap-2">
                      Get Started Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-teal-900/20 pt-12 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">HexVortex CTF</h3>
              <p className="text-gray-400 text-sm">
                The premier platform for cybersecurity challenges and team collaboration.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Teams
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-900/20 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">This website was created since 11:00 AM 23/05/2025</p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-teal-400 font-mono text-lg">
                {String(timeElapsed.days).padStart(2, "0")}:{String(timeElapsed.hours).padStart(2, "0")}:
                {String(timeElapsed.minutes).padStart(2, "0")}:{String(timeElapsed.seconds).padStart(2, "0")}
              </span>
              <span className="text-gray-500 text-xs">DD:HH:MM:SS</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 HexVortex CTF. All rights reserved. Built for cybersecurity enthusiasts.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
