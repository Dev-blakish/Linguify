
import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Info } from "lucide-react";

export default function AboutPage() {
  const openWhatsApp = () => {
    window.open('https://wa.me/2348182039201', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center font-display bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            About Linguify
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Linguify is a cutting-edge language learning platform designed to help individuals achieve their language goals. 
                  Our mission is to make language learning accessible, engaging, and fun for everyone.
                </p>
                <p className="text-muted-foreground mt-4">
                  With a team of passionate language enthusiasts and experts in AI technology, we've created a unique platform 
                  that combines interactive lessons, conversational practice, and personalized progress tracking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><span className="font-medium text-foreground">Sign-up:</span> Users create an account and set their language learning goals.</li>
                  <li><span className="font-medium text-foreground">Chatbot Practice:</span> Users practice conversing with our AI-powered chatbot, which responds to their inputs and helps them improve their language skills.</li>
                  <li><span className="font-medium text-foreground">Progress Bar:</span> A progress bar shows users how far they've come, motivating them to continue learning.</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:codewithblakish@gmail.com" className="hover:text-primary transition-colors">
                    codewithblakish@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+2348182039201" className="hover:text-primary transition-colors">
                    +234 818 203 9201
                  </a>
                </div>
                
                <a href="https://codewithblakish.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-2">
                  Visit my portfolio
                </a>
                
                <Button 
                  onClick={openWhatsApp} 
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2a10 10 0 0 0-8.64 15.04L2.32 22l5.05-1.26A10 10 0 1 0 12 2zm0 18.28a8.28 8.28 0 0 1-4.28-1.18l-.31-.18-3.18.83.84-3.09-.2-.33A8.28 8.28 0 1 1 12 20.28z"/>
                    <path d="M16.61 14.82c-.25.7-1.23 1.26-1.7 1.36-.46.1-.89.13-2.66-.57-2.25-.88-3.56-3.14-3.64-3.28-.07-.13-.62-1.11-.62-2.13 0-1.02.53-1.5.7-1.69.17-.19.37-.24.5-.24l.53.01c.11 0 .3-.03.46.35.16.37.56 1.29.61 1.38.05.09.08.2.02.31-.06.11-.11.18-.22.28-.11.1-.24.22-.34.3-.12.09-.24.19-.1.36.14.17.61.76 1.22 1.34.84.77 1.55.95 1.77 1.06.22.11.35.09.48-.05.13-.14.56-.64.71-.86.15-.22.3-.18.5-.11.2.07 1.19.64 1.4.77.2.13.35.19.39.29.05.1.05.59-.2 1.29z"/>
                  </svg>
                  Chat on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
