"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Palette, TrendingUp, Users } from "lucide-react"

export function AIFashionFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart Style Analysis",
      description: "AI-powered analysis of your style preferences and body type",
      capabilities: ["Color matching", "Body type analysis", "Style personality assessment"],
    },
    {
      icon: Palette,
      title: "Color Intelligence",
      description: "Advanced color theory and seasonal analysis",
      capabilities: ["Skin tone matching", "Color wheel harmony", "Seasonal palettes"],
    },
    {
      icon: TrendingUp,
      title: "Trend Forecasting",
      description: "Stay ahead with AI-driven fashion trend predictions",
      capabilities: ["Trend analysis", "Style evolution", "Market insights"],
    },
    {
      icon: Users,
      title: "Personalized Recommendations",
      description: "Tailored suggestions based on your unique profile",
      capabilities: ["Outfit generation", "Shopping recommendations", "Style coaching"],
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="border-0 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            <div className="flex flex-wrap gap-1">
              {feature.capabilities.map((capability, capIndex) => (
                <Badge key={capIndex} variant="secondary" className="text-xs">
                  {capability}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
