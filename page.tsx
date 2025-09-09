"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { HomePage } from "@/components/home-page"
import { ChatbotInterface } from "@/components/chatbot-interface"

type AppState = "login" | "home" | "chat"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("login")

  const handleLogin = (email: string, password: string) => {
    // Simple login simulation - in real app, validate credentials
    console.log("Login attempt:", { email, password })
    setAppState("home")
  }

  const handleStartChat = () => {
    setAppState("chat")
  }

  const handleBackToHome = () => {
    setAppState("home")
  }

  if (appState === "login") {
    return <LoginForm onLogin={handleLogin} />
  }

  if (appState === "home") {
    return <HomePage onStartChat={handleStartChat} />
  }

  return <ChatbotInterface onBackToHome={handleBackToHome} />
}
