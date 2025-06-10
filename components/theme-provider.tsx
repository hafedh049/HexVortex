"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark"
type AccentColor =
  | "teal"
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "red"
  | "pink"
  | "yellow"
  | "indigo"
  | "cyan"
  | "emerald"
  | "rose"
  | "violet"
  | "amber"
  | "lime"
  | "sky"
  | "fuchsia"
  | "slate"
  | "zinc"
  | "neutral"
  | "stone"
  | "gray"
  | "crimson"
  | "coral"
  | "mint"
  | "lavender"
  | "gold"
  | "silver"
  | "bronze"
  | "turquoise"
  | "magenta"
  | "chartreuse"
  | "aqua"
  | "navy"
  | "maroon"
  | "olive"
  | "plum"
  | "salmon"
  | "khaki"
  | "ivory"
  | "beige"
  | "peach"
  | "lilac"
  | "mint-green"
  | "hot-pink"
  | "electric-blue"
  | "neon-green"
  | "sunset-orange"
  | "deep-purple"
  | "ocean-blue"
  | "forest-green"
  | "fire-red"
  | "cosmic-purple"
  | "cyber-cyan"
  | "matrix-green"
  | "hacker-red"
  | "terminal-green"
  | "code-blue"
  | "debug-orange"
  | "exploit-purple"
  | "payload-red"
  | "shell-green"
  | "root-gold"
  | "admin-silver"
  | "sudo-red"
  | "bash-green"
  | "vim-purple"
  | "git-orange"
  | "docker-blue"
  | "kubernetes-cyan"
  | "react-blue"
  | "node-green"
  | "python-yellow"
  | "rust-orange"
  | "go-cyan"
  | "java-red"
  | "cpp-blue"
  | "js-yellow"
  | "ts-blue"
  | "html-orange"
  | "css-blue"
  | "sql-purple"
  | "mongodb-green"
  | "redis-red"
  | "nginx-green"
  | "apache-red"
  | "linux-yellow"
  | "ubuntu-orange"
  | "arch-blue"
  | "debian-red"
  | "fedora-blue"
  | "centos-purple"
  | "kali-blue"
  | "parrot-cyan"
  | "blackarch-red"
  | "pentoo-green"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultAccentColor?: AccentColor
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  accentColor: AccentColor
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  accentColor: "teal",
  setTheme: () => null,
  setAccentColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const colorMap = {
  teal: {
    primary: "180 84% 60%",
    accent: "180 84% 15%",
    border: "180 84% 25%",
    ring: "180 84% 60%",
    particles: ["#14b8a6", "#0d9488", "#0f766e"],
  },
  blue: {
    primary: "217 91% 60%",
    accent: "217 91% 15%",
    border: "217 91% 25%",
    ring: "217 91% 60%",
    particles: ["#3b82f6", "#2563eb", "#1d4ed8"],
  },
  purple: {
    primary: "262 83% 58%",
    accent: "262 83% 15%",
    border: "262 83% 25%",
    ring: "262 83% 58%",
    particles: ["#8b5cf6", "#7c3aed", "#6d28d9"],
  },
  green: {
    primary: "142 76% 36%",
    accent: "142 76% 15%",
    border: "142 76% 25%",
    ring: "142 76% 36%",
    particles: ["#10b981", "#059669", "#047857"],
  },
  orange: {
    primary: "25 95% 53%",
    accent: "25 95% 15%",
    border: "25 95% 25%",
    ring: "25 95% 53%",
    particles: ["#f97316", "#ea580c", "#c2410c"],
  },
  red: {
    primary: "0 84% 60%",
    accent: "0 84% 15%",
    border: "0 84% 25%",
    ring: "0 84% 60%",
    particles: ["#ef4444", "#dc2626", "#b91c1c"],
  },
  pink: {
    primary: "330 81% 60%",
    accent: "330 81% 15%",
    border: "330 81% 25%",
    ring: "330 81% 60%",
    particles: ["#ec4899", "#db2777", "#be185d"],
  },
  yellow: {
    primary: "48 96% 53%",
    accent: "48 96% 15%",
    border: "48 96% 25%",
    ring: "48 96% 53%",
    particles: ["#eab308", "#ca8a04", "#a16207"],
  },
  indigo: {
    primary: "239 84% 67%",
    accent: "239 84% 15%",
    border: "239 84% 25%",
    ring: "239 84% 67%",
    particles: ["#6366f1", "#4f46e5", "#4338ca"],
  },
  cyan: {
    primary: "188 94% 43%",
    accent: "188 94% 15%",
    border: "188 94% 25%",
    ring: "188 94% 43%",
    particles: ["#06b6d4", "#0891b2", "#0e7490"],
  },
  emerald: {
    primary: "160 84% 39%",
    accent: "160 84% 15%",
    border: "160 84% 25%",
    ring: "160 84% 39%",
    particles: ["#10b981", "#059669", "#047857"],
  },
  rose: {
    primary: "351 83% 61%",
    accent: "351 83% 15%",
    border: "351 83% 25%",
    ring: "351 83% 61%",
    particles: ["#f43f5e", "#e11d48", "#be123c"],
  },
  violet: {
    primary: "258 90% 66%",
    accent: "258 90% 15%",
    border: "258 90% 25%",
    ring: "258 90% 66%",
    particles: ["#8b5cf6", "#7c3aed", "#6d28d9"],
  },
  amber: {
    primary: "45 96% 64%",
    accent: "45 96% 15%",
    border: "45 96% 25%",
    ring: "45 96% 64%",
    particles: ["#f59e0b", "#d97706", "#b45309"],
  },
  lime: {
    primary: "84 81% 44%",
    accent: "84 81% 15%",
    border: "84 81% 25%",
    ring: "84 81% 44%",
    particles: ["#84cc16", "#65a30d", "#4d7c0f"],
  },
  sky: {
    primary: "199 89% 48%",
    accent: "199 89% 15%",
    border: "199 89% 25%",
    ring: "199 89% 48%",
    particles: ["#0ea5e9", "#0284c7", "#0369a1"],
  },
  fuchsia: {
    primary: "292 84% 61%",
    accent: "292 84% 15%",
    border: "292 84% 25%",
    ring: "292 84% 61%",
    particles: ["#d946ef", "#c026d3", "#a21caf"],
  },
  slate: {
    primary: "215 28% 17%",
    accent: "215 28% 8%",
    border: "215 28% 15%",
    ring: "215 28% 17%",
    particles: ["#64748b", "#475569", "#334155"],
  },
  zinc: {
    primary: "240 4% 16%",
    accent: "240 4% 8%",
    border: "240 4% 15%",
    ring: "240 4% 16%",
    particles: ["#71717a", "#52525b", "#3f3f46"],
  },
  neutral: {
    primary: "0 0% 45%",
    accent: "0 0% 15%",
    border: "0 0% 25%",
    ring: "0 0% 45%",
    particles: ["#737373", "#525252", "#404040"],
  },
  stone: {
    primary: "25 5% 45%",
    accent: "25 5% 15%",
    border: "25 5% 25%",
    ring: "25 5% 45%",
    particles: ["#78716c", "#57534e", "#44403c"],
  },
  gray: {
    primary: "220 9% 46%",
    accent: "220 9% 15%",
    border: "220 9% 25%",
    ring: "220 9% 46%",
    particles: ["#6b7280", "#4b5563", "#374151"],
  },
  crimson: {
    primary: "348 83% 47%",
    accent: "348 83% 15%",
    border: "348 83% 25%",
    ring: "348 83% 47%",
    particles: ["#dc143c", "#b91c3c", "#991b1b"],
  },
  coral: {
    primary: "16 100% 66%",
    accent: "16 100% 15%",
    border: "16 100% 25%",
    ring: "16 100% 66%",
    particles: ["#ff7f50", "#ff6347", "#ff4500"],
  },
  mint: {
    primary: "150 100% 88%",
    accent: "150 100% 15%",
    border: "150 100% 25%",
    ring: "150 100% 88%",
    particles: ["#98fb98", "#90ee90", "#00fa9a"],
  },
  lavender: {
    primary: "240 67% 94%",
    accent: "240 67% 15%",
    border: "240 67% 25%",
    ring: "240 67% 94%",
    particles: ["#e6e6fa", "#dda0dd", "#da70d6"],
  },
  gold: {
    primary: "51 100% 50%",
    accent: "51 100% 15%",
    border: "51 100% 25%",
    ring: "51 100% 50%",
    particles: ["#ffd700", "#ffb347", "#ff8c00"],
  },
  silver: {
    primary: "0 0% 75%",
    accent: "0 0% 15%",
    border: "0 0% 25%",
    ring: "0 0% 75%",
    particles: ["#c0c0c0", "#a9a9a9", "#808080"],
  },
  bronze: {
    primary: "30 100% 34%",
    accent: "30 100% 15%",
    border: "30 100% 25%",
    ring: "30 100% 34%",
    particles: ["#cd7f32", "#b87333", "#a0522d"],
  },
  turquoise: {
    primary: "174 72% 56%",
    accent: "174 72% 15%",
    border: "174 72% 25%",
    ring: "174 72% 56%",
    particles: ["#40e0d0", "#48d1cc", "#00ced1"],
  },
  magenta: {
    primary: "300 100% 50%",
    accent: "300 100% 15%",
    border: "300 100% 25%",
    ring: "300 100% 50%",
    particles: ["#ff00ff", "#da70d6", "#ba55d3"],
  },
  chartreuse: {
    primary: "90 100% 50%",
    accent: "90 100% 15%",
    border: "90 100% 25%",
    ring: "90 100% 50%",
    particles: ["#7fff00", "#adff2f", "#9acd32"],
  },
  aqua: {
    primary: "180 100% 50%",
    accent: "180 100% 15%",
    border: "180 100% 25%",
    ring: "180 100% 50%",
    particles: ["#00ffff", "#00e5ff", "#00bcd4"],
  },
  navy: {
    primary: "240 100% 25%",
    accent: "240 100% 10%",
    border: "240 100% 15%",
    ring: "240 100% 25%",
    particles: ["#000080", "#191970", "#483d8b"],
  },
  maroon: {
    primary: "0 100% 25%",
    accent: "0 100% 10%",
    border: "0 100% 15%",
    ring: "0 100% 25%",
    particles: ["#800000", "#8b0000", "#a0522d"],
  },
  olive: {
    primary: "60 100% 25%",
    accent: "60 100% 10%",
    border: "60 100% 15%",
    ring: "60 100% 25%",
    particles: ["#808000", "#6b8e23", "#556b2f"],
  },
  plum: {
    primary: "300 47% 75%",
    accent: "300 47% 15%",
    border: "300 47% 25%",
    ring: "300 47% 75%",
    particles: ["#dda0dd", "#da70d6", "#ba55d3"],
  },
  salmon: {
    primary: "6 93% 71%",
    accent: "6 93% 15%",
    border: "6 93% 25%",
    ring: "6 93% 71%",
    particles: ["#fa8072", "#ff6347", "#ff4500"],
  },
  khaki: {
    primary: "54 77% 75%",
    accent: "54 77% 15%",
    border: "54 77% 25%",
    ring: "54 77% 75%",
    particles: ["#f0e68c", "#bdb76b", "#9acd32"],
  },
  ivory: {
    primary: "60 100% 97%",
    accent: "60 100% 15%",
    border: "60 100% 25%",
    ring: "60 100% 97%",
    particles: ["#fffff0", "#faebd7", "#f5f5dc"],
  },
  beige: {
    primary: "60 56% 91%",
    accent: "60 56% 15%",
    border: "60 56% 25%",
    ring: "60 56% 91%",
    particles: ["#f5f5dc", "#ffe4c4", "#ffdead"],
  },
  peach: {
    primary: "28 100% 86%",
    accent: "28 100% 15%",
    border: "28 100% 25%",
    ring: "28 100% 86%",
    particles: ["#ffcba4", "#ffd4a3", "#ffb07a"],
  },
  lilac: {
    primary: "282 39% 76%",
    accent: "282 39% 15%",
    border: "282 39% 25%",
    ring: "282 39% 76%",
    particles: ["#c8a2c8", "#dda0dd", "#da70d6"],
  },
  "mint-green": {
    primary: "150 100% 50%",
    accent: "150 100% 15%",
    border: "150 100% 25%",
    ring: "150 100% 50%",
    particles: ["#00ff7f", "#00fa9a", "#98fb98"],
  },
  "hot-pink": {
    primary: "330 100% 71%",
    accent: "330 100% 15%",
    border: "330 100% 25%",
    ring: "330 100% 71%",
    particles: ["#ff69b4", "#ff1493", "#dc143c"],
  },
  "electric-blue": {
    primary: "208 100% 50%",
    accent: "208 100% 15%",
    border: "208 100% 25%",
    ring: "208 100% 50%",
    particles: ["#0080ff", "#007fff", "#0066cc"],
  },
  "neon-green": {
    primary: "120 100% 50%",
    accent: "120 100% 15%",
    border: "120 100% 25%",
    ring: "120 100% 50%",
    particles: ["#00ff00", "#39ff14", "#32cd32"],
  },
  "sunset-orange": {
    primary: "15 100% 60%",
    accent: "15 100% 15%",
    border: "15 100% 25%",
    ring: "15 100% 60%",
    particles: ["#ff4500", "#ff6347", "#ff7f50"],
  },
  "deep-purple": {
    primary: "270 100% 25%",
    accent: "270 100% 10%",
    border: "270 100% 15%",
    ring: "270 100% 25%",
    particles: ["#800080", "#663399", "#4b0082"],
  },
  "ocean-blue": {
    primary: "200 100% 30%",
    accent: "200 100% 10%",
    border: "200 100% 15%",
    ring: "200 100% 30%",
    particles: ["#006994", "#0077be", "#0080ff"],
  },
  "forest-green": {
    primary: "120 100% 25%",
    accent: "120 100% 10%",
    border: "120 100% 15%",
    ring: "120 100% 25%",
    particles: ["#228b22", "#006400", "#008000"],
  },
  "fire-red": {
    primary: "0 100% 50%",
    accent: "0 100% 15%",
    border: "0 100% 25%",
    ring: "0 100% 50%",
    particles: ["#ff0000", "#dc143c", "#b22222"],
  },
  "cosmic-purple": {
    primary: "280 100% 50%",
    accent: "280 100% 15%",
    border: "280 100% 25%",
    ring: "280 100% 50%",
    particles: ["#8a2be2", "#9932cc", "#9400d3"],
  },
  "cyber-cyan": {
    primary: "180 100% 50%",
    accent: "180 100% 15%",
    border: "180 100% 25%",
    ring: "180 100% 50%",
    particles: ["#00ffff", "#00e5ff", "#00bcd4"],
  },
  "matrix-green": {
    primary: "120 100% 25%",
    accent: "120 100% 10%",
    border: "120 100% 15%",
    ring: "120 100% 25%",
    particles: ["#00ff41", "#39ff14", "#32cd32"],
  },
  "hacker-red": {
    primary: "0 100% 40%",
    accent: "0 100% 10%",
    border: "0 100% 15%",
    ring: "0 100% 40%",
    particles: ["#cc0000", "#990000", "#660000"],
  },
  "terminal-green": {
    primary: "120 100% 30%",
    accent: "120 100% 10%",
    border: "120 100% 15%",
    ring: "120 100% 30%",
    particles: ["#00cc00", "#009900", "#006600"],
  },
  "code-blue": {
    primary: "210 100% 50%",
    accent: "210 100% 15%",
    border: "210 100% 25%",
    ring: "210 100% 50%",
    particles: ["#0066ff", "#0052cc", "#003d99"],
  },
  "debug-orange": {
    primary: "30 100% 50%",
    accent: "30 100% 15%",
    border: "30 100% 25%",
    ring: "30 100% 50%",
    particles: ["#ff9900", "#ff8000", "#ff6600"],
  },
  "exploit-purple": {
    primary: "270 100% 40%",
    accent: "270 100% 10%",
    border: "270 100% 15%",
    ring: "270 100% 40%",
    particles: ["#cc00cc", "#990099", "#660066"],
  },
  "payload-red": {
    primary: "0 100% 45%",
    accent: "0 100% 10%",
    border: "0 100% 15%",
    ring: "0 100% 45%",
    particles: ["#e60000", "#cc0000", "#990000"],
  },
  "shell-green": {
    primary: "120 100% 35%",
    accent: "120 100% 10%",
    border: "120 100% 15%",
    ring: "120 100% 35%",
    particles: ["#00b300", "#009900", "#007700"],
  },
  "root-gold": {
    primary: "45 100% 50%",
    accent: "45 100% 15%",
    border: "45 100% 25%",
    ring: "45 100% 50%",
    particles: ["#ffcc00", "#ffb300", "#ff9900"],
  },
  "admin-silver": {
    primary: "0 0% 70%",
    accent: "0 0% 15%",
    border: "0 0% 25%",
    ring: "0 0% 70%",
    particles: ["#b3b3b3", "#999999", "#808080"],
  },
  "sudo-red": {
    primary: "0 100% 50%",
    accent: "0 100% 15%",
    border: "0 100% 25%",
    ring: "0 100% 50%",
    particles: ["#ff3333", "#ff0000", "#cc0000"],
  },
  "bash-green": {
    primary: "120 100% 40%",
    accent: "120 100% 10%",
    border: "120 100% 15%",
    ring: "120 100% 40%",
    particles: ["#00cc66", "#00b359", "#009944"],
  },
  "vim-purple": {
    primary: "270 100% 50%",
    accent: "270 100% 15%",
    border: "270 100% 25%",
    ring: "270 100% 50%",
    particles: ["#cc66ff", "#b84dff", "#a333ff"],
  },
  "git-orange": {
    primary: "20 100% 50%",
    accent: "20 100% 15%",
    border: "20 100% 25%",
    ring: "20 100% 50%",
    particles: ["#ff6633", "#ff4d1a", "#e6330a"],
  },
  "docker-blue": {
    primary: "200 100% 50%",
    accent: "200 100% 15%",
    border: "200 100% 25%",
    ring: "200 100% 50%",
    particles: ["#0099cc", "#0080b3", "#006699"],
  },
  "kubernetes-cyan": {
    primary: "190 100% 50%",
    accent: "190 100% 15%",
    border: "190 100% 25%",
    ring: "190 100% 50%",
    particles: ["#00ccdd", "#00b3cc", "#0099bb"],
  },
  "react-blue": {
    primary: "195 100% 50%",
    accent: "195 100% 15%",
    border: "195 100% 25%",
    ring: "195 100% 50%",
    particles: ["#00d4ff", "#00bfff", "#00aaff"],
  },
  "node-green": {
    primary: "90 100% 40%",
    accent: "90 100% 10%",
    border: "90 100% 15%",
    ring: "90 100% 40%",
    particles: ["#66cc00", "#5bb300", "#4d9900"],
  },
  "python-yellow": {
    primary: "55 100% 50%",
    accent: "55 100% 15%",
    border: "55 100% 25%",
    ring: "55 100% 50%",
    particles: ["#ffdd00", "#ffcc00", "#ffbb00"],
  },
  "rust-orange": {
    primary: "25 100% 50%",
    accent: "25 100% 15%",
    border: "25 100% 25%",
    ring: "25 100% 50%",
    particles: ["#ff8800", "#ff7700", "#ff6600"],
  },
  "go-cyan": {
    primary: "185 100% 50%",
    accent: "185 100% 15%",
    border: "185 100% 25%",
    ring: "185 100% 50%",
    particles: ["#00ccee", "#00bbdd", "#00aacc"],
  },
  "java-red": {
    primary: "10 100% 50%",
    accent: "10 100% 15%",
    border: "10 100% 25%",
    ring: "10 100% 50%",
    particles: ["#ff4400", "#ff3300", "#ee2200"],
  },
  "cpp-blue": {
    primary: "220 100% 50%",
    accent: "220 100% 15%",
    border: "220 100% 25%",
    ring: "220 100% 50%",
    particles: ["#0055ff", "#0044ee", "#0033dd"],
  },
  "js-yellow": {
    primary: "50 100% 50%",
    accent: "50 100% 15%",
    border: "50 100% 25%",
    ring: "50 100% 50%",
    particles: ["#ffee00", "#ffdd00", "#ffcc00"],
  },
  "ts-blue": {
    primary: "215 100% 50%",
    accent: "215 100% 15%",
    border: "215 100% 25%",
    ring: "215 100% 50%",
    particles: ["#0077ff", "#0066ee", "#0055dd"],
  },
  "html-orange": {
    primary: "15 100% 50%",
    accent: "15 100% 15%",
    border: "15 100% 25%",
    ring: "15 100% 50%",
    particles: ["#ff5500", "#ff4400", "#ff3300"],
  },
  "css-blue": {
    primary: "205 100% 50%",
    accent: "205 100% 15%",
    border: "205 100% 25%",
    ring: "205 100% 50%",
    particles: ["#0088ff", "#0077ee", "#0066dd"],
  },
  "sql-purple": {
    primary: "275 100% 50%",
    accent: "275 100% 15%",
    border: "275 100% 25%",
    ring: "275 100% 50%",
    particles: ["#bb44ff", "#aa33ee", "#9922dd"],
  },
  "mongodb-green": {
    primary: "95 100% 40%",
    accent: "95 100% 10%",
    border: "95 100% 15%",
    ring: "95 100% 40%",
    particles: ["#55cc00", "#44bb00", "#33aa00"],
  },
  "redis-red": {
    primary: "5 100% 50%",
    accent: "5 100% 15%",
    border: "5 100% 25%",
    ring: "5 100% 50%",
    particles: ["#ff2200", "#ee1100", "#dd0000"],
  },
  "nginx-green": {
    primary: "125 100% 40%",
    accent: "125 100% 10%",
    border: "125 100% 15%",
    ring: "125 100% 40%",
    particles: ["#00bb44", "#00aa33", "#009922"],
  },
  "apache-red": {
    primary: "0 100% 40%",
    accent: "0 100% 10%",
    border: "0 100% 15%",
    ring: "0 100% 40%",
    particles: ["#cc3300", "#bb2200", "#aa1100"],
  },
  "linux-yellow": {
    primary: "60 100% 50%",
    accent: "60 100% 15%",
    border: "60 100% 25%",
    ring: "60 100% 50%",
    particles: ["#ffff00", "#eeee00", "#dddd00"],
  },
  "ubuntu-orange": {
    primary: "30 100% 50%",
    accent: "30 100% 15%",
    border: "30 100% 25%",
    ring: "30 100% 50%",
    particles: ["#ff9900", "#ee8800", "#dd7700"],
  },
  "arch-blue": {
    primary: "210 100% 50%",
    accent: "210 100% 15%",
    border: "210 100% 25%",
    ring: "210 100% 50%",
    particles: ["#0066ff", "#0055ee", "#0044dd"],
  },
  "debian-red": {
    primary: "0 100% 50%",
    accent: "0 100% 15%",
    border: "0 100% 25%",
    ring: "0 100% 50%",
    particles: ["#ff0033", "#ee0022", "#dd0011"],
  },
  "fedora-blue": {
    primary: "225 100% 50%",
    accent: "225 100% 15%",
    border: "225 100% 25%",
    ring: "225 100% 50%",
    particles: ["#0044ff", "#0033ee", "#0022dd"],
  },
  "centos-purple": {
    primary: "285 100% 50%",
    accent: "285 100% 15%",
    border: "285 100% 25%",
    ring: "285 100% 50%",
    particles: ["#aa22ff", "#9911ee", "#8800dd"],
  },
  "kali-blue": {
    primary: "200 100% 30%",
    accent: "200 100% 10%",
    border: "200 100% 15%",
    ring: "200 100% 30%",
    particles: ["#006699", "#005588", "#004477"],
  },
  "parrot-cyan": {
    primary: "175 100% 50%",
    accent: "175 100% 15%",
    border: "175 100% 25%",
    ring: "175 100% 50%",
    particles: ["#00ffcc", "#00eebb", "#00ddaa"],
  },
  "blackarch-red": {
    primary: "0 100% 25%",
    accent: "0 100% 8%",
    border: "0 100% 12%",
    ring: "0 100% 25%",
    particles: ["#800000", "#660000", "#440000"],
  },
  "pentoo-green": {
    primary: "120 100% 25%",
    accent: "120 100% 8%",
    border: "120 100% 12%",
    ring: "120 100% 25%",
    particles: ["#008000", "#006600", "#004400"],
  },
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  defaultAccentColor = "teal",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [accentColor, setAccentColor] = useState<AccentColor>(defaultAccentColor)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const colors = colorMap[accentColor]

    // Update CSS variables
    root.style.setProperty("--primary", colors.primary)
    root.style.setProperty("--accent", colors.accent)
    root.style.setProperty("--border", colors.border)
    root.style.setProperty("--ring", colors.ring)
    root.style.setProperty("--sidebar-primary", colors.primary)
    root.style.setProperty("--sidebar-accent", colors.accent)
    root.style.setProperty("--sidebar-border", colors.border)
    root.style.setProperty("--sidebar-ring", colors.ring)

    // Store particle colors for components to access
    window.accentParticleColors = colors.particles

    // Dispatch custom event for particle color updates
    window.dispatchEvent(
      new CustomEvent("accentColorChange", {
        detail: { colors: colors.particles, accentColor },
      }),
    )
  }, [accentColor])

  useEffect(() => {
    // Load from localStorage
    const storedAccentColor = localStorage.getItem(storageKey + "-accent") as AccentColor

    if (storedAccentColor && colorMap[storedAccentColor]) {
      setAccentColor(storedAccentColor)
    }
  }, [storageKey])

  const value = {
    theme,
    accentColor,
    setTheme: (theme: Theme) => {
      // Theme is always dark, no switching needed
    },
    setAccentColor: (color: AccentColor) => {
      localStorage.setItem(storageKey + "-accent", color)
      setAccentColor(color)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

// Extend window type for TypeScript
declare global {
  interface Window {
    accentParticleColors?: string[]
  }
}
