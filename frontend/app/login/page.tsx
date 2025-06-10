"use client"

import type React from "react"
import { useState } from "react"
import { Particles } from "@/components/particles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { authenticateUser } from "@/lib/auth"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = authenticateUser(email, password)

      if (!user) {
        toast.error("Invalid email or password")
        setIsLoading(false)
        return
      }

      login(user)
      toast.success(`Welcome back, ${user.name}!`)
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("Login failed")
      setIsLoading(false)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    toast.info("Registration is not available in this demo. Please use the provided credentials.")
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Particles className="absolute inset-0 z-0" />
      <div className="relative z-10 container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-black/60 border-teal-900/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">HexVortex CTF</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="bg-black/50 border-gray-700 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="bg-black/50 border-gray-700 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>
                      <strong>Admin:</strong> admin@hexvortex.com / admin123
                    </p>
                    <p>
                      <strong>Player:</strong> player1@hexvortex.com / player123
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-gray-300">
                      Username
                    </Label>
                    <Input
                      id="register-username"
                      placeholder="coolhacker"
                      required
                      className="bg-black/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="bg-black/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      className="bg-black/50 border-gray-700 text-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-gray-400 text-center">
              By continuing, you agree to our{" "}
              <button onClick={() => setShowTerms(true)} className="text-teal-400 hover:text-teal-300 underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button onClick={() => setShowPrivacy(true)} className="text-teal-400 hover:text-teal-300 underline">
                Privacy Policy
              </button>
              .
            </div>

            {/* Terms of Service Dialog */}
            <Dialog open={showTerms} onOpenChange={setShowTerms}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 text-white border-teal-900/50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-teal-600/70 [&::-webkit-scrollbar-thumb:hover]:bg-teal-500 [&::-webkit-scrollbar-thumb]:rounded-full">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-teal-400">Terms of Service</DialogTitle>
                  <DialogDescription className="text-gray-400">Last updated: January 2024</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-gray-300">
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using the HexVortex CTF platform, you accept and agree to be bound by the terms
                      and provision of this agreement.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">2. Platform Usage</h3>
                    <p>
                      HexVortex CTF is an educational cybersecurity platform designed for learning and competition
                      purposes. Users must:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Use the platform for educational and legitimate purposes only</li>
                      <li>Not attempt to compromise the platform's security</li>
                      <li>Respect other participants and maintain fair play</li>
                      <li>Not share solutions or flags with other teams</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">3. Account Responsibilities</h3>
                    <p>
                      Users are responsible for maintaining the confidentiality of their account credentials and for all
                      activities that occur under their account.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">4. Prohibited Activities</h3>
                    <p>Users must not:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Engage in any form of cheating or unfair advantage</li>
                      <li>Attempt to access unauthorized areas of the platform</li>
                      <li>Disrupt the platform's operation or other users' experience</li>
                      <li>Use automated tools or scripts unless explicitly allowed</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">5. Intellectual Property</h3>
                    <p>
                      All content, challenges, and materials on the platform are the property of HexVortex CTF and are
                      protected by intellectual property laws.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">6. Limitation of Liability</h3>
                    <p>
                      HexVortex CTF shall not be liable for any direct, indirect, incidental, special, or consequential
                      damages resulting from the use of this platform.
                    </p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>

            {/* Privacy Policy Dialog */}
            <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 text-white border-teal-900/50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-teal-600/70 [&::-webkit-scrollbar-thumb:hover]:bg-teal-500 [&::-webkit-scrollbar-thumb]:rounded-full">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-teal-400">Privacy Policy</DialogTitle>
                  <DialogDescription className="text-gray-400">Last updated: January 2024</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-gray-300">
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Account registration information (username, email, password)</li>
                      <li>Team information and participation data</li>
                      <li>Challenge submissions and solutions</li>
                      <li>Communication through our platform</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Provide and maintain our CTF platform services</li>
                      <li>Process your participation in challenges and competitions</li>
                      <li>Communicate with you about platform updates and events</li>
                      <li>Improve our platform and user experience</li>
                      <li>Ensure platform security and prevent abuse</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">3. Information Sharing</h3>
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to third parties without
                      your consent, except as described in this policy or as required by law.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">4. Data Security</h3>
                    <p>
                      We implement appropriate security measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">5. Cookies and Tracking</h3>
                    <p>
                      We use cookies and similar technologies to enhance your experience, analyze platform usage, and
                      provide personalized content.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">6. Your Rights</h3>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Access and update your personal information</li>
                      <li>Request deletion of your account and data</li>
                      <li>Opt-out of certain communications</li>
                      <li>Request a copy of your data</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">7. Contact Us</h3>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at privacy@hexvortex.com
                    </p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
