
import { ReactNode } from "react";
import { Trophy } from "lucide-react"; 

type FooterProps = {
  children?: ReactNode;
};

const CustomFooter = ({ children }: FooterProps) => {
  return (
    <footer className="bg-muted py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Trophy className="h-6 w-6 text-cricket-pitch mr-2" />
            <span className="font-bold text-lg">United Cricket Club</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {children || "© 2025 United Cricket Club. All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
