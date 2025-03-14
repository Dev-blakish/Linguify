import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function NavBar() {
  return (
    <nav className="bg-purple-900 shadow-lg border-b border-purple-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img 
                src="/linguify-logo.png" 
                alt="Linguify Logo" 
                className="h-12 w-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="space-x-2 transition-all duration-300 hover:bg-purple-800 text-white">
                <Info className="w-4 h-4" />
                <span>About Us</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <DropdownMenuItem>Our Mission</DropdownMenuItem>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-purple-50 border border-purple-200">
                  <p className="text-sm text-purple-900">
                    At Linguify, we believe that language learning should be a rewarding and enjoyable experience. That's why we're committed to providing a supportive and motivating environment with AI that helps our users stay on track and reach their full potential.
                    <br/><br/>
                    Join our community today and start linguifying your world!
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <DropdownMenuItem>How It Works</DropdownMenuItem>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-purple-50 border border-purple-200">
                  <p className="text-sm text-purple-900">
                    How Linguify Works:
                    <br/><br/>
                    1. Sign-up: Users create an account and set their language learning goals.
                    <br/>
                    2. Chatbot Practice: Users practice conversing with our AI-powered chatbot, which responds to their inputs and helps them improve their language skills.
                    <br/>
                    3. Users can always view chat history
                    <br/>
                    4. Progress Bar: A progress bar shows users how far they've come, motivating them to continue learning.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <DropdownMenuItem>Contact</DropdownMenuItem>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-purple-50 border border-purple-200">
                  <div className="space-y-4 text-sm text-purple-900">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <a href="mailto:adewoleadeigbe@gmail.com" className="hover:underline">adewoleadeigbe@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v20l8-8h10V2z"/></svg>
                      <a href="https://codewithblakish.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <a href="https://wa.me/2348182039201" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Chat</a>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}