
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { Player } from "@/utils/cricketService";

interface PlayerOverviewProps {
  player: Player;
}

export const PlayerOverview = ({ player }: PlayerOverviewProps) => {
  return (
    <>
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
      
      <Card className="mb-6 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-muted flex justify-center items-center">
          <div className="absolute inset-0 cricket-gradient opacity-20"></div>
          <Trophy size={80} className="text-cricket-pitch opacity-20" />
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-full h-full object-cover absolute inset-0 z-10 opacity-90"
          />
          <Badge className="absolute top-4 right-4 z-20 bg-cricket-pitch">
            {player.role}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-1">{player.name}</h1>
          <div className="text-muted-foreground mb-4">
            {player.battingStyle && <div>{player.battingStyle} Batsman</div>}
            {player.bowlingStyle && <div>{player.bowlingStyle} Bowler</div>}
          </div>
          <Separator className="my-4" />
          <p className="text-sm leading-relaxed">{player.bio}</p>
        </CardContent>
      </Card>
    </>
  );
};
