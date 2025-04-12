
import { Link } from "react-router-dom";
import { usePlayers } from "@/utils/cricketService";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";  // Replaced Cricket with Trophy

const Players = () => {
  const { data: players, isLoading, error } = usePlayers();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading player data</h1>
        <p className="mt-4">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UCC Players</h1>
        <p className="text-muted-foreground text-lg">
          Meet our talented squad of cricketers representing UCC
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-60 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          : players?.map((player) => (
              <Card key={player.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-60 overflow-hidden bg-muted flex justify-center items-center">
                  <div className="absolute inset-0 cricket-gradient opacity-20"></div>
                  <Trophy size={64} className="text-cricket-pitch opacity-20" /> {/* Replaced Cricket with Trophy */}
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
                  <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    {player.battingStyle && <span>{player.battingStyle} Batsman</span>}
                    {player.battingStyle && player.bowlingStyle && <span> • </span>}
                    {player.bowlingStyle && <span>{player.bowlingStyle} Bowler</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold">Matches:</span> {player.matches}
                    </div>
                    <div>
                      <span className="font-semibold">Runs:</span> {player.runsScored}
                    </div>
                    <div>
                      <span className="font-semibold">Bat Avg:</span> {player.battingAverage.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-semibold">Wickets:</span> {player.wickets}
                    </div>
                  </div>
                  <Button asChild className="w-full cricket-gradient hover:opacity-90">
                    <Link to={`/players/${player.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Players;
