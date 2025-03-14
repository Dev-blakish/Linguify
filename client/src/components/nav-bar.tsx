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
              <DropdownMenuItem>How It Works</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}