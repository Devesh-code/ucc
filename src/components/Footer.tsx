
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="cricket-gradient text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy size={24} />
              <span className="text-lg font-bold">UCC Cricket</span>
            </div>
            <p className="text-sm text-gray-200">
              Home of the UCC cricket team in the New England Cricket Association
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-cricket-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/players" className="text-gray-200 hover:text-cricket-gold transition-colors">
                  Players
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-200 hover:text-cricket-gold transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/standings" className="text-gray-200 hover:text-cricket-gold transition-colors">
                  Standings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm text-gray-200 mb-2">
              Follow us on social media for the latest updates
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-cricket-gold transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-200 hover:text-cricket-gold transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-200 hover:text-cricket-gold transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cricket-pitch-light mt-8 pt-6 text-center text-sm text-gray-200">
          <p>&copy; {new Date().getFullYear()} UCC Cricket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
