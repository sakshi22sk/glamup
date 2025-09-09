"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Wand2, Palette, Shirt, Heart, Star, Zap } from "lucide-react"

interface HomePageProps {
  onStartChat: () => void
}

export function HomePage({ onStartChat }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-teal-100">
      <header className="border-b border-pink-200/50 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-teal-200/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-teal-500 animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                GlamUp
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-300 text-purple-600 hover:bg-purple-100 bg-white/80"
            >
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="relative h-96 overflow-hidden">
        <img
          src="/elegant-fashion-banner-with-models-in-colorful-out.jpg"
          alt="Fashion Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-teal-400/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h2 className="text-6xl font-bold text-balance leading-tight drop-shadow-lg">
              Your Style Journey Starts Here
            </h2>
            <p className="text-xl drop-shadow-md max-w-2xl">Discover fashion that speaks to your soul</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-balance leading-tight">
              Discover Your Perfect Style with{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                AI Fashion
              </span>
            </h3>
            <p className="text-xl text-gray-700 text-pretty max-w-2xl mx-auto leading-relaxed">
              Get personalized fashion recommendations, style advice, and outfit inspiration tailored just for you. Let
              our AI stylist help you look and feel amazing.
            </p>
          </div>

          <div className="pt-8">
            <Button
              onClick={onStartChat}
              size="lg"
              className="h-16 px-12 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f472b6, #a855f7, #3b82f6, #14b8a6)",
                boxShadow: "0 10px 30px rgba(244, 114, 182, 0.3)",
              }}
            >
              <Wand2 className="mr-3 h-6 w-6" />
              Start Your Style Journey
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/stylish-woman-in-baby-pink-outfit-fashion-photogra.jpg"
                alt="Pink Fashion"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">Soft & Elegant</h4>
                <p className="text-sm opacity-90">Baby Pink Vibes</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/fashion-model-in-light-purple-denim-blue-outfit-tr.jpg"
                alt="Purple Blue Fashion"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/60 via-blue-500/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">Cool & Chic</h4>
                <p className="text-sm opacity-90">Denim Dreams</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/elegant-peacock-green-teal-fashion-outfit-luxury-s.jpg"
                alt="Green Fashion"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">Bold & Beautiful</h4>
                <p className="text-sm opacity-90">Peacock Glamour</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-100/80 to-pink-50/60 backdrop-blur-sm hover:from-pink-200/80 hover:to-pink-100/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-200/50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-pink-800">Color Matching</h3>
                <p className="text-pink-700 leading-relaxed">
                  Find perfect color combinations that complement your skin tone and personal style
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-100/80 to-purple-50/60 backdrop-blur-sm hover:from-purple-200/80 hover:to-purple-100/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-200/50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Shirt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-800">Style Recommendations</h3>
                <p className="text-purple-700 leading-relaxed">
                  Get personalized outfit suggestions based on your preferences and occasions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-100/80 to-teal-50/60 backdrop-blur-sm hover:from-teal-200/80 hover:to-teal-100/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-200/50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800">AI Styling</h3>
                <p className="text-teal-700 leading-relaxed">
                  Advanced AI technology that learns your style and provides expert fashion advice
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="pt-16 space-y-8">
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Loved by Fashion Enthusiasts
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-100/80 to-purple-100/80 border-2 border-pink-200">
                <img
                  src="/happy-woman-fashion-enthusiast-portrait.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-300"
                />
                <div className="text-left">
                  <p className="text-pink-800 italic">"GlamUp transformed my wardrobe completely!"</p>
                  <p className="font-semibold text-pink-900 mt-2">Sarah M.</p>
                  <div className="flex text-pink-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-blue-100/80 to-teal-100/80 border-2 border-teal-200">
                <img
                  src="/stylish-man-fashion-portrait-smiling.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-300"
                />
                <div className="text-left">
                  <p className="text-teal-800 italic">"The AI recommendations are spot on!"</p>
                  <p className="font-semibold text-teal-900 mt-2">Alex K.</p>
                  <div className="flex text-teal-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-16 space-y-4">
            <h3 className="text-2xl font-semibold text-purple-800">Ready to transform your wardrobe?</h3>
            <p className="text-gray-700">
              Join thousands of fashion enthusiasts who trust GlamUp for their style needs
            </p>
            <div className="flex justify-center space-x-2 pt-4">
              <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
              <Zap className="h-6 w-6 text-purple-500 animate-bounce" />
              <Sparkles className="h-6 w-6 text-teal-500 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
