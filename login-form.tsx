"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onLogin(email, password)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-teal-100 p-4">
      <div className="absolute inset-0 bg-[url('/elegant-fashion-texture-pattern.jpg')] opacity-10 bg-cover bg-center" />

      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-teal-300 to-blue-300 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-gradient-to-r from-pink-300 via-purple-300 to-teal-300 bg-gradient-to-br from-white/95 via-pink-50/90 to-purple-50/90 backdrop-blur-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-teal-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              GlamUp
            </h1>
          </div>
          <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to discover your perfect style with AI-powered fashion recommendations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-teal-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-teal-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-teal-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-teal-600" />
                  )}
                </Button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #be185d, #7c3aed, #1d4ed8, #0f766e) !important",
                color: "#ffffff !important",
                border: "2px solid rgba(190, 24, 93, 0.3) !important",
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <Button variant="link" className="text-purple-600 hover:text-teal-600">
                Forgot your password?
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-pink-200">
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Button variant="link" className="p-0 h-auto text-teal-600 hover:text-pink-600">
                Sign up for free
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
