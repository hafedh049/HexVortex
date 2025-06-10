// Simple authentication system with hardcoded users
export type User = {
  id: string
  name: string
  username: string
  email: string
  password: string
  role: "admin" | "player"
  teamId?: string
}

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    username: "admin",
    email: "admin@hexvortex.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Player One",
    username: "player1",
    email: "player1@hexvortex.com",
    password: "player123",
    role: "player",
    teamId: "1",
  },
  {
    id: "3",
    name: "Player Two",
    username: "player2",
    email: "player2@hexvortex.com",
    password: "player123",
    role: "player",
    teamId: "1",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}
