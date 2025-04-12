
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react"; // Using Trophy instead of Cricket
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

const CustomNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center mr-6">
          <Trophy className="h-6 w-6 text-cricket-pitch mr-2" />
          <span className="font-bold text-xl">UCC</span>
        </Link>
        
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/players" className="text-sm font-medium transition-colors hover:text-cricket-pitch">
            Players
          </Link>
          <Link to="/schedule" className="text-sm font-medium transition-colors hover:text-cricket-pitch">
            Schedule
          </Link>
          <Link to="/standings" className="text-sm font-medium transition-colors hover:text-cricket-pitch">
            Standings
          </Link>
          <Link to="/crawler" className="text-sm font-medium transition-colors hover:text-cricket-pitch">
            Update Data
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">Login</Button>
        </div>
      </div>
    </header>
  );
};

export default CustomNavbar;
