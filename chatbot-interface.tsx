"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, User, Home, Palette, Heart, Eye, Wand2, Sun, Snowflake, Shirt } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion" | "outfit"
}

interface DressItem {
  id: string
  name: string
  primaryColor: string
  matchingColors: string[]
  occasion: string
  liked: boolean
  views: number
  image: string
}

interface OutfitSuggestion {
  id: string
  title: string
  items: string[]
  colors: string[]
  occasion: string
}

interface ChatbotInterfaceProps {
  onBackToHome: () => void
}

export function ChatbotInterface({ onBackToHome }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI fashion stylist. I can help you with outfit suggestions, color matching, style advice, and trend insights. What would you like to explore today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedDress, setSelectedDress] = useState<string | null>(null)
  const [userStyleProfile, setUserStyleProfile] = useState({
    preferredColors: ["Navy", "Coral", "Emerald"],
    stylePersonality: "Classic Chic",
    bodyType: "Not specified",
    lifestyle: "Professional",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [dressGallery, setDressGallery] = useState<DressItem[]>([
    {
      id: "1",
      name: "Coral Sunset Dress",
      primaryColor: "Coral Pink",
      matchingColors: ["Light Blue", "Cream White", "Gold"],
      occasion: "Summer Party",
      liked: true,
      views: 24,
      image: "coral-sunset-dress.jpg",
    },
    {
      id: "2",
      name: "Navy Elegance",
      primaryColor: "Navy Blue",
      matchingColors: ["Gold Accents", "Ivory", "Silver"],
      occasion: "Evening Event",
      liked: false,
      views: 18,
      image: "navy-elegance-dress.jpg",
    },
    {
      id: "3",
      name: "Emerald Garden",
      primaryColor: "Emerald Green",
      matchingColors: ["Nude Tones", "Rose Gold", "Blush"],
      occasion: "Cocktail Party",
      liked: true,
      views: 31,
      image: "emerald-garden-dress.jpg",
    },
    {
      id: "4",
      name: "Burgundy Romance",
      primaryColor: "Burgundy",
      matchingColors: ["Cream White", "Gold", "Dusty Pink"],
      occasion: "Date Night",
      liked: false,
      views: 15,
      image: "burgundy-romance-dress.jpg",
    },
    {
      id: "5",
      name: "Dusty Rose Dream",
      primaryColor: "Dusty Rose",
      matchingColors: ["Sage Green", "Ivory", "Bronze"],
      occasion: "Brunch",
      liked: true,
      views: 27,
      image: "dusty-rose-dream-dress.jpg",
    },
  ])

  const quickActions = [
    { icon: Sun, label: "Summer Outfit", query: "Suggest a stylish summer outfit for a casual day out" },
    { icon: Snowflake, label: "Winter Style", query: "What should I wear for a winter evening event?" },
    { icon: Palette, label: "Color Match", query: "Help me find colors that match my skin tone" },
    { icon: Shirt, label: "Work Outfit", query: "I need a professional outfit for an important meeting" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response with enhanced fashion intelligence
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAdvancedFashionResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        type: inputMessage.toLowerCase().includes("outfit") ? "outfit" : "text",
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAdvancedFashionResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Color-related queries
    if (input.includes("color") || input.includes("match")) {
      const colorAdvice = [
        "Based on your style profile, I recommend exploring jewel tones like emerald and sapphire - they complement your classic chic aesthetic beautifully. Try pairing emerald green with gold accessories for an elegant look.",
        "For color matching, consider the color wheel! Complementary colors (opposites) create striking contrasts, while analogous colors (neighbors) offer harmonious blends. Your coral preference pairs wonderfully with teal or navy.",
        "Seasonal color analysis suggests that warm undertones work best with coral, peach, and golden hues, while cool undertones shine in navy, emerald, and silver. Which resonates more with you?",
      ]
      return colorAdvice[Math.floor(Math.random() * colorAdvice.length)]
    }

    // Outfit suggestions
    if (input.includes("outfit") || input.includes("wear")) {
      const outfitSuggestions = [
        "For a versatile outfit, try a navy blazer with white jeans and coral accessories - it's professional yet approachable. Add nude heels and a structured handbag to complete the look.",
        "Consider a midi dress in one of your preferred colors with a denim jacket for casual elegance. Layer with delicate jewelry and comfortable flats for day-to-night versatility.",
        "A classic white button-down with high-waisted trousers in navy or emerald creates a timeless silhouette. Add a statement belt and pointed-toe shoes for sophistication.",
      ]
      return outfitSuggestions[Math.floor(Math.random() * outfitSuggestions.length)]
    }

    // Seasonal/weather queries
    if (input.includes("summer") || input.includes("hot") || input.includes("warm")) {
      return "For summer styling, focus on breathable fabrics like cotton and linen in light colors. A coral sundress with white sandals and a straw hat creates an effortlessly chic look. Don't forget SPF-infused makeup!"
    }

    if (input.includes("winter") || input.includes("cold")) {
      return "Winter calls for luxurious layering! Try a cashmere sweater in emerald over tailored pants, topped with a wool coat. Add leather boots and a silk scarf for warmth and elegance."
    }

    // Professional/work queries
    if (input.includes("work") || input.includes("professional") || input.includes("meeting")) {
      return "For professional settings, stick to classic silhouettes in your preferred navy and emerald palette. A well-fitted blazer, tailored pants, and quality accessories convey confidence and competence."
    }

    // Style personality queries
    if (input.includes("style") || input.includes("personality")) {
      return "Your classic chic style personality suggests you appreciate timeless pieces with modern touches. Invest in quality basics in your preferred colors and add contemporary accessories to keep looks fresh."
    }

    // Default responses with personalization
    const personalizedResponses = [
      `Given your classic chic style and love for ${userStyleProfile.preferredColors.join(", ")}, I'd suggest exploring structured pieces with clean lines and sophisticated color combinations.`,
      "Fashion is about expressing your unique personality! Based on our conversation, you seem drawn to elegant, versatile pieces that can transition from day to night.",
      "Let's build a capsule wardrobe around your favorite colors. Start with quality basics and add statement pieces that reflect your personal style journey.",
    ]

    return personalizedResponses[Math.floor(Math.random() * personalizedResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (query: string) => {
    setInputMessage(query)
    // Auto-send the message
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const handleDressClick = (dressId: string) => {
    setSelectedDress(selectedDress === dressId ? null : dressId)
    // Increment view count
    setDressGallery((prev) =>
      prev.map((dress) => (dress.id === dressId ? { ...dress, views: dress.views + 1 } : dress)),
    )
  }

  const handleLikeToggle = (dressId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDressGallery((prev) => prev.map((dress) => (dress.id === dressId ? { ...dress, liked: !dress.liked } : dress)))
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Left Sidebar - Enhanced Previous Dresses Gallery */}
      <div className="w-80 border-r border-border bg-gradient-to-b from-card/40 to-secondary/10 backdrop-blur-sm">
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Style Gallery
            </h2>
            <Button variant="ghost" size="sm" onClick={onBackToHome} className="hover:bg-accent/10">
              <Home className="h-4 w-4 text-accent" />
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your curated fashion inspirations</p>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 space-y-1 border border-primary/20">
              <p className="text-xs font-medium text-primary">AI Style Profile</p>
              <p className="text-xs text-muted-foreground">Style: {userStyleProfile.stylePersonality}</p>
              <div className="flex flex-wrap gap-1">
                {userStyleProfile.preferredColors.map((color, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-1 py-0 bg-accent/20 text-accent border-accent/30"
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-4">
            {dressGallery.map((dress) => (
              <Card
                key={dress.id}
                className={`border-0 bg-gradient-to-br from-background/60 to-card/60 hover:from-background/80 hover:to-card/80 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  selectedDress === dress.id ? "ring-2 ring-accent shadow-lg shadow-accent/20" : ""
                }`}
                onClick={() => handleDressClick(dress.id)}
              >
                <CardContent className="p-3">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg mb-3 relative overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=150&query=${dress.name} ${dress.primaryColor} elegant fashion dress`}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-background/80 hover:bg-accent/20"
                        onClick={(e) => handleLikeToggle(dress.id, e)}
                      >
                        <Heart
                          className={`h-4 w-4 ${dress.liked ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 rounded-full px-2 py-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{dress.views}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-card-foreground">{dress.name}</p>
                      <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">
                        {dress.occasion}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Primary: {dress.primaryColor}</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Palette className="h-3 w-3 text-accent" />
                        <div className="flex flex-wrap gap-1">
                          {dress.matchingColors.map((color, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs px-1 py-0 border-primary/30 text-primary"
                            >
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedDress === dress.id && (
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Perfect for {dress.occasion.toLowerCase()}. This {dress.primaryColor.toLowerCase()} piece
                          pairs beautifully with {dress.matchingColors.slice(0, 2).join(" and ").toLowerCase()}{" "}
                          accessories.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs bg-gradient-to-r from-primary/10 to-accent/10 border-accent/30 hover:from-primary/20 hover:to-accent/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            setInputMessage(`Create a complete outfit around my ${dress.name} for ${dress.occasion}`)
                          }}
                        >
                          <Wand2 className="h-3 w-3 mr-1 text-accent" />
                          AI Style This
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side - Enhanced Chatbot Interface */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                <Sparkles className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GlamUp AI Stylist
              </h3>
              <p className="text-sm text-muted-foreground">Powered by advanced fashion AI</p>
            </div>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-r from-background/80 to-card/40 backdrop-blur-sm p-4">
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-gradient-to-r from-primary/5 to-accent/5 border-primary/30 hover:from-primary/10 hover:to-accent/10 hover:border-accent/50"
                onClick={() => handleQuickAction(action.query)}
              >
                <action.icon className="h-3 w-3 mr-1 text-accent" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-accent">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-primary to-secondary text-white ml-auto"
                      : "bg-card/80 text-card-foreground backdrop-blur-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-secondary to-accent">
                    <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-accent">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card/80 text-card-foreground rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 bg-gradient-to-r from-card/40 to-background/60 backdrop-blur-sm">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about colors, outfits, trends, or styling tips..."
              className="flex-1 bg-background/80 border-border focus:border-accent focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
