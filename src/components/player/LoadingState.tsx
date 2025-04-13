
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const PlayerDetailLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link to="/players" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Players
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <Skeleton className="w-full h-80 rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-8 mb-2" />
          <Skeleton className="w-1/2 h-6 mb-4" />
          <Skeleton className="w-full h-40" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="w-full h-60 rounded-lg mb-6" />
          <Skeleton className="w-full h-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
