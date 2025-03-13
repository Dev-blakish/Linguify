import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info } from "lucide-react";

export function NavBar() {
  return (
    <nav className="bg-purple-900 shadow-lg border-b border-purple-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img 
                src="/attached_assets/linguify logo-Photoroom.png" 
                alt="Linguify Logo" 
                className="h-8 w-auto"
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Our Mission</DropdownMenuItem>
              <DropdownMenuItem>How It Works</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}