
import { NavLink } from "react-router-dom";
import { Menu, X, Cricket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Players", path: "/players" },
    { name: "Schedule", path: "/schedule" },
    { name: "Standings", path: "/standings" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full cricket-gradient shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <Cricket size={28} className="text-white" />
            <span className="text-xl font-bold text-white">UCC Cricket</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-white hover:text-cricket-gold transition-colors duration-200 font-medium",
                    isActive && "text-cricket-gold"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-cricket-pitch-light"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-cricket-pitch-light">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "text-white hover:text-cricket-gold transition-colors duration-200 font-medium px-4 py-2",
                      isActive && "bg-cricket-pitch-light text-cricket-gold"
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
