
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
}

export const PlayerDetailError = ({ message = "Error loading player data" }: ErrorStateProps) => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      <p className="mt-4">Please try again later</p>
      <Button asChild variant="link" className="mt-4">
        <Link to="/players">Back to Players</Link>
      </Button>
    </div>
  );
};
