"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Flag,
  Home,
  MessageSquare,
  Shield,
  Trophy,
  Users,
  ChevronLeft,
  ChevronRight,
  Palette,
  Activity,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Particles } from "@/components/particles"
import { useSidebar } from "@/components/sidebar-context"
import { useTheme } from "@/components/theme-provider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const adminRoutes = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Challenges",
    href: "/dashboard/challenges",
    icon: Flag,
  },
  {
    name: "Teams",
    href: "/dashboard/teams",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "System Logs",
    href: "/dashboard/logs",
    icon: Activity,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
]

const playerRoutes = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Challenges",
    href: "/dashboard/challenges",
    icon: Flag,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    name: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const routes = isAdmin ? adminRoutes : playerRoutes
  const { isOpen, toggleSidebar } = useSidebar()
  const { accentColor, setAccentColor } = useTheme()

  const isTasksPage = pathname.includes("/tasks")

  if (isTasksPage) {
    return null
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen flex flex-col border-r border-[hsl(var(--border)/0.2)] bg-black/50 backdrop-blur-sm transition-all duration-300",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-16 items-center border-b border-[hsl(var(--border)/0.2)] px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[hsl(var(--primary))]" />
          {isOpen && <span className="text-lg font-bold text-white">HexVortex</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-gray-400 hover:text-white hover:bg-[hsl(var(--accent)/0.2)]"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4 relative scrollbar-none">
        <Particles className="absolute inset-0 -z-10" quantity={30} />
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant="ghost"
              className={cn(
                "h-10 justify-start gap-2 px-3 text-gray-400 hover:text-black hover:bg-gray-200",
                pathname === route.href && "bg-[hsl(var(--accent)/0.2)] text-white",
                !isOpen && "justify-center px-0",
              )}
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5" />
                {isOpen && <span>{route.name}</span>}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="border-t border-[hsl(var(--border)/0.2)] p-4 space-y-3">
        {isOpen && (
          <>
            <div className="text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isAdmin ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--primary)/0.8)]",
                  )}
                />
                <span>{isAdmin ? "Admin" : "Player"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                      <Palette className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3 bg-gray-900 border border-gray-700" side="right" align="end">
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400 font-medium">Choose Accent Color</div>
                      <div className="grid grid-cols-10 gap-2">
                        {(
                          [
                            "red",
                            "fire-red",
                            "hacker-red",
                            "payload-red",
                            "orange",
                            "sunset-orange",
                            "rust-orange",
                            "html-orange",
                            "yellow",
                            "root-gold",
                            "python-yellow",
                            "js-yellow",
                            "green",
                            "neon-green",
                            "matrix-green",
                            "terminal-green",
                            "node-green",
                            "nginx-green",
                            "cyan",
                            "aqua",
                            "cyber-cyan",
                            "go-cyan",
                            "blue",
                            "electric-blue",
                            "code-blue",
                            "docker-blue",
                            "react-blue",
                            "arch-blue",
                            "purple",
                            "deep-purple",
                            "cosmic-purple",
                            "exploit-purple",
                            "vim-purple",
                            "pink",
                            "hot-pink",
                            "magenta",
                            "chartreuse",
                            "silver",
                            "turquoise",
                            "mint-green",
                          ] as const
                        ).map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "h-6 w-6 rounded-full border-2 transition-all hover:scale-110",
                              accentColor === color ? "border-white scale-110" : "border-gray-600",
                              {
                                "bg-teal-500": color === "teal",
                                "bg-blue-500": color === "blue",
                                "bg-purple-500": color === "purple",
                                "bg-green-500": color === "green",
                                "bg-orange-500": color === "orange",
                                "bg-red-500": color === "red",
                                "bg-pink-500": color === "pink",
                                "bg-yellow-500": color === "yellow",
                                "bg-indigo-500": color === "indigo",
                                "bg-cyan-500": color === "cyan",
                                "bg-emerald-500": color === "emerald",
                                "bg-rose-500": color === "rose",
                                "bg-violet-500": color === "violet",
                                "bg-amber-500": color === "amber",
                                "bg-lime-500": color === "lime",
                                "bg-sky-500": color === "sky",
                                "bg-fuchsia-500": color === "fuchsia",
                                "bg-magenta-500": color === "magenta",
                                "bg-[#7fff00]": color === "chartreuse",
                                "bg-gray-400": color === "silver",
                                "bg-[#40e0d0]": color === "turquoise",
                                "bg-[#00ffff]": color === "aqua",
                                "bg-[#00ff7f]": color === "mint-green",
                                "bg-[#ff69b4]": color === "hot-pink",
                                "bg-[#0080ff]": color === "electric-blue",
                                "bg-[#00ff00]": color === "neon-green",
                                "bg-[#ff4500]": color === "sunset-orange",
                                "bg-[#800080]": color === "deep-purple",
                                "bg-[#006994]": color === "ocean-blue",
                                "bg-[#228b22]": color === "forest-green",
                                "bg-[#ff0000]": color === "fire-red",
                                "bg-[#8a2be2]": color === "cosmic-purple",
                                "bg-[#00ff41]": color === "matrix-green",
                                "bg-[#cc0000]": color === "hacker-red",
                                "bg-[#00cc00]": color === "terminal-green",
                                "bg-[#0066ff]": color === "code-blue",
                                "bg-[#ff9900]": color === "debug-orange",
                                "bg-[#cc00cc]": color === "exploit-purple",
                                "bg-[#e60000]": color === "payload-red",
                                "bg-[#00b300]": color === "shell-green",
                                "bg-[#ffcc00]": color === "root-gold",
                                "bg-[#ff3333]": color === "sudo-red",
                                "bg-[#00cc66]": color === "bash-green",
                                "bg-[#cc66ff]": color === "vim-purple",
                                "bg-[#ff6633]": color === "git-orange",
                                "bg-[#0099cc]": color === "docker-blue",
                                "bg-[#00ccdd]": color === "kubernetes-cyan",
                                "bg-[#00d4ff]": color === "react-blue",
                                "bg-[#66cc00]": color === "node-green",
                                "bg-[#ffdd00]": color === "python-yellow",
                                "bg-[#ff8800]": color === "rust-orange",
                                "bg-[#00ccee]": color === "go-cyan",
                                "bg-[#ff4400]": color === "java-red",
                                "bg-[#0055ff]": color === "cpp-blue",
                                "bg-[#ffee00]": color === "js-yellow",
                                "bg-[#0077ff]": color === "ts-blue",
                                "bg-[#ff5500]": color === "html-orange",
                                "bg-[#0088ff]": color === "css-blue",
                                "bg-[#bb44ff]": color === "sql-purple",
                                "bg-[#55cc00]": color === "mongodb-green",
                                "bg-[#ff2200]": color === "redis-red",
                                "bg-[#00bb44]": color === "nginx-green",
                                "bg-[#cc3300]": color === "apache-red",
                                "bg-[#ffff00]": color === "linux-yellow",
                                "bg-[#ff9900]": color === "ubuntu-orange",
                                "bg-[#0066ff]": color === "arch-blue",
                                "bg-[#ff0033]": color === "debian-red",
                                "bg-[#0044ff]": color === "fedora-blue",
                                "bg-[#aa22ff]": color === "centos-purple",
                                "bg-[#006699]": color === "kali-blue",
                                "bg-[#00ffcc]": color === "parrot-cyan",
                                "bg-[#800000]": color === "blackarch-red",
                                "bg-[#008000]": color === "pentoo-green",
                              },
                            )}
                            onClick={() => setAccentColor(color)}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          />
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </>
        )}
        {!isOpen && (
          <div className="flex flex-col gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                  <Palette className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-3 bg-gray-900 border border-gray-700" side="right" align="end">
                <div className="space-y-2">
                  <div className="text-xs text-gray-400 font-medium">Choose Accent Color</div>
                  <div className="grid grid-cols-10 gap-2">
                    {(
                      [
                        "red",
                        "fire-red",
                        "hacker-red",
                        "payload-red",
                        "orange",
                        "sunset-orange",
                        "rust-orange",
                        "html-orange",
                        "yellow",
                        "root-gold",
                        "python-yellow",
                        "js-yellow",
                        "green",
                        "neon-green",
                        "matrix-green",
                        "terminal-green",
                        "node-green",
                        "nginx-green",
                        "cyan",
                        "aqua",
                        "cyber-cyan",
                        "go-cyan",
                        "blue",
                        "electric-blue",
                        "code-blue",
                        "docker-blue",
                        "react-blue",
                        "arch-blue",
                        "purple",
                        "deep-purple",
                        "cosmic-purple",
                        "exploit-purple",
                        "vim-purple",
                        "pink",
                        "hot-pink",
                        "magenta",
                        "chartreuse",
                        "silver",
                        "turquoise",
                        "mint-green",
                      ] as const
                    ).map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 transition-all hover:scale-110",
                          accentColor === color ? "border-white scale-110" : "border-gray-600",
                          {
                            "bg-teal-500": color === "teal",
                            "bg-blue-500": color === "blue",
                            "bg-purple-500": color === "purple",
                            "bg-green-500": color === "green",
                            "bg-orange-500": color === "orange",
                            "bg-red-500": color === "red",
                            "bg-pink-500": color === "pink",
                            "bg-yellow-500": color === "yellow",
                            "bg-indigo-500": color === "indigo",
                            "bg-cyan-500": color === "cyan",
                            "bg-emerald-500": color === "emerald",
                            "bg-rose-500": color === "rose",
                            "bg-violet-500": color === "violet",
                            "bg-amber-500": color === "amber",
                            "bg-lime-500": color === "lime",
                            "bg-sky-500": color === "sky",
                            "bg-fuchsia-500": color === "fuchsia",
                            "bg-magenta-500": color === "magenta",
                            "bg-[#7fff00]": color === "chartreuse",
                            "bg-gray-400": color === "silver",
                            "bg-[#40e0d0]": color === "turquoise",
                            "bg-[#00ffff]": color === "aqua",
                            "bg-[#00ff7f]": color === "mint-green",
                            "bg-[#ff69b4]": color === "hot-pink",
                            "bg-[#0080ff]": color === "electric-blue",
                            "bg-[#00ff00]": color === "neon-green",
                            "bg-[#ff4500]": color === "sunset-orange",
                            "bg-[#800080]": color === "deep-purple",
                            "bg-[#006994]": color === "ocean-blue",
                            "bg-[#228b22]": color === "forest-green",
                            "bg-[#ff0000]": color === "fire-red",
                            "bg-[#8a2be2]": color === "cosmic-purple",
                            "bg-[#00ff41]": color === "matrix-green",
                            "bg-[#cc0000]": color === "hacker-red",
                            "bg-[#00cc00]": color === "terminal-green",
                            "bg-[#0066ff]": color === "code-blue",
                            "bg-[#ff9900]": color === "debug-orange",
                            "bg-[#cc00cc]": color === "exploit-purple",
                            "bg-[#e60000]": color === "payload-red",
                            "bg-[#00b300]": color === "shell-green",
                            "bg-[#ffcc00]": color === "root-gold",
                            "bg-[#ff3333]": color === "sudo-red",
                            "bg-[#00cc66]": color === "bash-green",
                            "bg-[#cc66ff]": color === "vim-purple",
                            "bg-[#ff6633]": color === "git-orange",
                            "bg-[#0099cc]": color === "docker-blue",
                            "bg-[#00ccdd]": color === "kubernetes-cyan",
                            "bg-[#00d4ff]": color === "react-blue",
                            "bg-[#66cc00]": color === "node-green",
                            "bg-[#ffdd00]": color === "python-yellow",
                            "bg-[#ff8800]": color === "rust-orange",
                            "bg-[#00ccee]": color === "go-cyan",
                            "bg-[#ff4400]": color === "java-red",
                            "bg-[#0055ff]": color === "cpp-blue",
                            "bg-[#ffee00]": color === "js-yellow",
                            "bg-[#0077ff]": color === "ts-blue",
                            "bg-[#ff5500]": color === "html-orange",
                            "bg-[#0088ff]": color === "css-blue",
                            "bg-[#bb44ff]": color === "sql-purple",
                            "bg-[#55cc00]": color === "mongodb-green",
                            "bg-[#ff2200]": color === "redis-red",
                            "bg-[#00bb44]": color === "nginx-green",
                            "bg-[#cc3300]": color === "apache-red",
                            "bg-[#ffff00]": color === "linux-yellow",
                            "bg-[#ff9900]": color === "ubuntu-orange",
                            "bg-[#0066ff]": color === "arch-blue",
                            "bg-[#ff0033]": color === "debian-red",
                            "bg-[#0044ff]": color === "fedora-blue",
                            "bg-[#aa22ff]": color === "centos-purple",
                            "bg-[#006699]": color === "kali-blue",
                            "bg-[#00ffcc]": color === "parrot-cyan",
                            "bg-[#800000]": color === "blackarch-red",
                            "bg-[#008000]": color === "pentoo-green",
                          },
                        )}
                        onClick={() => setAccentColor(color)}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </aside>
  )
}
